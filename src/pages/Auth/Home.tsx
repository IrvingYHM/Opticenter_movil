import React, { useEffect, useState } from "react";
import { IonContent, IonItem, IonLabel, IonList, IonPage, IonRouterLink } from '@ionic/react'
import Header from '../../components/UI/header';
import ProductosOfertas from "../../components/Shared/productosOfertas";
import ImageCarousel from "../../components/UI/carrucel";
import CategoriasCarrucel from "../../components/UI/CategoriasCarrucel";
import HomeOne from "../../components/home";
import { useSearchContext } from "../../contexts/SearcContect";
import Encuesta from "../../components/encuesta";
function getClienteIdFromToken() {
  const token = localStorage.getItem("token");

  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const decodedToken = JSON.parse(jsonPayload);
    return decodedToken.clienteId; 
  }

  return null; 
}
type Encuesta = {
  estado: string;
  mensaje: any;
};
type EncuestaProps = {
  encuesta: Encuesta; // Usa el tipo que definiste arriba
};
const HomeAuth: React.FC = ()=> {
    const [loading, setLoading] = useState<boolean>(false);
    const { searchText, results, setResults } = useSearchContext();
    const [mostrarEncuesta, setMostrarEncuesta] = useState(false); // Estado para la encuesta pendiente
    const [idUsuario, setIdUsuario] = useState(null); // Estado para idUsuario (inicializado como null)
    const [encuesta, setEncuesta] = useState(null); // Estado para almacenar la información de la encuesta
  
    // Función para verificar si el usuario  encuesta pendiente
    const obtenerEncuestaPendiente = async (idUsuario: any) => {
      try {
        const response = await fetch('http://localhost:3000/obtenerEncuestaPendiente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idUsuario }), 
        });
  
        const data = await response.json();
  
        if (data.estado === 'Pendiente') {
          return { estado: 'Pendiente', id_encuesta: data.id_encuesta, mensaje: data.mensaje };
        } else {
          return { estado: 'Completado', mensaje: data.mensaje };
        }
      } catch (error) {
        console.error('Error al obtener la encuesta pendiente:', error);
        return { estado: 'Error', mensaje: 'No se pudo verificar la encuesta pendiente.' };
      }
    };
  
    useEffect(() => {
      const id = getClienteIdFromToken();
      if (id) {
        setIdUsuario(id);
      } else {
        console.error("No se pudo obtener el idUsuario del token.");
      }
    }, []); 
  
    useEffect(() => {
      if (idUsuario) {
        const verificarEncuesta = async () => {
          const encuesta = await obtenerEncuestaPendiente(idUsuario);
          if (encuesta.estado === 'Pendiente') {
            setEncuesta(encuesta); // Guardamos la encuesta pendiente
            setMostrarEncuesta(true); // Mostramos la encuesta
          }
        };
        verificarEncuesta();
      }
    }, [idUsuario]); 
  
  

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


    return(
        <IonPage style={{ marginBottom: '50px' }}>
        <Header />
        {mostrarEncuesta && encuesta && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Encuesta encuesta={encuesta} />
            </div>
          </div>
        )}
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
            <ImageCarousel />
            <CategoriasCarrucel />
            <HomeOne />
            <p className="text-center">Productos en oferta</p>
            <ProductosOfertas />
        </IonContent>
        </IonPage>
    );
}

export default HomeAuth;