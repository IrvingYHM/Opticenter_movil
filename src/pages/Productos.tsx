import { IonPage, IonHeader, IonContent, IonImg, IonMenuButton, IonSearchbar, IonToolbar } from "@ionic/react";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/UI/header";
import ProductosVista from "../components/Shared/productos";
const Productos: React.FC = () =>{
    return(
        <IonPage id="main-content">
          <Header />
        <IonContent>
          
          <ProductosVista />

        </IonContent>

        <Footer />
        </IonPage>

    );
}

export default Productos;