import React from 'react';
// components
import 'react-toastify/dist/ReactToastify.css';
import DetailProduct from './components/DetailPage/DetailProduct';
import FormLogin from './components/LoginPage/FormLogin';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './layouts/PrivateRoutes';
import { PublicRoutes } from './layouts/PublicRoutes';
import { Layout } from './layouts/Layout';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout/>}>
          {/* public */}
          <Route element={<PublicRoutes />}>
            <Route path='/login' element={<FormLogin />} />
          </Route>

          {/* private */}
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<DetailProduct />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
