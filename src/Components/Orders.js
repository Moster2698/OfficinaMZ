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
import { Container, Col } from "react-bootstrap";
import UserAuthContext from "../Contexts/UserAuthContext";
import OrdineTavolo from "./OrdineTavolo";
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
  const [num, setNum] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setNum((n) => n + 1);
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
    const Prova = () => {
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
    <div style={{backgroundColor:"#343a40",height:"100%"}}>
      <nav
        className="navbar navbar-expand-lg  bg-navbar-Ordini  fixed-top"
        id="sideNav"
      >
        <a class="navbar-brand js-scroll-trigger" href="#page-top">
          {" "}
          <span class="d-block d-lg-none text-primary-pz text-primary-pz-2">
            Il tuo ordine
          </span>{" "}
          <span class="d-none d-lg-block">
            <img
              class="img-fluid img-profile rounded-circle mx-auto mb-2"
              src="assets/img/person.png"
              alt=""
            />
          </span>{" "}
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item nav-link ">
              <FaList />
            </li>
            <li className="nav-item nav-link">
              <FaSyncAlt />
            </li>
            <li className="nav-item nav-link">
              <FaTools />
            </li>
            <li className="nav-item nav-link">
              <FaUser />
            </li>
            <li className="nav-item nav-link">
              <FaPowerOff />
            </li>
          </ul>
        </div>
      </nav>
      <Container fluid>
        <h3 className="p-3 text-center" />
        <div className="row row-cols-1 row-cols-md-4 mb-4 text-center">
          {tavoloOrdini.map((tavoloOrdine) => (
            <Col>
              <OrdineTavolo
                value={tavoloOrdine}
                key={tavoloOrdine.NumeroTavolo}
              />
            </Col>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default Orders;
