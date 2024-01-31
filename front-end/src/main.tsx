import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.ts";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";
import "./index.css";
import HomePage from "./Pages/HomePage.tsx";
import ProductPage from "./Pages/ProductPage.tsx";
import CartPage from "./Pages/CartPage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";
import ShippingPage from "./Pages/ShippingPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import PamentPage from "./Pages/PaymentPage.tsx";
import PlaceOrder from "./Pages/PlaceOrder.tsx";
import OrderScreen from "./Pages/OrderScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PamentPage />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<OrderScreen/>} />
        

      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
