import React, { useState } from "react";
import axios from "axios";
import {
  IonButton,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonToast,
} from "@ionic/react";

interface CancelarCitaProps {
  citaId: string;
  onCancelSuccess: (citaId: string) => void;
  onError: (message: string) => void;
}


const cancelarcita: React.FC<CancelarCitaProps> = ({ citaId, onCancelSuccess,onError  }) => {
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleCancelClick = async () => {
    console.log("Cita ID a cancelar:", citaId);

    try {
      setLoading(true);
      const response = await axios.put(
        `https://backopt-production.up.railway.app/cita/cancelar/${citaId}`
      );

      if (response.status === 200) {
        setToastMessage("La cita ha sido cancelada exitosamente");
        onCancelSuccess(citaId);
      } else {
        setToastMessage("Hubo un problema al cancelar la cita");
      }
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
      onError((error as Error).message || 'Error desconocido');
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <>
      <IonButton onClick={openModal} color="danger" disabled={loading}>
        {loading ? "Cancelando..." : "Cancelar"}
      </IonButton>

      <IonModal isOpen={modalIsOpen} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Confirmar Cancelación</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={closeModal}>Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2 className="ion-text-center">¿Estás seguro de que deseas cancelar esta cita?</h2>
          <div className="ion-padding-top ion-text-center">
            <IonButton onClick={handleCancelClick} color="danger" disabled={loading}>
              {loading ? "Cancelando..." : "Confirmar"}
            </IonButton>
            <IonButton onClick={closeModal} color="medium">
              Cancelar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonToast
        isOpen={!!toastMessage}
        duration={5000}
        onDidDismiss={() => setToastMessage(null)}
        position="top"
      />
    </>
  );
};

export default cancelarcita;
