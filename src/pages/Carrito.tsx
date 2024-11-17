import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonInput, IonButton, IonModal, IonItem, IonList, IonRouterLink } from "@ionic/react";
import React, { useState, useEffect, useRef  } from "react";
import { useParams,useHistory } from 'react-router-dom';
import Header from "../components/UI/header";
import { loadStripe, PaymentIntent } from '@stripe/stripe-js';
import { CardElement, CardCvcElement,CardNumberElement,CardExpiryElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import './carrito.css';
import { useSearchContext } from "../contexts/SearcContect";

const stripePromise = loadStripe('pk_test_51QF7CwP4u0AspHWqVkcLHlGObKirereYBP7bQJOetZ3Bgv1HQDXfCaEQBWM8cv3kvJ69rNvjdOwsMw4nzqgSxGhN00ik1ViWMd');

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}


const Carrito: React.FC = () => {    
    const history = useHistory();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [detalleCarrito, setDetalleCarrito] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
    const [clienteId, setClienteId] = useState<string>("");
    const [userType, setUserType] = useState<string | null>(null);
    const [cartId, setCartId] = useState<string | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
    const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false); 




    const stripe = useStripe();
    const elements = useElements();
    
    const paymentFormRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
          const token = localStorage.getItem("token");
          if (token) {
              const decodedToken = parseJwt(token);
              setUserType(decodedToken.userType);
              setClienteId(decodedToken.clienteId);
              console.log("Cliente ID:", decodedToken.clienteId);
          }
      }, []);

      useEffect(() => {
        const fetchDetalleCarrito = async () => {
            if (clienteId) {
                try {
                    const response = await fetch(`https://backopt-production.up.railway.app/Carrito/uno?userId=${clienteId}`);
                    if (!response.ok) throw new Error("Error al obtener el detalle del carrito");
                    const data = await response.json();
                    setDetalleCarrito(data);
        
                   
                    if (data[0]?.IdCarrito) {
                      setCartId(data[0].IdCarrito);
                      console.log("ID del Carrito:", cartId); 
                    } else {
                      console.warn("IdCarrito no está presente en los datos de respuesta");
                    }
                    
                  } catch (error) {
                    console.error(error);
                  }
                }
              };
            
              fetchDetalleCarrito();
            }, [clienteId]);
    
  useEffect(() => {
    const subtotal = detalleCarrito
      .filter((detalle) => selectedProducts.has(detalle.IdDetalle_Carrito))
      .reduce((total, detalle) => total + detalle.SubTotal, 0);
    setTotal(subtotal);
  }, [detalleCarrito, selectedProducts]);
  
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(productId)) {
        newSelected.delete(productId);
      } else {
        newSelected.add(productId);
      }
      return newSelected;
    });
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false); 
    };

    
    const handlePayment = async () => {
        setShowPaymentModal(true);
        try {
            const response = await fetch('https://backopt-production.up.railway.app/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount: total * 100, 
                    clienteId: clienteId
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setClientSecret(data.clientSecret);

                if (paymentFormRef.current) {
                    paymentFormRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                throw new Error(data.error || 'Error al crear el Payment Intent');
            }
        } catch (error) {
            console.error('Error al crear el Payment Intent:', error);
            toast.error('Error al iniciar el pago.');
        }
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (isProcessingPayment || !stripe || !elements || !clientSecret) return;
        setIsProcessingPayment(true);
    
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;
    
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });
    
        if (error) {
            console.error('Error en el pago:', error);
            toast.error('El pago falló: ' + error.message);
           
        } else {
            if (paymentIntent.status === 'succeeded') {
                toast.success('¡Pago exitoso!');
                console.log(paymentIntent.status)
    
               
                const response = await fetch('https://backopt-production.up.railway.app/confirm-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentIntentId: paymentIntent.id,
                        carritoId: cartId, 
                    }),
                });
                setShowPaymentModal(false);
                const data = await response.json();
                if (data.success) {
                    console.log('Pago confirmado en el backend');
                    
                    setTimeout(() => {
                        history.push("/misCompras");
                      }, 3000);
                } else {
                    toast.error('Error al confirmar el pago');
                }
                try {
                    await saveOrderDetails(paymentIntent); 
    
                } catch (saveError) {
                    console.error('Error al guardar los detalles del pedido:', saveError);
                    toast.error('Error al guardar la información del pedido.');
                }

                const updateResponse = await fetch(
                    "https://backopt-production.up.railway.app/productos/update",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ detalleCarrito }),
                    }
                  );
                  const updateData = await updateResponse.json();
                  console.log(updateData);
                  setIsProcessingPayment(false);
            }
            
        }
           
        
    };

    const saveOrderDetails = async (paymentIntent: PaymentIntent) => {
        try {
            const response = await fetch('https://backopt-production.up.railway.app/pedido/agregar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    clienteId: clienteId, 
                    detalles: detalleCarrito, 
                }),
            });
    
            if (!response.ok) {
                throw new Error('Error al guardar los detalles del pedido');
            }
    
            const data = await response.json();
            console.log('Detalles del pedido guardados:', data);
            
        } catch (error) {
            console.error('Error al guardar los detalles del pedido:', error);
            toast.error('Error al guardar la información del pedido.');
        }
    };

    //busqueda
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
        <IonPage id="main-content">
            <Header />
            <IonContent className="bg-gray-100">
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
                <div className="min-h-screen pt-20">
                    <h1 className="mb-10 text-center text-2xl font-bold">Carrito de compras</h1>
                    <div className="mx-auto max-w-7xl px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="w-full md:w-2/3">
                            {detalleCarrito.length === 0 ? (
                                <p className="text-center">No hay productos en el carrito.</p>
                            ) : (
                                detalleCarrito.map((detalle) => (
                                    <IonCard 
                                    key={detalle.IdDetalle_Carrito}  
                                    className={`mb-6 ${selectedProducts.has(detalle.IdDetalle_Carrito) ? "bg-green-100" : "bg-white"}`}
                                    onClick={() => toggleProductSelection(detalle.IdDetalle_Carrito)}
                                    >
                                        <IonCardHeader>
                                            <IonCardTitle className="text-lg font-semibold text-gray-800">
                                                {detalle.producto.vchNombreProducto}
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <div className="flex items-center justify-between mb-4">
                                                <img
                                                    src={detalle.producto.vchNomImagen}
                                                    alt={detalle.producto.vchNombreProducto}
                                                    className="w-20 md:w-40 rounded-lg"
                                                />
                                                <div className="mx-7">
                                                    <IonLabel className="text-xs text-gray-700">{detalle.Descripcion}</IonLabel>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <IonInput
                                                    type="number"
                                                    value={detalle.Cantidad}
                                                    min="1"
                                                    readonly
                                                    className="h-8 w-8 border bg-white text-center text-xs"
                                                />
                                                <IonLabel className="text-sm">${detalle.Precio}</IonLabel>
                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                ))
                            )}
                        </div>


                        {/* Detalle de la compra y formulario de pago */}
                        <div className="w-full md:w-1/3">
                            <IonCard className="rounded-lg border bg-white shadow-md p-6">
                                <IonCardHeader>
                                    <IonCardTitle className="text-center text-lg font-bold">Detalle de tu Compra</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    {detalleCarrito
                                        .filter((detalle) => selectedProducts.has(detalle.IdDetalle_Carrito))
                                        .map((detalle) => (
                                            <div key={detalle.IdDetalle_Carrito} className="flex justify-between my-2">
                                                <IonLabel className="text-gray-700">{detalle.producto.vchNombreProducto}</IonLabel>
                                                <IonLabel className="text-gray-700">${detalle.SubTotal}</IonLabel>
                                            </div>
                                        ))}
                                    <hr className="my-4" />
                                    <div className="flex justify-between text-lg font-semibold">
                                        <IonLabel>Total</IonLabel>
                                        <IonLabel>${total}</IonLabel>
                                    </div>
                                    <IonButton onClick={handlePayment} expand="full" className="mt-6 bg-blue-600 hover:bg-blue-700 transition">
                                        Pagar
                                    </IonButton>
                                    {/**tomar los datos de stripe y crear el formulario */}
                                    <IonModal isOpen={showPaymentModal} onDidDismiss={handleCloseModal} className="ion-modal-custom">
                                        <div className="conten">
                                            <p>Total a pagar ${total}</p>
                                            <form ref={paymentFormRef} onSubmit={handleSubmit} className="form-container">
                                                <CardElement 
                                                options={{
                                                    style: {
                                                        base: {
                                                            color: "#000", 
                                                            fontSize: "16px", 
                                                            "::placeholder": {
                                                                color: "#a0aec0", 
                                                            },
                                                            padding: "10px",
                                                        },
                                                        invalid: {
                                                            color: "#e53e3e", 
                                                        },
                                                    },
                                                }}
                                                className="p-2 border rounded-lg"
                                            />
                                                <IonButton
                                                 type="submit" 
                                                 expand="full" 
                                                 className="bg-green-500"
                                                 disabled={isProcessingPayment}>
                                                    Confirmar Pago
                                                </IonButton>
                                            </form>
                                        </div>
                                    </IonModal>
                                </IonCardContent>
                            </IonCard>
                        </div>
                    </div>                  
                </div>
            </IonContent>
        </IonPage>
    );
};

const App = () => (
    <Elements stripe={stripePromise}>
        <Carrito />
    </Elements>
);

export default App;



