import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonButton, IonSelect, IonSelectOption, IonLabel, IonItem, IonDatetime, IonText, IonSpinner, IonTextarea, IonList, IonRouterLink } from "@ionic/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useSearchContext } from "../contexts/SearcContect";

// Función para decodificar el JWT
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

const CrearCita = () => {
  const [selectFecha, setSelectFecha] = useState(new Date().toISOString());
  const [selectHora, setSelectHora] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [idTipoCita, setIdTipoCita] = useState<number | null>(null);
  const [costo, setCosto] = useState("");
  const [descripcionT, setDescripcionT] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const tiposCita = [
    { id: 1, nombre: "Examen de vista", costo: 100 },
    { id: 2, nombre: "Ajuste de Gafas", costo: 150 },
    { id: 3, nombre: "Examen de Lentes de Contacto", costo: 120 },
    { id: 4, nombre: "Examen de Salud Ocular", costo: 160 },
    { id: 5, nombre: "Otro", costo: 180 },
  ];

  const history = useHistory(); // Hook para manejar la redirección

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setIdCliente(decodedToken.clienteId);
    }
  }, []);

  const handleTipoCitaChange = (e: CustomEvent) => {
    const tipoCitaSeleccionada = tiposCita.find(
      (tipo) => tipo.id === parseInt(e.detail.value)
    );
    if (tipoCitaSeleccionada) {
      setIdTipoCita(tipoCitaSeleccionada.id);
      setCosto(tipoCitaSeleccionada.costo.toString());
      if (tipoCitaSeleccionada.id !== 5) {
        setDescripcionT("");
      }
    }
  };

  const fetchHorariosDisponibles = async (fecha: string) => {
    const fechaFormateada = format(new Date(fecha), 'yyyy-MM-dd');
    setLoading(true);
    try {
      const response = await fetch(`https://backopt-production.up.railway.app/horarios/HrPorFecha?fecha=${fechaFormateada}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const horasDisponibles = data.map((horario: any) => horario.Hora);
        setHorarios(horasDisponibles);
      } else {
        toast.error("No se encontraron horarios disponibles");
      }
    } catch (error) {
      setHorarios([]);
      toast.error("Error al cargar los horarios disponibles");
    }
    setLoading(false);
  };

  const handleDateChange = (e: CustomEvent) => {
    const fechaFormateada = e.detail.value;
    setSelectFecha(fechaFormateada);
    setSelectHora("");
    fetchHorariosDisponibles(fechaFormateada);
  };

  const handleSubmit = async () => {
    if (
      selectFecha &&
      selectHora &&
      idCliente &&
      idTipoCita &&
      costo &&
      (idTipoCita !== 5 || (idTipoCita === 5 && descripcionT))
    ) {
      try {
        const citaResponse = await fetch("https://backopt-production.up.railway.app/cita", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Fecha: format(new Date(selectFecha), 'yyyy-MM-dd'),
            Hora: selectHora,
            IdCliente: idCliente,
            IdTipoCita: idTipoCita,
            Costo: costo,
            IdEstadoCita: 1,
            DescripcionT: idTipoCita === 5 ? descripcionT : null,
          }),
        });

        if (citaResponse.status === 201) {
          toast.success("Cita agendada exitosamente");
          setTimeout(() => {
          window.location.href = "/miscitas"; 
        }, 4000);
        } else {
          toast.error("Hubo un problema al agendar la cita");
        }
      } catch (error) {
        toast.error("Error al agendar la cita");
      }
    } else {
      toast.error("Por favor, completa todos los campos");
    }
  };

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
        const response = await fetch(`http://localhost:3000/productos/Buscar_productos?busqueda=${searchTerm}`);
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
    <IonPage id="main-content" style={{ marginBottom: '50px' }}>
      <IonContent>
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
        <ToastContainer position="top-center" />
        <h1 className="ion-text-center">Agendar Cita</h1>
        <IonItem>
          <IonLabel>Fecha de Cita</IonLabel>
          <IonDatetime presentation="date" value={selectFecha} onIonChange={handleDateChange}  />
        </IonItem>

        {loading ? (
          <IonSpinner name="dots" />
        ) : (
          <>
            {selectFecha && (
              <IonItem>
                <IonLabel>Hora</IonLabel>
                <IonSelect 
                  value={selectHora} 
                  placeholder="Selecciona una hora" 
                  onIonChange={(e: { detail: { value: React.SetStateAction<string>; }; }) => setSelectHora(e.detail.value)}
                >
                  {horarios.length > 0 ? (
                    horarios.map((hora, index) => (
                      <IonSelectOption key={index} value={hora}>
                        {hora}
                      </IonSelectOption>
                    ))
                  ) : (
                    <IonSelectOption disabled>No hay horarios disponibles</IonSelectOption>
                  )}
                </IonSelect>
              </IonItem>
            )}

            <IonItem>
              <IonLabel>Tipo de Cita</IonLabel>
              <IonSelect
                value={idTipoCita || ""}
                placeholder="Selecciona el tipo de cita"
                onIonChange={handleTipoCitaChange}
              >
                {tiposCita.map((tipo) => (
                  <IonSelectOption key={tipo.id} value={tipo.id}>
                    {tipo.nombre} - ${tipo.costo}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            {idTipoCita === 5 && (
              <IonItem>
                <IonLabel>Descripción</IonLabel>
                <IonTextarea
                  value={descripcionT}
                  onIonChange={(e: { detail: { value: React.SetStateAction<string>; }; }) => setDescripcionT(e.detail.value)}
                  placeholder="Describe el tipo de tratamiento"
                  maxlength={200}
                />
                <IonText>{descripcionT.length}/200 caracteres</IonText>
              </IonItem>
            )}

            <IonItem>
              <IonLabel>Costo: </IonLabel>
              <IonText>${costo}</IonText>
            </IonItem>

            <IonButton expand="block" onClick={handleSubmit}>
              Confirmar Cita
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CrearCita;
