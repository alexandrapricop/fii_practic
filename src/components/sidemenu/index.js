import React from 'react';
import {
    IonAvatar,
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle
} from '@ionic/react';
import { map, person, settings } from 'ionicons/icons';
import { withRouter } from 'react-router';

import { ROUTE_ACCOUNT, ROUTE_MAP, ROUTE_SETTINGS } from '../../utils/routes';

import './Sidemenu.scss';

import Context from '../../main/app/Context';

const pages = [
    { title: 'Account', path: ROUTE_ACCOUNT, icon: person },
    { title: 'Map', path: ROUTE_MAP, icon: map },
    { title: 'Settings', path: ROUTE_SETTINGS, icon: settings }
];

class Sidemenu extends React.Component {
    renderMenuItems = () => {
        const { history, location } = this.props;
        return pages.map(page => (
            <IonMenuToggle key={page.title}>
                <div
                    className={
                        page.path === location.pathname
                            ? 'sidemenu__item--activated'
                            : ''
                    }
                >
                    <IonItem button onClick={() => history.push(page.path)}>
                        <IonIcon slot="start" icon={page.icon} />
                        <IonLabel>{page.title}</IonLabel>
                    </IonItem>
                </div>
            </IonMenuToggle>
        ));
    };

    static contextType = Context;

    render() {
        const { id } = this.props;
        const { user } = this.context;
        const { theme } = this.context;

        return (
            <IonMenu
                swipeGesture="false"
                side="start"
                content-id={id}
                className="sidemenu"
            >
                <IonContent scroll-y="false">
                    <div
                        className='sidemenu__header'
                    >
                        <IonAvatar>
                            <img src={user.imageUrl} alt="avatar" />
                        </IonAvatar>
                        <div className="sidemenu__name">{user.name}</div>
                    </div>
                    <hr className="sidemenu__separator" />
                    <IonList>{this.renderMenuItems()}</IonList>
                    <IonButton className="sidemenu__signout">
                        Sign out
                    </IonButton>
                </IonContent>
            </IonMenu>
        );
    }
}

export default withRouter(Sidemenu);
