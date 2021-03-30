import React, { useEffect, useState,useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import {
  Card,
  CardColumns
} from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router";
import "../Styles/AdminOrders.css";
import UserAuthContext from "../Contexts/UserAuthContext";
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
  const [isAuth,setIsAuth] = useContext(UserAuthContext);
  const [tavoloOrdini, setTavoloOrdini] = useState([]);
  const [num, setNum] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setNum(n=>n+1);
    }, 10000);
    fetch("http://localhost:3010/api/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-refresh-token": localStorage.getItem("PizzaRefreshToken"),
      },
      mode: "cors",
    });
  }, []);
  useEffect(() => {
    const Prova = () =>{
      let accessToken = localStorage.getItem("PizzaAccessToken");
      let refreshToken = localStorage.getItem("PizzaRefreshToken");
      if (accessToken && refreshToken) {
        fetch("http://localhost:3010/api/ordini/mostraOrdini", {
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
              fetch("http://localhost:3010/api/auth/token", {
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
                    localStorage.setItem("PizzaAccessToken",null);
                    localStorage.setItem("PizzaRefreshToken",null);
                    return false;
                  }
                })
                .then(function (result){
                  if(result)
                    localStorage.setItem("PizzaAccessToken", result.accessToken)
                  else
                  {
                    setIsAuth(false);
                    return <Redirect to ="/login"></Redirect>
                  }
                }
                );
              return [];
            }
          })
          .then((result) => {
            if (!result.LunghezzaUguale) setTavoloOrdini(result.sort(compare));
          });
      } else {
        setIsAuth(false);
        return <Redirect to ="/login"></Redirect>
      }
    }
    Prova();
  }, [num]); // eslint-disable-line react-hooks/exhaustive-deps
  
  function RimuoviOrdine(e) {
    let numeroTavolo = { tavolo: e.target.value };
    fetch("http://localhost:3010/api/ristorazione/update-state", {
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
    <Container fluid>
      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Ordini</h1>
      </div>
      <CardColumns>
        {tavoloOrdini.map((tavoloOrdine) => (
          <Col key={tavoloOrdine.NumeroTavolo}>
            <Card className="mb-4 shadow-sm text-center">
              <Card.Header className="header-color my-0 fw-normal">
                <h4 className="my-0 fw-normal">
                  TAVOLO {tavoloOrdine.NumeroTavolo}
                </h4>
              </Card.Header>
              {tavoloOrdine.pizze.length > 0 && <h2>Pizze</h2>}
              <Card.Body>
                <div className="d-flex flex-column  ">
                  {tavoloOrdine.pizze.map((pizza, idx) => (
                    <div
                      key={pizza.idx}
                      className="d-flex flex-column mb-3 border border-dark"
                    >
                      {pizza.NomePizza !== null && (
                        <p className="h5">{pizza.NomePizza}</p>
                      )}

                      {pizza.Rimossi !== null && <div>{pizza.Rimossi}</div>}
                      {pizza.Aggiunte !== null && (
                        <div>con {pizza.Aggiunte}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column ">
                  {tavoloOrdine.cibi.find(
                    (cibo) => cibo.Nome === "Antipasto"
                  ) && <h2>Antipasti</h2>}
                  {tavoloOrdine.cibi
                    .filter((cibo) => cibo.Nome === "Antipasto")
                    .map((antipasto, idx) => (
                      <div
                        key={idx}
                        className="d-flex flex-column mb-3 border border-dark"
                      >
                        <p>{antipasto.nomeCibo}</p>
                      </div>
                    ))}
                  {tavoloOrdine.cibi.find((cibo) => cibo.Nome === "Primo") && (
                    <h2>Primi</h2>
                  )}
                  {tavoloOrdine.cibi
                    .filter((cibo) => cibo.Nome === "Primo")
                    .map((primo, idx) => (
                      <div
                        key={idx}
                        className="d-flex flex-column mb-3 border border-dark"
                      >
                        <p>{primo.nomeCibo}</p>
                      </div>
                    ))}
                  {tavoloOrdine.cibi.find(
                    (cibo) => cibo.Nome === "Secondo"
                  ) && <h2>Secondi</h2>}
                  {tavoloOrdine.cibi
                    .filter((cibo) => cibo.Nome === "Secondo")
                    .map((secondo, idx) => (
                      <div
                        key={idx}
                        className="d-flex flex-column mb-3 border border-dark"
                      >
                        <p>{secondo.nomeCibo}</p>
                      </div>
                    ))}
                  {tavoloOrdine.cibi.find(
                    (cibo) => cibo.Nome === "Dessert"
                  ) && <h2>Dolci</h2>}
                  {tavoloOrdine.cibi
                    .filter((cibo) => cibo.Nome === "Dessert")
                    .map((dolce, idx) => (
                      <div
                        key={idx}
                        className="d-flex flex-column mb-3 border border-dark"
                      >
                        <p>{dolce.nomeCibo}</p>
                      </div>
                    ))}
                </div>
              </Card.Body>

              <Card.Footer>
                <div className="d-flex flex-column">
                  <p>Orario</p>
                  <p>
                    {new Date(tavoloOrdine.orarioInviato).toLocaleTimeString()}
                  </p>
                </div>
                <Button
                  variant="outline-danger"
                  onClick={RimuoviOrdine}
                  value={tavoloOrdine.NumeroTavolo}
                >
                  Completato
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </CardColumns>
    </Container>
  );
}
export default Orders;

