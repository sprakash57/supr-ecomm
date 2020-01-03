import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from '../user/Register';
import Login from '../user/Login';
import Home from '../common/Home';
import PrivateRoute from './PrivateRoute';
import UserBoard from '../user/UserBoard';
import AdminRoute from './AdminRoute';
import AdminBoard from '../admin/AdminBoard';
import AddCategory from '../admin/AddCategory';
import AddProduct from '../admin/AddProduct';
import Shop from '../common/Shop';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/shop' exact component={Shop} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <PrivateRoute path='/user/dashboard' exact component={UserBoard} />
                <AdminRoute path='/admin/dashboard' exact component={AdminBoard} />
                <AdminRoute path='/create/category' exact component={AddCategory} />
                <AdminRoute path='/create/product' exact component={AddProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;