import React, { useState } from 'react';
import {IonContent, IonPage, IonInput,IonLabel,IonButton,  IonItem, IonToast, IonHeader, IonToolbar,IonTitle,} from '@ionic/react';
import {api} from '../services/Apis';

const Registro: React.FC = () => {
  const [form, setForm] = useState({
    vchNomCliente: '',
    vchAPaterno: '',
    vchAMaterno: '',
    vchCorreo: '',
    chrSexo: '',
    dtFechaNacimiento: '',
    vchTelefono: '',
    vchPassword: '',
    vchPreguntaSecreta: '',
    vchRespuestaSecreta: '',
  });

  const [showToast, setShowToast] = useState({ show: false, message: '', color: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLIonInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/clientes', form);
      setShowToast({ show: true, message: 'Cliente registrado con éxito', color: 'success' });
      console.log(response.data);
    } catch (error: any) {
      console.error(error);
      setShowToast({ show: true, message: 'Error al registrar el cliente', color: 'danger' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar Cliente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Nombre</IonLabel>
            <IonInput
              name="vchNomCliente"
              value={form.vchNomCliente}
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Apellido Paterno</IonLabel>
            <IonInput
              name="vchAPaterno"
              value={form.vchAPaterno}
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Apellido Materno</IonLabel>
            <IonInput
              name="vchAMaterno"
              value={form.vchAMaterno}
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Correo Electrónico</IonLabel>
            <IonInput
              name="vchCorreo"
              value={form.vchCorreo}
              type="email"
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Sexo</IonLabel>
            <IonInput
              name="chrSexo"
              value={form.chrSexo}
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Fecha de Nacimiento</IonLabel>
            <IonInput
              name="dtFechaNacimiento"
              value={form.dtFechaNacimiento}
              type="date"
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Teléfono</IonLabel>
            <IonInput
              name="vchTelefono"
              value={form.vchTelefono}
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput
              name="vchPassword"
              value={form.vchPassword}
              type="password"
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Pregunta Secreta</IonLabel>
            <IonInput
              name="vchPreguntaSecreta"
              value={form.vchPreguntaSecreta}
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Respuesta Secreta</IonLabel>
            <IonInput
              name="vchRespuestaSecreta"
              value={form.vchRespuestaSecreta}
              onIonInput={(e: React.ChangeEvent<HTMLIonInputElement>) => handleInputChange(e)}
              required
            />
          </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Registrar
          </IonButton>
        </form>
        <IonToast
          isOpen={showToast.show}
          message={showToast.message}
          duration={3000}
          color={showToast.color}
          onDidDismiss={() => setShowToast({ ...showToast, show: false })}
        />
      </IonContent>
    </IonPage>
  );
};

export default Registro;
