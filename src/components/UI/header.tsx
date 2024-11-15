import React from "react";
import { IonHeader, IonMenuButton, IonToolbar } from "@ionic/react";
import Buscar from "./busqueda";
import Logo from "./logo";

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="flex items-center justify-between w-full p-3 bg-blue-400">
          
          <IonMenuButton className="pr-0" slot="start" />
        
          <div className="flex justify-center w-2/3">
            <Buscar />
          </div>

        
          <Logo />
        </div>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;
