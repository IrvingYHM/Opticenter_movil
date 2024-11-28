import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonItem,
  IonDatetime,
  IonText,
  IonSpinner,
  IonTextarea,
  IonList,
  IonModal,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Header from "./UI/header";// Paquete para estrellas
import { star, starOutline } from "ionicons/icons"; // Importar los iconos de estrella
import '../pages/carrito.css';


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


const Encuesta:React.FC = () => {
    const [encuestaCompletada, setEncuestaCompletada] = useState(false);
    const [encuestaPendiente, setEncuestaPendiente] = useState(false);
    const [idCliente, setIdCliente] = useState("");
    const [cargando, setCargando] = useState(true);
    const accesoRegistrado = useRef(false);
    const [showEncuesta, setShowEncuesta] = useState(false); // Estado para mostrar la encuesta
    const history = useHistory();
    const preguntas = [
      "¿Qué tan fácil fue encontrar la información que buscabas?",
      "¿Cómo calificarías la facilidad de uso del sistema para agendar tu cita?",
      "¿Qué tan satisfecho estás con el proceso de agendar una cita?",
      "¿Qué tan rápido te pareció el sistema para agendar tu cita?",
      "¿Qué tan claro fue el mensaje de confirmación de tu cita?",
    ];
    const [respuestas, setRespuestas] = useState<number[]>(new Array(preguntas.length).fill(0)); // Inicializa un array con tantas respuestas como preguntas
  
  
  
    const handleStarClick = (index: number, rating: number) => {
      const newRespuestas = [...respuestas];
      newRespuestas[index] = rating; // Asigna la calificación a la pregunta seleccionada
      setRespuestas(newRespuestas);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
          const decodedToken = parseJwt(token);
          const idUsuario = decodedToken.clienteId;
          setIdCliente(decodedToken.clienteId);
    
          if (!idUsuario) {
            console.error("El idUsuario no se pudo obtener del token.");
            return;
          }
    
          if (!accesoRegistrado.current && !encuestaCompletada) {
            const registrarAcceso = async () => {
              try {
                const response = await fetch("http://localhost:3000/verificaE", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ idUsuario }),
                });
    
                if (response.ok) {
                  const data = await response.json();
                  if (data.estado === "Encuesta ya completada") {
                    setEncuestaCompletada(true);
                  }
                } else {
                  console.error("Error al registrar el acceso al feedback");
                }
              } catch (error) {
                console.error("Error al registrar acceso:", error);
              } finally {
                setCargando(false);
              }
            };
    
            registrarAcceso();
            accesoRegistrado.current = true;
          } else {
            setCargando(false);
          }
        } else {
          history.push("/IniciaSesion");
        }
      }, [encuestaCompletada, history]);

      const enviarEncuesta = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/RegistroE",
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                idUsuario: idCliente, 
                question1:respuestas[0],
                question2:respuestas[1],
                question3:respuestas[2],
                question4:respuestas[3], 
                question5:respuestas[4],
              }),
            }
          );
    
          if (response.ok) {
            toast.success("Gracias por completar la encuesta");
          } 
          if (response.status === 409){
            toast.success("El usuario ya completó la encuesta.");
          }
        } catch (error) {
          toast.error("Error al enviar la encuesta");
        } finally {
          setEncuestaCompletada(true); // Marcar como completada
          setShowEncuesta(false);
          history.push("/miscitas");
        }
      };


    return(
        <IonPage>
          
            {/* Modal para la encuesta */}
       
            <IonContent>
                <h2 className="ion-text-center">Encuesta de Satisfacción</h2>
                <IonList>
                {preguntas.map((pregunta, index) => (
                    <IonItem key={index}>
                    <IonLabel>{pregunta}</IonLabel>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Mostrar estrellas según la calificación */}
                        {[1, 2, 3, 4, 5].map((rating) => (
                        <IonIcon
                            key={rating}
                            icon={respuestas[index] >= rating ? star : starOutline} // Usa star o starOutline dependiendo de la calificación
                            style={{
                            fontSize: "20px",
                            color: respuestas[index] >= rating ? "gold" : "gray", // Estrellas doradas si es seleccionada
                            cursor: "pointer",
                            }}
                            onClick={() => handleStarClick(index, rating)} // Asigna valor a la pregunta correspondiente
                        />
                        ))}
                    </div>
                    </IonItem>
                ))}
                </IonList>
                {/* Botón para enviar la encuesta */}
                <IonButton expand="block" onClick={enviarEncuesta}>
                Enviar Encuesta
                </IonButton>
            </IonContent>
        </IonPage>
    );

}


export default Encuesta;