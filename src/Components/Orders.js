import React, { useEffect, useState, useContext } from "react";
import {
  FaList,
  FaSyncAlt,
  FaUser,
  FaTools,
  FaPowerOff,
  FaBars,
} from "react-icons/fa";
import { Redirect } from "react-router";
import { Container, Col,Row,CardDeck } from "react-bootstrap";
import UserAuthContext from "../Contexts/UserAuthContext";
import OrdineTavolo from "./OrdineTavolo";
import { io } from "socket.io-client";
const socket = io("localhost:3010");
function compare(a, b) {
  if (new Date(a.orarioInviato) < new Date(b.orarioInviato)) {
    return -1;
  }
  if (new Date(a.orarioInviato) > new Date(b.orarioInviato)) {
    return 1;
  }
  return 0;
}

function Orders() {
  const [isAuth, setIsAuth] = useContext(UserAuthContext);
  const [tavoloOrdini, setTavoloOrdini] = useState([]);
  function removeOrder(e){
    let numeroTavolo = parseInt(e.target.value);
    fetch("http://192.168.178.20:3010/api/ristorazione/update-state",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({tavolo:numeroTavolo}),
      mode:"cors",
    })
  
      setTavoloOrdini(tavoloOrdini.filter((tavoloOrdine)=>tavoloOrdine.NumeroTavolo!==numeroTavolo))
  }
  useEffect(() => {
    const Prova = () => {
      let accessToken = localStorage.getItem("PizzaAccessToken");
      let refreshToken = localStorage.getItem("PizzaRefreshToken");
      if (accessToken && refreshToken) {
        fetch("http://192.168.178.20:3010/api/ordini/mostraOrdini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": accessToken,
          },
          body: JSON.stringify({ lunghezza: tavoloOrdini.length }),
          mode: "cors",
        })
          .then(function (response) {
            if (response.ok) return response.json();
            //controllo il refresh token e se è valido
            else {
              fetch("http://192.168.178.20:3010/api/auth/token", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "x-refresh-token": refreshToken,
                },
                mode: "cors",
              })
                .then(function (response) {
                  if (response.ok) return response.json();
                  else {
                    localStorage.setItem("PizzaAccessToken", null);
                    localStorage.setItem("PizzaRefreshToken", null);
                    return false;
                  }
                })
                .then(function (result) {
                  if (result)
                    localStorage.setItem(
                      "PizzaAccessToken",
                      result.accessToken
                    );
                  else {
                    setIsAuth(false);
                    return <Redirect to="/login"></Redirect>;
                  }
                });
              return [];
            }
          })
          .then((result) => {
            if (!result.LunghezzaUguale) setTavoloOrdini(result.sort(compare));
          });
      } else {
        setIsAuth(false);
        return <Redirect to="/login"></Redirect>;
      }
    };
    socket.on("nuovo ordine",()=>{
      Prova();
    })
    Prova();
  }, []);
  
  function RimuoviOrdine(e) {
    let numeroTavolo = { tavolo: e.target.value };
    fetch("http://192.168.178.20:3010/api/ristorazione/update-state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(numeroTavolo),
      mode: "cors",
    });
    setTavoloOrdini(
      tavoloOrdini.filter(
        (tavoloOrdine) =>
          tavoloOrdine.NumeroTavolo !== parseInt(numeroTavolo.tavolo)
      )
    );
  }
  return (
    <div className="orders ">

      <Container   fluid>
        <h3 className="p-3 text-center" />
        <div className="row row-cols-1 row-cols-md-4 mt-5  text-center">

          {tavoloOrdini.map((tavoloOrdine) => (
            <Col className="w-auto">
              <OrdineTavolo
                value={tavoloOrdine}
                key={tavoloOrdine.NumeroTavolo}
                removeOrder={removeOrder}
              />
            </Col>
          ))}
       </div>
      </Container>
    </div>
  );
}
export default Orders;
/*    fetch("http://localhost:3010/api/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-refresh-token": localStorage.getItem("PizzaRefreshToken"),
      },
      mode: "cors",
    });*/