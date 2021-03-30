import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import MyContext from "../../Contexts/IngredientiContext";
import ReactTooltip from "react-tooltip";
import "../../Styles/AggiungiPizza.css";
function AggiungiPizza(props) {
  const [cont, SetCont] = useState(0);
  const [parolaRicerca, SetParolaRicerca] = useState("");
  const [ingredientiFissi, SetIngredientiFissi] = useState([]);
  const [prezzo, SetPrezzo] = useState(0.0);
  const [nomePizza, SetnomePizza] = useState("");
  const [doppione, Setdoppione] = useState(false);
  //Nome Ingredienti
  const [ingredienti, SetIngredienti] = useState([]);
  useEffect(() => {
    if (cont != 0) props.ok();
  }, [cont]);
  useEffect(() => {
    fetch("http://localhost/Pizzeria%20Backend/Php/get_ingredienti.php", {
      method: "POST",
      headers: {},
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        result.forEach((r) => {
          r.visible = true;
        });
        SetIngredientiFissi(result);
      });
  }, []);
  function DoppioniPizza(e) {
    SetnomePizza(e.target.value);
    let cercaNomePizza = e.target.value;
    try {
      fetch(
        "http://localhost/Pizzeria%20Backend/Php/cerca_doppioni_nomepizze.php",
        {
          method: "POST",
          headers: {},
          mode: "cors",
          body: cercaNomePizza,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result > 0) Setdoppione(true);
          else Setdoppione(false);
        });
    } catch (error) {}
  }
  function Cambia() {
    SetCont(cont + 1);
  }
  function AggiungiIngrediente(e) {
    let nomeIngrediente = e.target.value;
    let idIngrediente = e.target.id;
    let dato = {
      ID_Ingrediente: idIngrediente,
      Nome: nomeIngrediente,
    };
    if (
      ingredienti.find((ingrediente) => ingrediente.Nome == dato.Nome) ===
      undefined
    )
      SetIngredienti((oldarray) => [...oldarray, dato]);
  }

  function RimuoviIngrediente(e) {
    let nomeIngrediente = e.target.value;
    SetIngredienti(
      ingredienti.filter((ingrediente) => ingrediente.Nome !== nomeIngrediente)
    );
  }
  function Cerca(e) {
    SetParolaRicerca(e.target.value);
    if (e.target.value !== "")
      ingredientiFissi.map((ing) => {
        if (!ing.Nome.includes(e.target.value)) {
          ing.visible = false;
        } else {
          if (ing.visible === false) ing.visible = true;
        }
      });
    else
      ingredientiFissi.map((ing) => {
        ing.visible = true;
      });
  }
  function CreaDato() {
    let dato = { Nome: nomePizza, Prezzo: prezzo, Ingredienti: ingredienti };
    return dato; 
  }

  function InviaDato(){

    console.log(CreaDato());
     fetch(
        "http://localhost/Pizzeria%20Backend/Php/insert_pizze.php",
        {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          mode: "cors",
          body: JSON.stringify(CreaDato()),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          
        });
   

  }
  return (
    <Modal className="modal-background" show={true} onHide={Cambia}>
      <Modal.Header className="titolo-inserimento-pizza">
        <Modal.Title>Inserimento Pizza</Modal.Title>
      </Modal.Header>
      <Modal.Body className="model-inserimento-pizza">
        <div className="nome-pizza">
          <h5 className="intro-dati">Dati Pizza</h5>
          <p>Nome</p>
          <div className="input-nome-pizza">
            <input
              type="text"
              className="modal-input"
              value={nomePizza}
              onChange={DoppioniPizza}
            />
            {doppione && <div className=" errore-doppione">x
            <span className="tooltiptext">No</span>
            </div>}
          </div>
          <p>Prezzo</p>

          <input
            className="modal-input"
            type="number"
            onChange={(e) => SetPrezzo(e.target.value)}
            value={prezzo}
          />
        </div>
      </Modal.Body>
      <Modal.Body>
        <h5 className="intro-dati">Ingredienti inseriti</h5>
        <div className="box-ingredienti-scelti">
          <ul>
            {ingredienti.map((ingrediente) => (
              <li key={ingrediente.Nome} className="prodotto-aggiungi">
                <p> {ingrediente.Nome} </p>
                <button
                  className="prodotto-bottone"
                  onClick={RimuoviIngrediente}
                  id={ingrediente.ID_Ingrediente}
                  value={ingrediente.Nome}
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Body>
        <div className="inserimento-ingredienti">
          <div className="header-inserimento-ingredienti">
            <h5 className="intro-dati">Ingredienti disponibili</h5>
            <div className="ricerca">
              <input
                type="text"
                className="ricerca-text"
                onChange={Cerca}
                value={parolaRicerca}
              />
              <FaIcons.FaSearch color="#6E09DB" />
            </div>
          </div>
          <div className="ingredienti">
            <ul>
              {ingredientiFissi.map(
                (ingrediente) =>
                  ingredienti.find((ing) => ing.Nome == ingrediente.Nome) ===
                    undefined &&
                  ingrediente.visible === true && (
                    <li key={ingrediente.Nome} className="prodotto-aggiungi">
                      <p>{ingrediente.Nome}</p>
                      <button
                        variant="outline-success"
                        className="prodotto-bottone"
                        onClick={AggiungiIngrediente}
                        id={ingrediente.ID_Ingrediente}
                        value={ingrediente.Nome}
                      >
                        +
                      </button>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="none" className="bottone-invio" onClick={InviaDato}>
          Crea Pizza
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AggiungiPizza;
