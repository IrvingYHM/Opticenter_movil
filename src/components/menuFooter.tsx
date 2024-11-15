import React from 'react';
import { IonFooter, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel } from '@ionic/react';
import { home, cart, bag, calendar, person, people, call, homeOutline, bagOutline, calendarOutline, cartOutline, personOutline } from "ionicons/icons";
import IconoRedondo from './UI/iconoUser';
import Boton from './UI/button';
import { useAuth } from './../contexts/Auth';
import  './ExploreContainer.css'

const MenuFooter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
    <IonFooter className='footer'>
      <IonToolbar className='tolbar'>
        <IonButtons slot="end">
          <IonButton className='ion-button' routerLink={isAuthenticated ? "/HomeAuth" : "/home"}>
            <IonIcon className='ion-icon' icon={homeOutline} />
          </IonButton>
          <IonButton className='ion-button' routerLink="/Productos">
            <IonIcon className='ion-icon' icon={bagOutline} />
          </IonButton>
          <IonButton className='ion-button' routerLink="/AgendaCita">
            <IonIcon className='ion-icon' icon={calendarOutline} />
          </IonButton>
          <IonButton className='ion-button'   routerLink="/Carrito">
            <IonIcon className='ion-icon' icon={cartOutline} />
            
          </IonButton>
          {!isAuthenticated ? (
            <IonButton className='ion-button' routerLink="/IniciaSesion">
              <IonIcon className='ion-icon' icon={personOutline} />
             
            </IonButton>
          ) : (
            <IonButton className='ion-button' routerLink="/Perfil">
              <IonIcon className='ion-icon' icon={personOutline} />
              
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonFooter>
    </>
  );
};

export default MenuFooter;
