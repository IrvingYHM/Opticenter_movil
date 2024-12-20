import React from 'react';
import { IonMenu, IonHeader, IonContent, IonList, IonItem, IonLabel, IonMenuToggle, IonIcon } from '@ionic/react';
import { home, cart, bag, calendar, person, people, call, pricetag, logOut } from "ionicons/icons";
import IconoRedondo from './UI/iconoUser';
import Boton from './UI/button';
import { useAuth } from './../contexts/Auth'; 

const Menu: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <IonMenu side="start" contentId="main-content"> 
      <IonHeader>
        <div className="bg-blue-400">
          <IonMenuToggle>
            <IconoRedondo />
            <Boton />
          </IonMenuToggle>
       </div>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem button routerLink={isAuthenticated ? "/HomeAuth" : "/home"}>
              <IonIcon icon={home} slot="start" />
              <IonLabel>{isAuthenticated ? "Inicio" : "Inicio"}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem button routerLink="/Productos">
              <IonIcon icon={bag} slot="start" />
              <IonLabel>Productos</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem button routerLink="/AgendaCita">
              <IonIcon icon={calendar} slot="start" />
              <IonLabel>Agendar Cita</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem button routerLink="/Carrito">
              <IonIcon icon={cart} slot="start" />
              <IonLabel>Mi carrito</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {!isAuthenticated ? ( 
            <IonMenuToggle>
              <IonItem button routerLink="/IniciaSesion">
                <IonIcon icon={person} slot="start" />
                <IonLabel>Mis citas</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ) : ( 
            <IonMenuToggle>
              <IonItem button routerLink="/miscitas">
                <IonIcon icon={person} slot="start" />
                <IonLabel>Mis citas</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
          {!isAuthenticated ? ( 
            <IonMenuToggle>
              <IonItem button routerLink="/IniciaSesion">
                <IonIcon icon={pricetag} slot="start" />
                <IonLabel>Mis Pedidos</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ) : ( 
            <IonMenuToggle>
              <IonItem button routerLink="/misCompras">
                <IonIcon icon={pricetag} slot="start" />
                <IonLabel>Mis Pedidos</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
          {!isAuthenticated ? ( 
            <IonMenuToggle>
              <IonItem button routerLink="/IniciaSesion">
                <IonIcon icon={person} slot="start" />
                <IonLabel>Iniciar Sesión</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ) : ( 
            <IonMenuToggle>
              <IonItem button routerLink="/Perfil">
                <IonIcon icon={person} slot="start" />
                <IonLabel>Perfil</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
          <IonMenuToggle>
            <IonItem button routerLink="/Acercade">
              <IonIcon icon={people} slot="start" />
              <IonLabel>Sobre Nosotros</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem>
              <IonIcon icon={call} slot="start" />
              <IonLabel>Contacto</IonLabel><br />
              <IonLabel></IonLabel>

            </IonItem>
          </IonMenuToggle>
          {!isAuthenticated ? ( 
            <IonMenuToggle>
              <IonItem button routerLink="/home">
                <IonIcon icon={logOut} slot="start" />
                <IonLabel>Salir</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ) : ( 
            <IonMenuToggle>
              <IonItem button routerLink="/home">
                <IonIcon icon={logOut} slot="start" />
                <IonLabel>Salir</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
