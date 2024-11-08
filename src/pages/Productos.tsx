import { IonPage, IonHeader, IonContent, IonImg, IonMenuButton, IonSearchbar, IonToolbar } from "@ionic/react";
import React from "react";
import Header from "../components/UI/header";
import ProductosVista from "../components/Shared/productos";
const Productos: React.FC = () =>{
    return(
        <IonPage id="main-content">
          <Header />
        <IonContent>
          
          <ProductosVista />

        </IonContent>

        </IonPage>

    );
}

export default Productos;