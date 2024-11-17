import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader,IonPage, IonTitle, IonToolbar, IonSplitPane, IonMenuButton, IonSearchbar, IonImg, IonCard, IonLabel, IonButton, IonRouterLink, IonList, IonItem, IonIcon, IonAvatar, IonButtons } from '@ionic/react';
import Header from '../components/UI/header';
import ImageCarousel from '../components/UI/carrucel';
import ProductosOfertas from '../components/Shared/productosOfertas';
import CategoriasCarrucel from '../components/UI/CategoriasCarrucel';
import ProductosViewCart from './productosViewCart';
import { useSearchContext } from '../contexts/SearcContect';
import HomeOne from '../components/home';

const Home: React.FC = () => {
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


  return (
      <IonPage id="main-content" style={{ marginBottom: '30px' }}> 

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
        

          <IonCard >
            <IonLabel>
              <h2 className="font-bold text-center text-black text-2xl">¡Crea una cuenta y mejora tu experiencia!</h2>
              <IonButton className='items-center justify-center flex p-4' routerLink='/Crearcuenta'>Crear cuenta</IonButton>
                <IonRouterLink routerLink="/IniciaSesion">
                  <h2 className="text-blue-500 text-center p-2 ">Ingresar a mi cuenta</h2>
                </IonRouterLink>
            </IonLabel>
          </IonCard>
          
          <HomeOne />

          <CategoriasCarrucel />
          
          <p className='text-center'>Productos en oferta</p>
          <ProductosOfertas />
          
          <IonCard className='p-2'>
            <IonLabel>
              <h2 className="font-bold text-black text-2xl">¿Necesitas ayuda?</h2>
            </IonLabel>
            <IonList>
              <IonItem>
                <IonRouterLink>
                <IonLabel className='text-black'>Terminos y condiciones</IonLabel>
                </IonRouterLink>
              </IonItem>
              <IonItem>
                <IonLabel>Conocer más</IonLabel>
              </IonItem>
            </IonList>
          </IonCard>
        </IonContent>
        

      </IonPage>
  );
};

export default Home;
