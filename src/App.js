import React, { useContext, useEffect } from "react";
import Home from "./Components/Home/Home";
//import Orders from "./Components/Orders";
import Login from "./Components/Login-Registrazione/Login";
import Admin from "./Components/Admin/Admin";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import IngredientiProvider from "./Contexts/IngredientiProvider";
import TavoloProvider from "./Contexts/TavoloProvider";
import OrdiniProvider from "./Contexts/OrdiniProvider";
import Resoconto from "./Components/Home/ResocontoOrdine/Resoconto";
import PrezzoProvider from "./Contexts/PrezzoProvider";
import UserAuthContext from "./Contexts/UserAuthContext";
import RistorazioneProvider from "./Contexts/RistorazioneProvider";
import history from "./usefulcomponents/history";
function App() {
  const [isAuth, setIsAuth] = useContext(UserAuthContext);
  useEffect(() => {
    let token = localStorage.getItem("PizzaAccessToken");
    let refreshToken = localStorage.getItem("PizzaRefreshToken");
    if (token && refreshToken) {
      userAuth(token, refreshToken);
    }
  }, []);
  const userAuth = (token, refreshToken) => {
    fetch("http://localhost:3010/isAuth", {
      method: "POST",
      headers: {
        "x-access-token": token,
        "x-refresh-token": refreshToken,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("PizzaAccessToken", result.token);
          setIsAuth(true);
        } else if (result.auth) {
          setIsAuth(true);
        } else setIsAuth(false);
      });
  };
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <OrdiniProvider>
            <RistorazioneProvider>
              <IngredientiProvider>
                <TavoloProvider>
                  <PrezzoProvider>
                    <Route path="/conferma-ordine" component={Resoconto} />
                    <Route exact path="/" component={Home} />
                  </PrezzoProvider>
                </TavoloProvider>
              </IngredientiProvider>
            </RistorazioneProvider>
          </OrdiniProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
/*
 <Route path="/login">
            <Login />
          </Route>
          */
