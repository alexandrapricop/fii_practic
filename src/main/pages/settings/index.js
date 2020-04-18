import React, { Component } from 'react';
import {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonToggle,
    IonRadio,
    IonCheckbox,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonContent
} from '@ionic/react';

import Context from '../../app/Context';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allowNotification: true
        };
    }

    static contextType = Context;

    shouldComponentUpdate(_, nextState) {
        if (nextState != this.state) return true;
        return false;
    }

    componentDidUpdate() {
        console.log(this.context.theme);
    }

    changetoggle = e => {
        e.target.checked = !this.state[e.target.value];
        const { setTheme } = this.context;

        if (e.target.value == 'darkMode') {
            this.setState(state => ({ darkMode: !state.darkMode }));
            if (e.target.checked == true) setTheme('dark');
            else setTheme('light');
            document.getElementById('body').classList.toggle('dark');
        } else
            this.setState(state => ({
                allowNotification: !state.allowNotification
            }));
    };

    render() {
        const { theme } = this.context;
        return (
            <>
                <IonContent>
                    <IonList>
                        <IonItem key="1">
                            <IonLabel>Setting 1</IonLabel>
                        </IonItem>
                        <IonItem key="2">
                            <IonLabel>Setting 2</IonLabel>
                        </IonItem>
                        <IonItem key="3">
                            <IonLabel>Setting 3</IonLabel>
                        </IonItem>
                        <IonItem key="4">
                            <IonLabel>Setting 4</IonLabel>
                        </IonItem>
                        <IonItem key="5">
                            <IonLabel>Setting 5</IonLabel>
                        </IonItem>
                        <IonItem key="6">
                            <IonLabel>Dark Mode</IonLabel>
                            <IonToggle
                                value="darkMode"
                                onClick={this.changetoggle}
                                checked={theme === 'dark' ? true : false}
                                slot="end"
                                color="success"
                            ></IonToggle>
                        </IonItem>
                        <IonItem key="7">
                            <IonLabel>Notifications</IonLabel>
                            <IonToggle
                                value="allowNotifications"
                                onClick={this.changetoggle}
                                checked={this.state.allowNotification}
                                slot="end"
                                color="success"
                            ></IonToggle>
                        </IonItem>
                    </IonList>
                </IonContent>
            </>
        );
    }
}
