import React, { useState, useEffect } from "react";
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

const CrearCita = () => {
  const [selectFecha, setSelectFecha] = useState(new Date().toISOString());
  const [selectHora, setSelectHora] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [idTipoCita, setIdTipoCita] = useState<number | null>(null);
  const [costo, setCosto] = useState("");
  const [descripcionT, setDescripcionT] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showEncuesta, setShowEncuesta] = useState(false); // Estado para mostrar la encuesta
  const [encuestaCompletada, setEncuestaCompletada] = useState(false);
  const [encuestaPendiente, setEncuestaPendiente] = useState(false);
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
  
  const tiposCita = [
    { id: 1, nombre: "Examen de vista", costo: 100 },
    { id: 2, nombre: "Ajuste de Gafas", costo: 150 },
    { id: 3, nombre: "Examen de Lentes de Contacto", costo: 120 },
    { id: 4, nombre: "Examen de Salud Ocular", costo: 160 },
    { id: 5, nombre: "Otro", costo: 180 },
  ];

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setIdCliente(decodedToken.clienteId);
    } 
    
  }, [idCliente]);

    
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
    const fechaFormateada = format(new Date(fecha), "yyyy-MM-dd");
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/horarios/HrPorFecha?fecha=${fechaFormateada}`
      );
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
    verificaencuestaCompletada()
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
        const citaResponse = await fetch(
          "http://localhost:3000/cita",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Fecha: format(new Date(selectFecha), "yyyy-MM-dd"),
              Hora: selectHora,
              IdCliente: idCliente,
              IdTipoCita: idTipoCita,
              Costo: costo,
              IdEstadoCita: 1,
              DescripcionT: idTipoCita === 5 ? descripcionT : null,
              estado: 'Pendiente',
            }),
          }
        );

        if (citaResponse.status === 201) {
          toast.success("Cita agendada exitosamente");
          verificaencuestaCompletada()
          if (!encuestaCompletada) {
            setShowEncuesta(true);
          } else {
            toast.info("Encuesta ya completada previamente. Gracias!");
            history.push("/miscitas")
          } // Mostrar encuesta al finalizar
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
  const verificaencuestaCompletada = async () => {
    try {
      const response = await fetch(`http://localhost:3000/EncuestaM/completada?idUsuario=${idCliente}`);
      
      if (response.ok) {
        const data = await response.json();
        if(data.completada){
          setEncuestaCompletada(true);
        }
      }
    } catch (error) {
      console.error("Error al comprobar si la encuesta fue completada:", error);
    }
  };

const saveEncuestaPendiente = async () => {
  try {
    const response = await fetch("http://localhost:3000/guardarEncuestaPendientes", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({
        idUsuario: idCliente
      }),
    });

    if (response.ok) {
      toast.success("Estado de la encuesta marcado como pendiente");
    } else {
      toast.error("Error al guardar el estado de la encuesta");
    }
  } catch (error) {
    console.error("Error al guardar la encuesta pendiente:", error);
    toast.error("Error al guardar el estado de la encuesta");
  }
};
  const enviarEncuesta = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/EncuestaM",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            idUsuario: idCliente, respuestas, preguntas
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
  const handleModalDismiss = () => {
    if (!encuestaCompletada) {
      // Ejecutar lógica solo si la encuesta no se completó
      saveEncuestaPendiente();
    }
    setShowEncuesta(false); // Cerrar el modal
  };

  return (
    <IonPage id="main-content" style={{ marginBottom: '10px'}}>
      <Header />
      <IonToast />
      <IonContent>
        
        <h1 className="ion-text-center">Agendar Citas</h1>
       
        <IonItem>
          <IonLabel>Fecha de Cita</IonLabel>
          <IonDatetime
            presentation="date"
            value={selectFecha}
            onIonChange={handleDateChange}
          />
        </IonItem>
        {loading ? (
          <IonSpinner name="dots" />
        ) : (
          <>
            <IonItem>
              <IonLabel>Hora</IonLabel>
              <IonSelect
                value={selectHora}
                placeholder="Selecciona una hora"
                onIonChange={(e: any) => setSelectHora(e.detail.value)}
              >
                {horarios.map((hora, index) => (
                  <IonSelectOption key={index} value={hora}>
                    {hora}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Tipo de Cita</IonLabel>
              <IonSelect
                value={idTipoCita || ""}
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
                  onIonChange={(e: any) => setDescripcionT(e.detail.value)}
                />
              </IonItem>
            )}
            <IonItem>
              <IonLabel>Costo:</IonLabel>
              <IonText>${costo}</IonText>
            </IonItem>
            <IonButton expand="block" onClick={handleSubmit}>
              Confirmar Cita
            </IonButton>
            
          </>
        )}
        {/* Modal para la encuesta */}
        <IonModal isOpen={showEncuesta} onDidDismiss={handleModalDismiss} className="custom-modal" >
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
        </IonModal>
      </IonContent>
    </IonPage>
  );
};


export default CrearCita;

