import React from 'react';
import { IonApp } from '@ionic/react';

import AuthProvider from '../../components/auth';
import Router from './router';
import Modal from '../../components/modal';

import "../../assets/theme/variables.css"

import Context, { ContextProvider } from './Context';

const App = () => {
    return (
    <ContextProvider>
        <IonApp>
            {/*<Modal />*/}
            <AuthProvider>
                <Router />
            </AuthProvider>
        </IonApp>
    </ContextProvider>
    )
};

export default App;
