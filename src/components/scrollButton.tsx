import React, { useState, useEffect } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { arrowUp, arrowDown } from "ionicons/icons";

function ScrollButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const checkScroll = () => {
    if (window.pageYOffset > 400) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }

    if (window.pageYOffset < document.body.scrollHeight - window.innerHeight - 400) {
      setShowScrollBottom(true);
    } else {
      setShowScrollBottom(false);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      {showScrollTop && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={scrollTop}>
            <IonIcon icon={arrowUp} />
          </IonFabButton>
        </IonFab>
      )}
      {showScrollBottom && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ marginTop: '3.5rem' }}>
          <IonFabButton onClick={scrollBottom}>
            <IonIcon icon={arrowDown} />
          </IonFabButton>
        </IonFab>
      )}
    </>
  );
}

export default ScrollButton;
