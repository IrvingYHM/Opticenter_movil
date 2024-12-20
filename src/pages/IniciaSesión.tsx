import { IonCardContent, IonContent, IonHeader, IonicSlides, IonImg, IonMenuButton, IonPage, IonSearchbar, IonSplitPane, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import Footer from '../components/Footer';
import Formulario from "../components/Formulario";
import Header from "../components/UI/header";

const IniciaSesion: React.FC = () =>{
    return(
    <IonPage id="main-content" style={{ marginBottom: '50px' }}>
        <Header />
        
        <IonContent>
          
            <Formulario />
           
        </IonContent>
    </IonPage>
    );
}

export default IniciaSesion;