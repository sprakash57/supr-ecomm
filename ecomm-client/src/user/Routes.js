import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from '../common/Home';
import Menu from '../common/Menu';

const Routes = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;