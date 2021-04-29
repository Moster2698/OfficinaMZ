import React, { useContext, useEffect } from "react";
import "../../Styles/Admin.css";
import {Switch, Route, Redirect } from "react-router-dom";
import Orders from "../Orders";
import DashBoard from "./Dashboard";
import Navbar from "./Navbar";
import UserAuthContext from "../../Contexts/UserAuthContext";
function Admin() {
  const [isAuth,setIsAuth] = useContext(UserAuthContext);
  
  return (

    (isAuth ? (
    <div>
        <Navbar/>

      <Switch>
        <Route   path="/admin/orders" component={Orders}></Route>
      </Switch>
    </div>
    ):(<Redirect to ="/login"/>))
  );
}

export default Admin;
