import { IonPage, IonHeader, IonContent, IonImg, IonMenuButton, IonSearchbar, IonToolbar, IonItem, IonLabel, IonList, IonRouterLink } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../components/UI/header";
import CrearCita from "../components/agendarCita";
import { useSearchContext } from "../contexts/SearcContect";

const AgendaCita: React.FC = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const { searchText, results, setResults } = useSearchContext();

    useEffect(() => {
      const fetchResults = async () => {
        if (searchText.trim() === "") {
          setResults([]);
          return;
        }
        try {
          const response = await fetch(`https://backopt-production.up.railway.app/productos/Buscar_productos?busqueda=${searchText}`);
          if (response.ok) {
            const data = await response.json();
            setResults(data);
          } else {
            setResults([]);
          }
        } catch {
          setResults([]);
        }
      };
      fetchResults();
    }, [searchText, setResults]);
  
    const handleSearch = async (searchTerm: string) => {
      if (searchTerm.trim() === '') {
        setResults([]);
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/productos/Buscar_productos?busqueda=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Error al realizar la búsqueda');
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
 
    return(
        <IonPage id="main-content" style={{ marginBottom: '50px' }}>
        <Header />
        <IonContent>
        
        <CrearCita />
        </IonContent>

        </IonPage>

    );
}

export default AgendaCita;