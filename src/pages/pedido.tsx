// components/CreatePedido.tsx
import React, { useState } from 'react';
import { createPedido } from '../services/ApiPedido';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem, IonText } from '@ionic/react';

const CreatePedido: React.FC = () => {
  const [formData, setFormData] = useState({
    IdCliente: '',
    TotalPe: '',
    IdMetodoPago: '',
    IdEstado_Pedido: 1, // PENDIENTE
    IdEstado_Envio: 1, // PENDIENTE
    IdDireccion: '',
    IdPaqueteria: '',
    IdEmpleado: '',
  });
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const createdPedido = await createPedido(formData);
      setPedido(createdPedido.pedido); // Almacenar los datos del pedido creado
      setError(''); // Limpiar el error si la creación fue exitosa
    } catch (error) {
      setError('Error al crear el pedido. Inténtalo nuevamente.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Id Cliente</IonLabel>
            <IonInput
              type="text"
              name="IdCliente"
              value={formData.IdCliente}
              onIonChange={handleChange}
              required
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="floating">Total</IonLabel>
            <IonInput
              type="number"
              name="TotalPe"
              value={formData.TotalPe}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Método de Pago</IonLabel>
            <IonInput
              type="text"
              name="IdMetodoPago"
              value={formData.IdMetodoPago}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Dirección</IonLabel>
            <IonInput
              type="text"
              name="IdDireccion"
              value={formData.IdDireccion}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Paquetería</IonLabel>
            <IonInput
              type="text"
              name="IdPaqueteria"
              value={formData.IdPaqueteria}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Empleado</IonLabel>
            <IonInput
              type="text"
              name="IdEmpleado"
              value={formData.IdEmpleado}
              onIonChange={handleChange}
              required
            />
          </IonItem>

          <IonButton expand="full" type="submit" color="primary">
            Crear Pedido
          </IonButton>
        </form>

        {error && <IonText color="danger"><p>{error}</p></IonText>}
        
        {pedido && (
          <div>
            <h3>Pedido Creado</h3>
            <pre>{JSON.stringify(pedido, null, 2)}</pre>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CreatePedido;
