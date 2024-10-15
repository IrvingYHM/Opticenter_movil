import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonMenuToggle } from '@ionic/react';

const Menu: React.FC = () => {
  return (
    <IonMenu side="start" contentId="main-content"> 
      <IonHeader>
        <div>
          <IonToolbar className="bg-blue-700" color="primary" >
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </div>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
            <IonMenuToggle>
                <IonItem button routerLink="/home">
                    <IonLabel>Inicio</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="/Productos">
                <IonLabel>Productos</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="/AgendaCita">
                <IonLabel>Agendar Cita</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="/Carrito">
                <IonLabel>Mi carrito</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button routerLink="/IniciaSesion">
                <IonLabel>IniciaSesion</IonLabel>
                </IonItem>
            </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
