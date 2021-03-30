import React from "react";
import { useState, useContext } from "react";
import OrdiniContext from "../../Contexts/OrdiniContext";
import Pizza from "./Pizza";
import NumeroTavolo from "./NumeroTavolo";
import CiboOrder from "./CiboOrder";
import PizzaOrder from "./PizzaOrder";
import TavoloContext from "../../Contexts/TavoloContext";
import "../../Styles/Home.css";
import Cibo from "./Cibo";
import PrezzoContext from "../../Contexts/PrezzoContext";
import Bevanda from "./Bevanda";
import BevandaOrder from "./BevandaOrder";
import RistorazioneContext from "../../Contexts/RistorazioneContext";
import { Modal } from "react-bootstrap";

function Home() {
  const [prezzo, setPrezzo] = useContext(PrezzoContext); //Mettere il logo
  const [id, setId] = useState(1);
  const { antipasti, primi, secondi, dolci, pizze, bevande } = useContext(
    RistorazioneContext
  );
  const { ordiniPizze, ordiniBevande, ordiniCibo } = useContext(OrdiniContext);
  const [ordiniTotali, setOrdiniTotali] = ordiniPizze;
  const [ordiniBevandeTotali, setordiniBevandeTotali] = ordiniBevande;
  const [ciboOrdiniTotali, setCiboOrdiniTotali] = ordiniCibo;
  const [numeroTavolo, setNumeroTavolo] = useContext(TavoloContext);
  const [errNumeroSbagliato, seterrNumeroSbagliato] = useState(false);
  const [errTavoloOccupato, seterrTavoloOccupato] = useState(false);
  const [mostraOrdini, setMostraOrdini] = useState(false);
  // const [bevande, setBevande] = useContext(BevandeContext);
  function AggiungiPrezzoeOrdineBevanda(e) {
    let valoriBevanda = JSON.parse(e.target.value);
    let nomeBevanda = valoriBevanda.nome;
    let volumeBevanda = valoriBevanda.volume;
    let prezzoBevanda = valoriBevanda.prezzo;

    if (
      ordiniBevandeTotali.findIndex((bevanda) => bevanda.nome === nomeBevanda) >
      -1
    )
      ModificaQuantitaBevande("+", id - 1);
    else {
      setordiniBevandeTotali(
        ordiniBevandeTotali.concat({
          id: id,
          nome: nomeBevanda,
          prezzo: prezzoBevanda,
          volume: volumeBevanda,
          quantita: 1,
        })
      );
      setId(id + 1);
      setPrezzo((parseFloat(prezzo) + parseFloat(prezzoBevanda)).toFixed(2));
    }
  }
  function AggiungiPrezzoOrdinePizza(e) {
    let valoriPizza = JSON.parse(e.currentTarget.value);

    let prezzoPizzaScelta = valoriPizza.prezzo;
    let nomePizzaScelta = valoriPizza.nome;
    let idPizzaScelta = valoriPizza.id;
    let ingredienti = valoriPizza.ingredienti;
    let ingredientiRimossi = valoriPizza.ingredientiRimossi;

    let ingredientiExtra = valoriPizza.ingredientiExtra;

    if (
      ordiniTotali.findIndex(
        (pizza) =>
          pizza.idPizza === idPizzaScelta &&
          pizza.ingredientiRimossi.toString() === ingredientiRimossi.toString()
      ) > -1
    )
      modificaQuantitaPizza("+", id - 1);
    else {
      setOrdiniTotali(
        ordiniTotali.concat({
          id: id,
          idPizza: idPizzaScelta,
          name: nomePizzaScelta,
          prezzo: prezzoPizzaScelta,
          ingredientiExtra: ingredientiExtra,
          ingredienti: ingredienti,
          ingredientiRimossi: ingredientiRimossi,
          quantita: 1,

        })
      );
      setId(id + 1);
      setPrezzo(
        (parseFloat(prezzo) + parseFloat(prezzoPizzaScelta)).toFixed(2)
      );
    }
  }

  function AggiungiPrezzoeOrdineCibo(e) {
    let valoriCibo = JSON.parse(e.currentTarget.value);

    let idCibo = valoriCibo.id;
    let nomeCibo = valoriCibo.nome;
    let prezzoCibo = valoriCibo.prezzo;
    let ingredientiRimossi = valoriCibo.rimossi;
    let descrizione = valoriCibo.descrizione;
    let ingredientiExtra = valoriCibo.ingredientiExtra;
    if (
      ciboOrdiniTotali.findIndex(
        (cibo) =>
          cibo.idCibo === idCibo &&
          cibo.ingredientiRimossi.toString() === ingredientiRimossi.toString()
      ) > -1
    )
      modificaQuantitaCibo("+", id - 1);
    else {
      setCiboOrdiniTotali(
        ciboOrdiniTotali.concat({
          id: id,
          idCibo: idCibo,
          nomeCibo: nomeCibo,
          prezzoCibo: prezzoCibo,
          ingredientiRimossi: ingredientiRimossi,
          ingredientiExtra: ingredientiExtra,
          descrizione: descrizione,
          quantita: 1,
        })
      );
      setId(id + 1);
      setPrezzo((parseFloat(prezzo) + parseFloat(prezzoCibo)).toFixed(2));
    }
  }
  function removeOrderPizza(pizzaId, prezzoPizza) {
    setOrdiniTotali(
      ordiniTotali.filter((ordine) => ordine.id !== parseInt(pizzaId))
    );
    setPrezzo(
      parseFloat((parseFloat(prezzo) - parseFloat(prezzoPizza)).toFixed(2))
    );
  }
  function modificaQuantitaPizza(quantita, identificativo) {
    let ordini = [...ordiniTotali];
    let idPizza = ordini.findIndex((ordine) => ordine.id === identificativo);
    if ((idPizza) => 0) {
      if (quantita === "+") {
        let ordine = { ...ordini[idPizza] };
        ordine.quantita = ordine.quantita + 1;
        ordini[idPizza] = ordine;

        setPrezzo((parseFloat(prezzo) + parseFloat(ordine.prezzo)).toFixed(2));
        setOrdiniTotali(ordini);
      }
      if (quantita === "-") {
        let ordine = { ...ordini[idPizza] };
        ordine.quantita = ordine.quantita - 1;
        ordini[idPizza] = ordine;
        setPrezzo((parseFloat(prezzo) - parseFloat(ordine.prezzo)).toFixed(2));
        setOrdiniTotali(ordini);
      }
    }
  }

  function modificaQuantitaCibo(quantita, identificativo) {
    let ordini = [...ciboOrdiniTotali];
    let idCibo = ordini.findIndex((ordine) => ordine.id === identificativo);
    if ((idCibo) => 0) {
      if (quantita === "+") {
        let ordine = { ...ordini[idCibo] };
        ordine.quantita = ordine.quantita + 1;
        ordini[idCibo] = ordine;

        setPrezzo(
          (parseFloat(prezzo) + parseFloat(ordine.prezzoCibo)).toFixed(2)
        );
        setCiboOrdiniTotali(ordini);
      }
      if (quantita === "-") {
        let ordine = { ...ordini[idCibo] };
        ordine.quantita = ordine.quantita - 1;
        ordini[idCibo] = ordine;
        setPrezzo(
          (parseFloat(prezzo) - parseFloat(ordine.prezzoCibo)).toFixed(2)
        );
        setCiboOrdiniTotali(ordini);
      }
    }
  }
  function ModificaQuantitaBevande(quantita, identificativo) {
    let ordini = [...ordiniBevandeTotali];
    let idBevanda = ordini.findIndex((ordine) => ordine.id === identificativo);
    if ((idCibo) => 0) {
      if (quantita === "+") {
        let ordine = { ...ordini[idBevanda] };
        ordine.quantita = ordine.quantita + 1;
        ordini[idBevanda] = ordine;

        setPrezzo((parseFloat(prezzo) + parseFloat(ordine.prezzo)).toFixed(2));
        setordiniBevandeTotali(ordini);
      }
      if (quantita === "-") {
        let ordine = { ...ordini[idBevanda] };
        ordine.quantita = ordine.quantita - 1;
        ordini[idBevanda] = ordine;
        setPrezzo((parseFloat(prezzo) - parseFloat(ordine.prezzo)).toFixed(2));
        setordiniBevandeTotali(ordini);
      }
    }
  }
  function RimuoviOrdineCibo(ciboId, prezzoCibo) {
    setCiboOrdiniTotali(
      ciboOrdiniTotali.filter((ordine) => ordine.id !== parseInt(ciboId))
    );
    setPrezzo((prezzo - parseFloat(prezzoCibo)).toFixed(2));
  }
  function RimuoviOrdineBevanda(bevandaId, prezzoBevanda) {
    setordiniBevandeTotali(
      ordiniBevandeTotali.filter((ordine) => ordine.id !== parseInt(bevandaId))
    );
    setPrezzo((prezzo - parseFloat(prezzoBevanda)).toFixed(2));
  }
  function InviaDati() {
    let dato = { tavolo: numeroTavolo, pizze: ordiniTotali, cibo: ciboOrdiniTotali,bevande:ordiniBevandeTotali };
    fetch("http://localhost:3010/api/ristorazione/insert-ordine", {
      mode: "cors",
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dato),
    });
  }
  function ControlloNumeroTavolo(e) {
    setNumeroTavolo(e.target.value);
  }
  function Inserimento(e) {
    seterrNumeroSbagliato(false);
    seterrTavoloOccupato(false);
  }
  return (
    <div className="Home">
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
        id="sideNav"
      >
        <a className="navbar-brand js-scroll-trigger" onClick={() => {
                  setMostraOrdini(true);
                }} href="#page-top">
          {" "}
          <span
            className="d-block d-lg-none text-primary-tit text-primary-tit-2"
            id="btnOrder1"
          >
            Il tuo ordine
          </span>{" "}
          <span className="d-none d-lg-block">
            <img
              className="img-fluid img-profile rounded-circle mx-auto mb-2"
              src="assets/img/person.png"
              alt=""
            />
          </span>{" "}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fas fa-bars nav-icon-me"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item d-none d-lg-block">
              <a
                className="nav-link js-scroll-trigger btnOrder"
                onClick={() => {
                  setMostraOrdini(true);
                }}
                id="btnOrder"
              >
                Il tuo ordine
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#pizze">
                Pizze
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#primi">
                Primi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#secondi">
                Secondi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#dolci">
                Dolci
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#bevande">
                Bevande
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid p-0">
        <section className="resume-section" id="about">
          <div className="resume-section-content">
            <h1 className="mb-0">
              Il
              <span className="text-primary">Menù</span>
            </h1>
            <div className="subheading">
              {" "}
              Guarda · Scegli · Ordina · <a href="">Pizzeria da Beppe</a>{" "}
            </div>
          </div>
        </section>
        <section className="resume-section" id="pizze">
          <div className="resume-section-content">
            <h2 className="mb-5">Pizze</h2>
            {pizze.map((pizza) => (
              <Pizza
                key={pizza.idPizza}
                value={pizza}
                prezzo={AggiungiPrezzoOrdinePizza}
                id={pizza.idPizza}
              />
            ))}
          </div>
        </section>
        <hr className="m-0" />
        <section className="resume-section" id="antipasti">
          <div className="resume-section-content">
            <h2 className="mb-5">Antipasti</h2>
            {antipasti.map((antipasto) => (
              <Cibo
                key={antipasto.IdCibo}
                value={antipasto}
                prezzo={AggiungiPrezzoeOrdineCibo}
              ></Cibo>
            ))}
          </div>
        </section>
        <hr className="m-0" />
        <section className="resume-section" id="primi">
          <div className="resume-section-content">
            <h2 className="mb-5">Primi</h2>
            {primi.map((primo) => (
              <Cibo
                key={primo.IdCibo}
                value={primo}
                prezzo={AggiungiPrezzoeOrdineCibo}
              ></Cibo>
            ))}
          </div>
        </section>
        <hr className="m-0" />
        <section className="resume-section" id="Secondi">
          <div className="resume-section-content">
            <h2 className="mb-5">Secondi</h2>
            {secondi.map((secondo) => (
              <Cibo
                key={secondo.IdCibo}
                value={secondo}
                prezzo={AggiungiPrezzoeOrdineCibo}
              ></Cibo>
            ))}
          </div>
        </section>
        <hr className="m-0" />
        <section className="resume-section" id="Dolci">
          <div className="resume-section-content">
            <h2 className="mb-5">Dolci</h2>
            {dolci.map((dolce) => (
              <Cibo
                key={dolce.IdCibo}
                value={dolce}
                prezzo={AggiungiPrezzoeOrdineCibo}
              ></Cibo>
            ))}
          </div>
        </section>
        <hr className="m-0" />
        <section className="resume-section" id="Bevande">
          <div className="resume-section-content">
            <h2 className="mb-5">Bevande</h2>
            {bevande.map((bevanda) => (
              <Bevanda
                key={bevanda.IdBevanda}
                AggiungiBevanda={AggiungiPrezzoeOrdineBevanda}
                value={bevanda}
              />
            ))}
          </div>
        </section>
      </div>
      <Modal
      transition="false"
        show={mostraOrdini}
        onHide={() => setMostraOrdini(false)}
      >
        <Modal.Body>
          {ordiniTotali.map((ordine) => (
            <PizzaOrder
              key={ordine.id}
              id={ordine.id}
              price={ordine.prezzo}
              ingredienti={ordine.ingredienti}
              name={ordine.name}
              ingredientiExtra={ordine.ingredientiExtra}
              ingredientiRimossi={ordine.ingredientiRimossi}
              quantita={ordine.quantita}
              modificaQuantita={modificaQuantitaPizza}
              removeOrderPizza={removeOrderPizza}
            />
          ))}
          {ciboOrdiniTotali.map((ordine, idx) => (
            <CiboOrder
              key={ordine.id}
              id={ordine.id}
              prezzo={ordine.prezzoCibo}
              descrizione={ordine.descrizione}
              nome={ordine.nomeCibo}
              quantita={ordine.quantita}
              modificaQuantita={modificaQuantitaCibo}
              removeOrder={RimuoviOrdineCibo}
              ingredientiExtra={ordine.ingredientiExtra}
              ingredientiRimossi={ordine.ingredientiRimossi}
            />
          ))}
          {ordiniBevandeTotali.map((bevanda, idx) => (
            <BevandaOrder
              key={bevanda.id}
              id={bevanda.id}
              nome={bevanda.nome}
              prezzo={bevanda.prezzo}
              volume={bevanda.volume}
              quantita={bevanda.quantita}
              rimuoviOrdineBevanda={RimuoviOrdineBevanda}
              modificaQuantita={ModificaQuantitaBevande}
            />
          ))}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <p>Prezzo: {prezzo}</p>
          <div>
            <button type="button" className="btn btn-default" onClick={()=>{setMostraOrdini(false)}} data-dismiss="modal">
              <span className="btn-del text-primary-tit ">Annulla</span>
            </button>
            <button type="button" className="btn btn-default " onClick={InviaDati} data-dismiss="modal">
              <span className="btn-add text-primary-tit ">Ordina!</span>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Home;

