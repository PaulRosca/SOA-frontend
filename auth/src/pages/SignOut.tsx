import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { signout } from "../services";

export default function Signout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    signout().then(() => {
      setUser(null);
    }).catch((err) => console.log(err))
      .finally(() => navigate("/"));
  }, []);
  return null;
}
