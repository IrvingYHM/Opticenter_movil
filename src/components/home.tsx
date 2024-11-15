import React, { useState } from "react";
import { IonContent, IonCard, IonCardContent, IonButton, IonImg, IonPage } from "@ionic/react";
import imagen from "../assets/Venta.png";
import imagen2 from "../assets/lentes2.png";

const HomeOne: React.FC = () => {
  const [mostrarElemento, setMostrarElemento] = useState(false);
  const [mostrarElemento2, setMostrarElemento2] = useState(false);
  const [mostrarElemento3, setMostrarElemento3] = useState(false);
  const [isZoomed1, setIsZoomed1] = useState(false);
  const [isZoomed2, setIsZoomed2] = useState(false);
  const [isZoomed3, setIsZoomed3] = useState(false);

  const handleMouseOver = (setZoom: React.Dispatch<React.SetStateAction<boolean>>) => {
    setZoom(true);
  };

  const handleMouseOut = (setZoom: React.Dispatch<React.SetStateAction<boolean>>) => {
    setZoom(false);
  };

  return (
    <>
      <>
        <script src="//code.tidio.co/lr3byfcdvywtakcwkxqmh0yvvnggymum.js" async></script>
        <div className="flex-center text-center mt-1">
          <div >
            <div className="flex flex-col md:flex-row">
              
              {/* First Card */}
              <IonCard
                className="mx-8"
                onMouseEnter={() => handleMouseOver(setIsZoomed1)}
                onMouseLeave={() => handleMouseOut(setIsZoomed1)}
              >
                <IonImg
                  src={imagen}
                  className={`w-full ${isZoomed1 ? "zoom" : ""}`}
                  style={{
                    width: isZoomed1 ? "100%" : "100%",
                    height: isZoomed1 ? "50%" : "30%",
                    objectFit: "cover",
                  }}
                />
                <IonCardContent>
                  <h2 className="font-bold text-xl mb-2">The Coldest Sunset</h2>
                  <p className="text-gray-700 text-justify">
                    Estos lentes ofrecen un estilo único y moderno que te hará destacar en cualquier ocasión.
                    Con su diseño elegante y funcional, podrás disfrutar de la máxima protección UV y una visión clara.
                    {mostrarElemento && (
                      <div>
                        Su montura ligera garantiza comodidad duradera, mientras que sus cristales brindan una visión sin igual.
                        ¡Prepárate para lucir increíble con los lentes The Coldest Sunset!
                      </div>
                    )}
                  </p>
                  <IonButton expand="block" onClick={() => setMostrarElemento(!mostrarElemento)}>
                    {mostrarElemento ? "Ocultar" : "Ver más"}
                  </IonButton>
                </IonCardContent>
              </IonCard>

              {/* Second Card */}
              <IonCard
                className="mx-8"
                onMouseEnter={() => handleMouseOver(setIsZoomed2)}
                onMouseLeave={() => handleMouseOut(setIsZoomed2)}
              >
                <IonImg
                  src={imagen2}
                  className={`w-full ${isZoomed2 ? "zoom" : ""}`}
                  style={{
                    width: isZoomed2 ? "100%" : "100%",
                    height: isZoomed2 ? "50%" : "30%",
                    objectFit: "cover",
                  }}
                />
                <IonCardContent>
                  <h2 className="font-bold text-xl mb-2">The Coldest Sunset</h2>
                  <p className="text-gray-700 text-justify">
                    Estos lentes ofrecen un estilo único y moderno que te hará destacar en cualquier ocasión.
                    Con su diseño elegante y funcional, podrás disfrutar de la máxima protección UV y una visión clara.
                    {mostrarElemento2 && (
                      <div>
                        Su montura ligera garantiza comodidad duradera, mientras que sus cristales brindan una visión sin igual.
                        ¡Prepárate para lucir increíble con los lentes The Coldest Sunset!
                      </div>
                    )}
                  </p>
                  <IonButton expand="block" onClick={() => setMostrarElemento2(!mostrarElemento2)}>
                    {mostrarElemento2 ? "Ocultar" : "Ver más"}
                  </IonButton>
                </IonCardContent>
              </IonCard>

              {/* Third Card */}
              <IonCard
                className="mx-7"
                onMouseEnter={() => handleMouseOver(setIsZoomed3)}
                onMouseLeave={() => handleMouseOut(setIsZoomed3)}
              >
                <IonImg
                  src={imagen}
                  className={`w-full ${isZoomed3 ? "zoom" : ""}`}
                  style={{
                    width: isZoomed3 ? "100%" : "100%",
                    height: isZoomed3 ? "50%" : "30%",
                    objectFit: "cover",
                  }}
                />
                <IonCardContent>
                  <h2 className="font-bold text-xl mb-1">The Coldest Sunset</h2>
                  <p className="text-gray-700 text-justify">
                    Estos lentes ofrecen un estilo único y moderno que te hará destacar en cualquier ocasión.
                    Con su diseño elegante y funcional, podrás disfrutar de la máxima protección UV y una visión clara.
                    {mostrarElemento3 && (
                      <div>
                        Su montura ligera garantiza comodidad duradera, mientras que sus cristales brindan una visión sin igual.
                        ¡Prepárate para lucir increíble con los lentes The Coldest Sunset!
                      </div>
                    )}
                  </p>
                  <IonButton expand="block" onClick={() => setMostrarElemento3(!mostrarElemento3)}>
                    {mostrarElemento3 ? "Ocultar" : "Ver más"}
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default HomeOne;
