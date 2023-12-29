import React from 'react';
// components
import 'react-toastify/dist/ReactToastify.css';
import DetailProduct from './components/DetailPage/DetailProduct';
import FormLogin from './components/LoginPage/FormLogin';
import HomePage from './components/LandingPage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './layouts/PrivateRoutes';
import { PublicRoutes } from './layouts/PublicRoutes';
import { Layout } from './layouts/Layout';
import { Main } from './layouts/Main';
import Dashboard from './components/AdminDashboard/Dashboard';
import { AdminLayout } from './layouts/AdminLayout';
import Product from './components/AdminDashboard/Product';
import Orders from './components/AdminDashboard/Orders';
import Customers from './components/AdminDashboard/Customers';
import { AddUser } from './components/AdminDashboard/AddUser';
import { UpdateUser } from './components/AdminDashboard/UpdateUser';
import { AddProduct } from './components/AdminDashboard/AddProduct';
import { UpdateProduct } from './components/AdminDashboard/UpdateProduct';
import { Cart } from './components/LandingPage/Cart';
import { ShopContextProvider } from './context/shop-context';
import { PageNotFound } from './components/PageNotFound';


const App = () => {
  return (
    <div>
      <ShopContextProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* public */}
            <Route element={<PublicRoutes />}>
              <Route path='/login' element={<FormLogin />} />
            </Route>

            {/* private */}
            <Route element={<PrivateRoutes />}>


              <Route element={<Main />}>
                <Route path='/detail-product/:id' element={<DetailProduct />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/' element={<HomePage />} />
              </Route>


              <Route element={<AdminLayout />}>
                <Route path='/Admin' element={<Dashboard />} />
                <Route path='/Admin/products' element={<Product />} />
                <Route path='/Admin/add-product' element={<AddProduct />} />
                <Route path='/Admin/update-product/:id' element={<UpdateProduct />} />
                <Route path='/Admin/customers' element={<Customers />} />
                <Route path='/Admin/orders' element={<Orders />} />
                <Route path='/Admin/add_user' element={<AddUser />} />
                <Route path='/Admin/update_user/:id' element={<UpdateUser />} />
              </Route>

            </Route>
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </ShopContextProvider>

    </div>
  );
};

export default App;
