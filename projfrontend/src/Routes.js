import React from 'react';
import  { BrowserRouter,Route,Switch } from 'react-router-dom';

import Home from "./core/Home"
import SignUp from './user/Signup';
import SignIn from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';

import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AddCategory from './admin/AddCategory';

import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import ManageCategory from './admin/ManageCategories';
import { deleteCategory } from './admin/helper/adminapicall';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/cart';





const Routes=()=>{
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/signup" exact component={SignUp}/>
    <Route path="/signin" exact component={SignIn}/>
    <Route path="/cart" exact component={Cart}/>

    <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
    <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
    <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
    <AdminRoute path="/admin/categories" exact component={ManageCategory}/>
    <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
    <AdminRoute path="/admin/products" exact component={ManageProducts}/>
    <AdminRoute path="/admin/category/:categoryId/:userId" exact component={deleteCategory}/>

    
    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
    <AdminRoute path="/admin/category/:categoryId" exact component={UpdateCategory}/>






    
    </Switch> 
    
    </BrowserRouter>
  )
}

export default Routes;

