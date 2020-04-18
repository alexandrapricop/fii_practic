import React, { Component } from 'react'
import { IonModal, IonButton, IonContent } from '@ionic/react';

import "./Modal.scss";
import foodImage from "../../../src/assets/img/food-icon.png";

export default class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        }
    }

    render() {

        return (
            <IonModal
                isOpen={this.state.showModal}
                swipeToClose={true}
                onDidDismiss={() => { this.setState((state, props) => { return { showModal: false } }) }}
                className="modal"
            >
                <div className="modal__content">
                    <img className="modal__image" src={foodImage} />
                    <div className="modal__text">
                        <h1 className="modal__header">Hi, there!</h1>
                        <p className="modal__paragraph"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  </p>
                    </div>
                </div>
                <IonButton
                    onClick={() => { this.setState((state, props) => { return { showModal: false } }) }}
                    className="modal__button"
                    expand={"full"}
                    color={"success"}
                >
                    I was born ready!
                </IonButton>
            </IonModal>
        )
    }
}
