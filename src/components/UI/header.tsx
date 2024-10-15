import React from "react";
import { IonHeader, IonMenuButton, IonToolbar } from "@ionic/react";
import Buscar from "./busqueda";
import Logo from "./logo";

const Header: React.FC  = () => {
    return (
        <IonHeader>
        <IonToolbar>
          <div className="flex items-center p-4 bg-blue-400 ">
            <IonMenuButton  slot="start"/>
            <Buscar />
            <Logo />
          </div>
        </IonToolbar>
      </IonHeader>
    );
}

export default Header;