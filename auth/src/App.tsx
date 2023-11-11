import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";
import SignUp from "./pages/SignUp";
import { UserProvider } from "./context";
import SignIn from "./pages/SignIn";


const App = () => (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  </UserProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
