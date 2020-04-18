import React from 'react';

import './Event.scss';
import moment from 'moment';
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';

const MAX_PARTICIPANTS = 10;

const Event = ({ event }) => {
    return (
        <IonGrid>
            <IonRow className="event__container">
                <IonCol size={6}>
                    <div className="event__details">
                        <span>{event.title}</span>
                        <span className="event__date">
                            {moment().format('Do MMMM YYYY, h:mm A')}
                        </span>
                    </div>
                </IonCol>
                <IonCol size={3}>
                    <span>
                        {event.participants}/{MAX_PARTICIPANTS}
                    </span>
                </IonCol>
                <IonCol size={3}>
                    <IonButton
                        color={
                            event.participants === MAX_PARTICIPANTS
                                ? 'danger'
                                : 'success'
                        }
                        disabled={event.participants === MAX_PARTICIPANTS}
                        size="small"
                    >
                        Join
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Event;
