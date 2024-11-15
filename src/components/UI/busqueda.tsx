import { IonPage, IonSearchbar, IonList, IonItem, IonLabel, IonContent } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useSearchContext } from "../../contexts/SearcContect";


const Buscar: React.FC = () => {
  const { setSearchText } = useSearchContext();

  return (
    <IonSearchbar
      className="text-sm mx-auto rounded-full"
      style={{ '--border-radius': '9999px', maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' } as React.CSSProperties}
      onIonInput={(e: { detail: { value: string; }; }) => setSearchText(e.detail.value as string)} // Convertimos el valor a string
      placeholder="Buscar en Opticenter"
    />
  );
};

export default Buscar;
