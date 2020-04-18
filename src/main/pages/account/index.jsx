import React from 'react';
import { IonHeader, IonContent, IonAvatar, IonButton } from '@ionic/react';

import './Account.scss';

import Context from '../../app/Context/index';

class Account extends React.Component {
    static contextType = Context;

    render() {
        const { user } = this.context;
        return (
            <>
                <IonContent className="account" scroll-y="false">
                    <div className="account__header">
                        <IonAvatar className="account__header__image">
                            <img src={user.imageUrl} alt="avatar" />
                        </IonAvatar>
                        <div className="account__header__name">{user.name}</div>
                    </div>
                    <IonButton fill="clear" color="success">
                        Edit Profile
                    </IonButton>
                </IonContent>
            </>
        );
    }
}

export default Account;
