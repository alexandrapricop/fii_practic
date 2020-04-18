import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext} from '../auth';
import {ROUTE_LOGIN} from '../../utils/routes';
import {IonSpinner} from '@ionic/react';

class PrivateRoute extends React.Component {
    static contextType = AuthContext;

    render() {
        const {currentUser} = this.context;
        const {component: RouteComponent, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={routeProps => {
                    if (currentUser === undefined) {
                        return (
                            <div className="spinner-container">
                                <IonSpinner name="dots"/>
                            </div>
                        );
                    }

                    return currentUser !== null ? (
                        <RouteComponent {...routeProps} />
                    ) : (
                        <Redirect to={ROUTE_LOGIN}/>
                    );
                }}
            />
        );
    }
}

export default PrivateRoute;
