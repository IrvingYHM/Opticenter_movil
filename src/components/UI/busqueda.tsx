import { IonPage, IonSearchbar } from "@ionic/react";
import React from "react";

const Buscar: React.FC = ( ) => {
    return(
        <IonSearchbar
            className="text-sm mx-auto rounded-full w-21"
            style={{'--border-radius': '9999px'}}
        />
    );
}
export default Buscar