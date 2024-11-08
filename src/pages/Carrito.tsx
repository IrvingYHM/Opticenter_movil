import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonInput, IonButton } from "@ionic/react";
import React, { useState, useEffect, useRef  } from "react";
import Header from "../components/UI/header";
import { loadStripe, PaymentIntent } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { cart } from "ionicons/icons";

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
    const [detalleCarrito, setDetalleCarrito] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
    const [clienteId, setClienteId] = useState<string>("");
    const [userType, setUserType] = useState<string | null>(null);
    const [cartId, setCartId] = useState<string | null>(null); // State for cart ID


    const stripe = useStripe();
    const elements = useElements();
    // Crear referencia para el formulario de pago
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
                  const response = await fetch(`http://localhost:3000/Carrito/uno?userId=${clienteId}`);
                  if (!response.ok) throw new Error("Error al obtener el detalle del carrito");
                  const data = await response.json();
                  console.log("Detalle del carrito:", data);
                  setDetalleCarrito(data);
                  if (data.IdCarrito) {
                    setCartId(data.IdCarrito);
                  }
              } catch (error) {
                  console.error(error);
              }
          }
      };

      fetchDetalleCarrito();
  }, [clienteId]);

  useEffect(() => {
      const subtotal = detalleCarrito.reduce((total, detalle) => total + detalle.SubTotal, 0);
      setTotal(subtotal);
  }, [detalleCarrito]);

    const handlePayment = async () => {
        setShowPaymentForm(true);
        try {
            const response = await fetch('http://localhost:3000/create-payment-intent', {
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

                // Desplazar la vista hacia el formulario de pago
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

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret!, {
            payment_method: {
                card: cardElement,
            }
        });

        if (error) {
            console.error('Error en el pago:', error);
            toast.error('El pago falló: ' + error.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                toast.success('¡Pago exitoso!');

                const updateResponse = await fetch(
                    "http://localhost:3000/productos/update", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ detalleCarrito }),
                    }
                  );
                  const updateData = await updateResponse.json();
                  console.log(updateData);
            }
        }
    };

    const eliminarCarritoDespuesCompra = async () => {
        try {
          // Eliminar el carrito del cliente después de la compra
          const eliminarCarritoResponse = await fetch("http://localhost:3000/Carrito/eliminarCa");
          const eliminarCarritoData = await eliminarCarritoResponse.json();
          console.log(eliminarCarritoData);
        } catch (error) {
          console.error("Error al eliminar el carrito:", error);
        }
      };

    const saveOrderDetails = async (paymentIntent: PaymentIntent) => {
        try {
            const response = await fetch('http://localhost:3000/agregar', {//ruta para guardar el pedido realizado
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    clienteId: clienteId, // Incluye el ID del cliente
                    detalles: detalleCarrito, // Incluye los detalles del carrito si es necesario
                }),
            });
    
            if (!response.ok) {
                throw new Error('Error al guardar los detalles del pedido');
            }
    
            const data = await response.json();
            console.log('Detalles del pedido guardados:', data);
            // Puedes redirigir al usuario a una página de éxito o mostrar un mensaje
        } catch (error) {
            console.error('Error al guardar los detalles del pedido:', error);
            toast.error('Error al guardar la información del pedido.');
        }
    };
    
    return (
        <IonPage id="main-content">
            <Header />
            <IonContent className="bg-gray-100">
                <div className="min-h-screen pt-20">
                    <h1 className="mb-10 text-center text-2xl font-bold">Carrito de compras</h1>
                    <div className="mx-auto max-w-7xl px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="w-full md:w-2/3">
                            {detalleCarrito.length === 0 ? (
                                <p className="text-center">No hay productos en el carrito.</p>
                            ) : (
                                detalleCarrito.map((detalle) => (
                                    <IonCard key={detalle.IdDetalle_Carrito} className="mb-6">
                                        <IonCardHeader>
                                            <IonCardTitle>{detalle.producto.vchNombreProducto}</IonCardTitle>
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
                        <div className="w-full md:w-1/3 mb-8">
                            <IonCard className="rounded-lg border bg-white p-6 shadow-md">
                                <IonCardHeader>
                                    <IonCardTitle>Detalle de tu compra</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <h3 className="text-gray-700 font-semibold mb-2">Productos SubTotal</h3>
                                    {detalleCarrito.map((detalle) => (
                                        <div key={detalle.IdDetalle_Carrito} className="flex justify-between mb-2">
                                            <IonLabel>{detalle.producto.vchNombreProducto}</IonLabel>
                                            <IonLabel>${detalle.SubTotal}</IonLabel>
                                        </div>
                                    ))}
                                    <hr className="my-4" />
                                    <div className="flex justify-between">
                                        <IonLabel className="text-lg font-bold">Total</IonLabel>
                                        <IonLabel className="mb-1 text-lg font-bold">${total}</IonLabel>
                                    </div>
                                    <div>
                                    <IonButton onClick={handlePayment} expand="full" className="mt-6 mb-8 bg-blue-500">
                                        Pagar
                                    </IonButton>
                                    {showPaymentForm && clientSecret && (
                                        <form ref={paymentFormRef} onSubmit={handleSubmit}>
                                            <CardElement />
                                            <IonButton type="submit" expand="full" className="mt-4 bg-green-500">
                                                Confirmar Pago
                                            </IonButton>
                                        </form>
                                    )}    
                                    </div>
                                    
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

