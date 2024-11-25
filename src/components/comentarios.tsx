import {
    IonModal,
    IonButton,
    IonInput,
    IonTextarea,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonToast,
  } from "@ionic/react";
  import { SetStateAction, useState } from "react";
  import axios from "axios";
  
  const Comentarios: React.FC<{ IdProducto: number }> = ({ IdProducto }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comentario, setComentario] = useState("");
    const [calificacion, setCalificacion] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [errorToast, setErrorToast] = useState(false);
  
    const handleSubmit = async () => {
      // Validación de campos
      if (!comentario || !calificacion) {
        setErrorToast(true);
        return;
      }
  
      try {
        // Llamada al backend
        await axios.post("https://backopt-production.up.railway.app/api/comentarios", {
          IdProducto,
          comentario,
          calificacion,
        });
  
        // Resetea los campos y cierra el modal
        setShowToast(true);
        setComentario("");
        setCalificacion(null);
        setIsOpen(false);
      } catch (error) {
        console.error("Error al enviar el comentario:", error);
        setErrorToast(true);
      }
    };
  
    return (
      <>
        {/* Botón para abrir el modal */}
        <IonButton onClick={() => setIsOpen(true)}>Dejar un comentario</IonButton>
  
        {/* Modal */}
        <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
          <div style={{ padding: "16px" }}>
            <h2>Deja tu comentario</h2>
  
            <IonItem>
              <IonLabel position="stacked">Comentario</IonLabel>
              <IonTextarea
                value={comentario}
                onIonChange={(e: { detail: { value: SetStateAction<string>; }; }) => setComentario(e.detail.value!)}
                placeholder="Escribe tu opinión sobre el producto"
              />
            </IonItem>
  
            <IonItem>
              <IonLabel position="stacked">Calificación</IonLabel>
              <IonSelect
                value={calificacion}
                placeholder="Selecciona una calificación"
                onIonChange={(e: { detail: { value: string; }; }) => setCalificacion(parseInt(e.detail.value!))}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <IonSelectOption key={star} value={star}>
                    {star} {star === 1 ? "estrella" : "estrellas"}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
  
            <IonButton expand="block" onClick={handleSubmit}>
              Enviar comentario
            </IonButton>
            <IonButton expand="block" color="light" onClick={() => setIsOpen(false)}>
              Cancelar
            </IonButton>
          </div>
        </IonModal>
  
        {/* Toast de éxito */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Comentario enviado con éxito"
          duration={2000}
          color="success"
        />
  
        {/* Toast de error */}
        <IonToast
          isOpen={errorToast}
          onDidDismiss={() => setErrorToast(false)}
          message="Error al enviar el comentario. Por favor, intenta de nuevo."
          duration={2000}
          color="danger"
        />
      </>
    );
  };
  
  export default Comentarios;
  