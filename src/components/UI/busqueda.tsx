import { IonPage, IonSearchbar } from "@ionic/react";
import React from "react";

const Buscar: React.FC = ( ) => {
    return(
        <IonSearchbar
            className="text-sm mx-auto rounded-full"
            style={{ '--border-radius': '9999px' } as React.CSSProperties}
        />
    );
}
export default Buscar