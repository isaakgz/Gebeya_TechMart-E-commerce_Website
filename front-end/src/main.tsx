import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
//import paypal script provider
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
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
import OrderPage from "./Pages/OrderPage.tsx";
import ProfileScreen from "./Pages/ProfileScreen.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import OrderListScreen from "./Pages/admins/OrderListScreen.tsx";
import ProductsListPage from "./Pages/admins/ProductsListPage.tsx";
import ProductEditPage from "./Pages/admins/ProductEditPage.tsx";
import UserListScreen from "./Pages/admins/UserListScreen.tsx";

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
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductsListPage />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />


      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        deferLoading={true}
        options={{
          clientId:
            "Aa17t_XgP7sFAihczXOl54AeqULpFNdeITXmvd-FM_6PsBpQ6eYc-oCqQcXsUOIZPkb9XYuEUIltp9gC",
        }}
      >
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
