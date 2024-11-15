import React, { useEffect, useState } from "react";
import { IonContent, IonItem, IonLabel, IonList, IonPage, IonRouterLink } from '@ionic/react'
import Header from '../../components/UI/header';
import ProductosOfertas from "../../components/Shared/productosOfertas";
import ImageCarousel from "../../components/UI/carrucel";
import CategoriasCarrucel from "../../components/UI/CategoriasCarrucel";
import HomeOne from "../../components/home";
import { useSearchContext } from "../../contexts/SearcContect";
const HomeAuth: React.FC = ()=> {
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
        const response = await fetch(`https://backopt-production.up.railway.app/productos/Buscar_productos?busqueda=${searchTerm}`);
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
        <IonPage style={{ marginBottom: '50px' }}>
        <Header />
        <IonContent>
        {results.length > 0 && (
                    <IonList>
                    {results.map((product) => (
                        <IonRouterLink key={product.IdProducto} routerLink={`/productos/${product.IdProducto}`}>
                        <IonItem >
                        <IonLabel>{product.vchNombreProducto}</IonLabel>
                        </IonItem>
                        </IonRouterLink>
                    ))}
                    </IonList>
                )}              
            <ImageCarousel />
            <CategoriasCarrucel />
            <HomeOne />
            <p className="text-center">Productos en oferta</p>
            <ProductosOfertas />
        </IonContent>
        </IonPage>
    );
}

export default HomeAuth;