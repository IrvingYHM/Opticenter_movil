import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRouterLink, IonButton } from '@ionic/react';
import Header from '../components/UI/header';
//import './miCompra.css';
import { toast } from 'react-toastify';

const MiCompra: React.FC = () => {
    const [compras, setCompras] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCompras = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Por favor inicia sesión para ver tus compras.');
                return;
            }

            try {
                const response = await fetch('https://backopt-production.up.railway.app/pedido/IdPedido', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) throw new Error('Error al obtener las compras');
                const data = await response.json();
                setCompras(data);
                console.log(compras)
            } catch (error) {
                console.error(error);
                toast.error('No se pudieron cargar tus compras.');
            } finally {
                setLoading(false);
            }
        };

        fetchCompras();
    }, []);

    return (
        <IonPage>
            <Header />
            <IonContent className="ion-padding">
                <h1 className="text-center text-2xl font-bold">Mis Compras</h1>
                {loading ? (
                    <p className="text-center">Cargando...</p>
                ) : compras.length === 0 ? (
                    <p className="text-center">No has realizado compras.</p>
                ) : (
                    <IonList>
                        {compras.map((compra) => (
                            <IonCard key={compra.IdPedido}>
                                <IonCardHeader>
                                    <IonCardTitle>Pedido #{compra.IdPedido}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonLabel>
                                        <p><strong>Fecha:</strong> {new Date(compra.Fecha_Hora).toLocaleDateString()}</p>
                                        <p><strong>Estado:</strong> {compra.IdMetodoPago}</p>
                                        <p><strong>Total:</strong> ${compra.TotalPe}</p>
                                    </IonLabel>
                                    <IonButton expand="block" routerLink={`/misCompras/${compra.IdPedido}`} color="primary">
                                        Ver Detalle
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default MiCompra;
