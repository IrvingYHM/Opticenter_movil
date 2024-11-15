import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonToast } from '@ionic/react';

const Pedidos: React.FC = () => {
  // Estado para almacenar los datos del formulario
  const [clienteId, setClienteId] = useState<string>('');
  const [direccion, setDireccion] = useState<string>('');
  const [metodoPago, setMetodoPago] = useState<string>('');
  const [paqueteria, setPaqueteria] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Función para enviar el formulario al backend usando fetch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pedidoData = {
      IdCliente: clienteId,
      Direccion: direccion,
      MetodoPago: metodoPago,
      Paqueteria: paqueteria,
      Total: total,
    };

    try {
      const response = await fetch('https://tu-api-url.com/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        // Mostrar un mensaje de éxito
        setToastMessage('Pedido creado exitosamente');
        setShowToast(true);

        // Limpia los campos del formulario
        setClienteId('');
        setDireccion('');
        setMetodoPago('');
        setPaqueteria('');
        setTotal(0);
      } else {
        // Manejo de error si la respuesta no es exitosa
        setToastMessage('Error al crear el pedido');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      setToastMessage('Error al crear el pedido');
      setShowToast(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonList>
        <IonItem>
          <IonLabel position="stacked">ID del Cliente</IonLabel>
          <IonInput
            value={clienteId}
            onIonChange={(e: { detail: { value: React.SetStateAction<string>; }; }) => setClienteId(e.detail.value!)}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Dirección</IonLabel>
          <IonInput
            value={direccion}
            onIonChange={(e: { detail: { value: React.SetStateAction<string>; }; }) => setDireccion(e.detail.value!)}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Método de Pago</IonLabel>
          <IonInput
            value={metodoPago}
            onIonChange={(e: { detail: { value: React.SetStateAction<string>; }; }) => setMetodoPago(e.detail.value!)}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Paquetería</IonLabel>
          <IonInput
            value={paqueteria}
            onIonChange={(e: { detail: { value: React.SetStateAction<string>; }; }) => setPaqueteria(e.detail.value!)}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Total</IonLabel>
          <IonInput
            type="number"
            value={total}
            onIonChange={(e: { detail: { value: string; }; }) => setTotal(parseFloat(e.detail.value!))}
            required
          />
        </IonItem>
      </IonList>
      <IonButton type="submit" expand="block">
        Crear Pedido
      </IonButton>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
      />
    </form>
  );
};

export default Pedidos;
