import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';

const AdminRoutes = ({ component: Component, ...props }) => (
    <Route {...props} render={props => isAuthenticated().user.role === 1 ? (
        <Component {...props} />
    ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
)

export default AdminRoutes;