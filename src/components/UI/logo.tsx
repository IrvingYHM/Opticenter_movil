import { IonIcon } from "@ionic/react";
import { cart } from 'ionicons/icons';
import React from "react";
import { useHistory } from 'react-router-dom';

const Logo: React.FC = () => {
    const history = useHistory();

    const navigateToCarrito = () => {
        history.push('/Carrito');
    };

    return (
        <div  onClick={navigateToCarrito}  >
            <IonIcon icon={cart} className='h-14 w-8' />
        </div>
    );
}

export default Logo;