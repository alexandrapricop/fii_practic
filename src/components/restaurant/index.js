import React from 'react';
import { IonButton, IonList, getPlatforms } from '@ionic/react';

import './Restaurant.scss';
import Event from '../event';
import api from '../../api';

const events = new Array(20).fill(0).map((elem, index) => ({
    participants: Math.ceil(Math.random() * 10),
    title: `Dummy event ${index}`
}));

class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: this.props.restaurant
        };
    }

    onClosePress = () => {
        this.props.onClosePress();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.restaurant !== this.props.restaurant) {
            this.setState({
                restaurant: this.props.restaurant
            });
        }

        if (
            prevProps.restaurant !== this.props.restaurant &&
            this.props.restaurant !== null &&
            this.props.restaurant.api !== null
        ) {
            api.fetchRestaurant(this.props.restaurant.id).then(values => {
                if (values.size > 0) {
                    this.setState({
                        restaurant: {
                            ...this.state.restaurant,
                            api: values.docs[0].data()
                        }
                    });
                }
            });
        }
    }

    render() {
        const { restaurant } = this.state;
        return (
            <div
                className={`restaurant__wrapper 
                ${restaurant && 'restaurant__wrapper--opened'}`}
                data-platforms={getPlatforms()}
            >
                <div
                    className="restaurant__container"
                    data-platforms={getPlatforms()}
                >
                    <div
                        className="restaurant__image"
                        style={{
                            backgroundImage: `url(${
                                restaurant && restaurant.api
                                    ? restaurant.api.photo_url
                                    : 'https://inland-investments.com/sites/default/files/property/No-Photo-Available.jpg'
                            })`
                        }}
                    />
                    <p className="restaurant__title">
                        {restaurant && restaurant.title}
                    </p>
                    <p className="restaurant__description">
                        {restaurant && restaurant.api
                            ? restaurant.api.description
                            : 'No description.'}
                    </p>
                    <IonList className="restaurant__events">
                        {events.map((event, index) => (
                            <Event key={index} event={event} />
                        ))}
                    </IonList>
                    <IonButton
                        className="restaurant__close"
                        data-platforms={getPlatforms()}
                        onClick={this.onClosePress}
                    >
                        Close
                    </IonButton>
                </div>
            </div>
        );
    }
}

export default Restaurant;
