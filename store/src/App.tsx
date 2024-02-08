import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context";
import "./index.scss";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";

const App = () => (
  <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  </CartProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));

