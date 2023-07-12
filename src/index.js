import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from './components/pages/Home';
import AllProducts from './components/pages/AllProducts';
import NewProduct from './components/pages/NewProduct';
import ProductDetail from './components/pages/ProductDetail';
import Mycart from './components/pages/Mycart';
import NotFound from './components/pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:<NotFound/>,
    children: [
      {index:true, path:"/", element:<Home/>},
      {path:"/products", element:<AllProducts/>},
      {path:"/products/new", element:<NewProduct/>},
      {path:"/products/:id", element:<ProductDetail/>},
      {path:"/carts", element:<Mycart/>},
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
