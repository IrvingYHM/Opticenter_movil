import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonToolbar, IonTitle, IonSpinner, IonText, IonCard, IonCardContent,IonCardHeader,IonCardSubtitle, IonCardTitle,IonButton, IonItem, IonLabel, IonList, IonRouterLink} from "@ionic/react";
import axios from "axios";
import Header from "./UI/header";
import { useSearchContext } from "../contexts/SearcContect";

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

interface Cita {
  IdCita: number;
  Fecha: string;
  Hora: string;
  IdTipoCita: number;
  Costo: number;
  IdEstadoCita: number;
  Observaciones: string;
  DescripcionT: string;
}

const miscitas = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [idUsuario, setIdUsuario] = useState("");

  const tiposCita = [
    { id: 1, nombre: "Examen de vista", costo: 100 },
    { id: 2, nombre: "Ajuste de Gafas", costo: 150 },
    { id: 3, nombre: "Examen de Lentes de Contacto", costo: 120 },
    { id: 4, nombre: "Examen de Salud Ocular", costo: 160 },
    { id: 5, nombre: "Otro", costo: 180 }
  ];

  const IdEstadoCita = [
    { id: 1, nombre: "Programada" },
    { id: 2, nombre: "Confirmada" },
    { id: 3, nombre: "Completada" },
    { id: 4, nombre: "Cancelada" },
    { id: 5, nombre: "No Asistió" },
    { id: 6, nombre: "Pendiente de confirmación" }
  ];

  const getNombreTipoCita = (idTipoCita: number) => {
    const tipo = tiposCita.find((tipo) => tipo.id === idTipoCita);
    return tipo ? tipo.nombre : "No disponible";
  };

  const getNombreEstadoCita = (idEstadoCita: number) => {
    const estado = IdEstadoCita.find((estado) => estado.id === idEstadoCita);
    return estado ? estado.nombre : "No disponible";
  };

  const fetchCitas = async () => {
    if (idUsuario) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://backopt-production.up.railway.app/cita/usuario/${idUsuario}`
        );
        const data: Cita[] = response.data;
        setCitas(data);
      } catch (err) {
        setError((err as Error).message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setIdUsuario(decodedToken.clienteId);
    }
  }, []);

  useEffect(() => {
    fetchCitas();
  }, [idUsuario]);


    const { searchText, results, setResults } = useSearchContext();

    useEffect(() => {
      const fetchResults = async () => {
        if (searchText.trim() === "") {
          setResults([]);
          return;
        }
        try {
          const response = await fetch(`https://backopt-production.up.railway.app/productos/Buscar_productos?busqueda=${searchText}`);
          if (response.ok) {
            const data = await response.json();
            setResults(data);
          } else {
            setResults([]);
          }
        } catch {
          setResults([]);
        }
      };
      fetchResults();
    }, [searchText, setResults]);
  
    const handleSearch = async (searchTerm: string) => {
      if (searchTerm.trim() === '') {
        setResults([]);
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch(`https://backopt-production.up.railway.app/productos/Buscar_productos?busqueda=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Error al realizar la búsqueda');
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding">
                 {results.length > 0 && (
                    <IonList>
                    {results.map((product) => (
                        <IonRouterLink key={product.IdProducto} routerLink={`/productos/${product.IdProducto}`}>
                        <IonItem >
                        <IonLabel>{product.vchNombreProducto}</IonLabel>
                        </IonItem>
                        </IonRouterLink>
                    ))}
                    </IonList>
                )}
        <IonToolbar>
          <IonTitle className="text-center text-black text-xl">Mis Citas</IonTitle>
        </IonToolbar>

        {loading ? (
          <div className="ion-text-center">
            <IonSpinner name="crescent" />
            <IonText>Cargando...</IonText>
          </div>
        ) : error ? (
          <IonText color="danger" className="ion-text-center">
            Error: {error}
          </IonText>
        ) : citas.length > 0 ? (
          citas.map((cita) => (
            <IonCard key={cita.IdCita} className="ion-padding">
              <IonCardHeader>
                <IonCardTitle>Fecha: {cita.Fecha}</IonCardTitle>
                <IonCardSubtitle>Hora: {cita.Hora}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>Tipo de Cita:</strong> {getNombreTipoCita(cita.IdTipoCita)}</p>
                <p><strong>Costo:</strong> {cita.Costo}</p>
                <p><strong>Estado de Cita:</strong> {getNombreEstadoCita(cita.IdEstadoCita)}</p>
                <IonButton
                  color="primary"
                  routerLink={`/modificar-cita/${cita.IdCita}`}
                  expand="block"
                >
                  Editar
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))
        ) : (
          <IonText>No se encontraron citas para este usuario.</IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default miscitas;