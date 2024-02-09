import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import ProductList from "store/ProductList";
import AddProduct from "store/AddProduct";
import Cart from "store/Cart";
import Orders from "store/Orders";
import SignIn from "auth/SignIn";
import SignUp from "auth/SignUp";
import SignOut from "auth/SignOut";
import Header from "./components/Header";
import { UserProvider, UserContext } from "auth/Context";
import { CartProvider } from "store/Context";

import "./index.scss";

const HeaderWrapper = (Element: any) => {
  return (
    <>
      <Header></Header>
      <Element />
    </>
  )
}

const App = () => {
  const { user } = useContext(UserContext)
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/cart" element={HeaderWrapper(() => (<Cart user={user}/>))} />
        <Route path="/addProduct" element={HeaderWrapper(AddProduct)} />
        <Route path="/orders" element={HeaderWrapper(() => <Orders isAdmin={user && user.type === "admin"}/>)} />
        <Route path="/" element={HeaderWrapper(() => <ProductList isAdmin={user && user.type === "admin"}/>)} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  )
};

const WrappedApp = () => {
  return (
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CartProvider>
  )
}
ReactDOM.render(<WrappedApp />, document.getElementById("app"));
