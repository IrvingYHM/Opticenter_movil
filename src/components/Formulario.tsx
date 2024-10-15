import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Formulario: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <IonImg className="mx-auto h-16 w-auto" src="https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png" alt="" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicar Sesion</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="/home" method="post">
                <div>
                    <IonLabel className='block text-sm font-medium leading-6 text-gray-900'> Correo</IonLabel>
                    <div className='mt-2'>
                        <IonInput id='email' name='email' type='email' required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></IonInput>
                    </div>
                </div>

                <div>
                    <div className='flex items-center justify-between'>
                        <IonLabel className='block text-sm font-medium leading-6 text-gray-900'>Contraseña</IonLabel>
                        <div className='text-sm'>
                            <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>¿Ha olvidado su contraseña?</a>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <IonInput id="password" name='password' type='password' autocomplete='current-password' required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'> </IonInput>
                    </div>
                </div>
                <div>
                    <IonButton routerLink='/Home' type='submit'className='flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-indigo-600'>Inciar Sesion </IonButton>
                </div>
            </form>

        </div>
    </div>
  );
};

export default Formulario;
