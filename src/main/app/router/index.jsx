import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ROUTE_HOME } from '../../../utils/routes';

import Home from '../../pages/home';
import { Redirect } from 'react-router';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={ROUTE_HOME} component={Home} />
                <Route render={() => <Redirect to="/home" />} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
