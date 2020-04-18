import React, { Component } from 'react';
import {
    getPlatforms,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonToolbar,
    IonTitle
} from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
    ROUTE_ACCOUNT,
    ROUTE_MAP,
    ROUTE_SETTINGS
} from '../../../utils/routes';
import Account from '../account';
import Map from '../map';
import Sidemenu from '../../../components/sidemenu';

import './Home.scss';
import Settings from '../settings';

import Context from '../../app/Context';

class Home extends Component {
    static contextType = Context;

    render() {
        const { theme } = this.context;

        return (
            <>
                <Sidemenu id="main-content" />
                <IonHeader className="home-header">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton
                                color={theme === 'dark' ? 'light' : 'dark'}
                                fill="clear"
                                slot="icon-only"
                            />
                        </IonButtons>
                        <IonTitle> Eat Together </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonPage
                    id="main-content"
                    className="main-content"
                    data-platforms={getPlatforms()}
                >
                    <Switch>
                        <Route path={ROUTE_ACCOUNT} exact component={Account} />
                        <Route path={ROUTE_MAP} exact component={Map} />
                        <Route
                            path={ROUTE_SETTINGS}
                            exact
                            component={Settings}
                        />
                        <Route
                            path="/home"
                            exact
                            render={() => <Redirect to="/home/map" />}
                        />
                    </Switch>
                </IonPage>
            </>
        );
    }
}

export default Home;
