import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Card } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import MyContext from "../../Contexts/IngredientiContext";

function Prodotto(props) {
  const [visible, Setvisible] = useState(false);
  const [modalVisible, SetmodalVisible] = useState(false);
  const [ingredientiExtra, SetingredientiExtra] = useState([]);
  const [prezzo, SetPrezzo] = useState(props.value.Prezzo);
  const [ingredienti, Setingredienti] = useState(
    props.value.Ingredienti.split(",")
  );
  var i = ingredienti.length;
  function AggiungiIngredienteExtra(e) {
    let dato = {
      nome: e.target.value,
      id: e.target.id,
    };
    if (!ingredientiExtra.includes(dato.nome))
      SetingredientiExtra((oldarray) => [...oldarray, dato]);
  }
  function RimuoviIngredienteExtra(e) {
    let nomeIngrediente = e.target.value;
    Setingredienti(
      ingredienti.filter((ingrediente) => ingrediente !== nomeIngrediente)
    );
    SetingredientiExtra(
      ingredientiExtra.filter(
        (ingrediente) => ingrediente.nome !== nomeIngrediente
      )
    );
  }
  function InviaDati(e) {
    let datiDaInviare = [{ ID_Pizza: props.value.ID_Pizza }];
    let ingredientiTotali = [];
    for (i = 0; i < ingredienti.length; i++) {
      let dato = { nome_pro: ingredienti[i] };
      ingredientiTotali.push(dato);
    }
    datiDaInviare.push(ingredientiTotali);
    datiDaInviare.push(ingredientiExtra);
    datiDaInviare = JSON.stringify(datiDaInviare);
    console.log(datiDaInviare);
    let prezzoDainvaire = JSON.stringify({
      ID_Pizza: props.value.ID_Pizza,
      prezzo: prezzo,
    });
    fetch("http://localhost/Pizzeria%20Backend/Php/update_prezzo.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: prezzoDainvaire,
      mode: "cors",
    }).then((response) => response.json);

    fetch("http://localhost/Pizzeria%20Backend/Php/insert_aggiunte.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: datiDaInviare,
      mode: "cors",
    }).then((response) => response.json);
    ChiudiModal();
    props.change();
  }
  function ChiudiModal() {
    /*SetingredientiExtra([]);
    Setingredienti(props.value.Ingredienti.split(","));
    */
    SetmodalVisible(false);
  }
  function RimuoviPizza(e){
    console.log(e.target.value);
    fetch("http://localhost/Pizzeria%20Backend/Php/delete_pizza.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(e.target.value),
      mode: "cors",
    }).then((response) => response.json);
  }
  return (
    <div>
      <Card border="dark" className="card-prodotto" style={{ width: "15rem" }}>
        <Card.Header className="card-header">
          <span> {props.value.Nome_Pizza} </span>
          <div>
            <Button
              className="bottoni-prodotto"
              size="sm"
              onClick={() => Setvisible(!visible)}
            >
              <FaIcons.FaArrowDown />
            </Button>
            <Button size="sm" onClick={() => SetmodalVisible(!modalVisible)}>
              <FaIcons.FaHighlighter />
            </Button>
            <Button size="sm" value={props.value.ID_Pizza} onClick={RimuoviPizza}>x</Button>
          </div>
        </Card.Header>
        {visible && (
          <Card.Body>
            <Card.Title>
              <h6>Ingredienti</h6>
            </Card.Title>
            <Card.Text>{ingredienti}</Card.Text>
            <Card.Text>
              {ingredientiExtra.map((ing) => (
                <p>{ing.nome}</p>
              ))}
            </Card.Text>
            <Card.Title>
              <h6>Prezzo</h6>
            </Card.Title>
            <Card.Text>{prezzo + "€"}</Card.Text>
          </Card.Body>
        )}
      </Card>
      <Modal transition="false" show={modalVisible} onHide={ChiudiModal}>
        <Modal.Header>
          <Modal.Title className="titolo-inserimento-pizza">
            Modifica ingredienti
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5 className="intro-dati">Ingredienti dentro alla pizza</h5>
          <ul>
            {ingredienti.map((ingrediente) => (
              <li key={ingrediente} className="prodotto-aggiungi">
                <p> {ingrediente} </p>
                <button
                  className="prodotto-bottone"
                  onClick={RimuoviIngredienteExtra}
                  value={ingrediente}
                >
                  -
                </button>
              </li>
            ))}
          </ul>
          {ingredientiExtra.map((ingrediente) => (
            <li className="prodotto-aggiungi" key={ingrediente}>
              <p>{ingrediente.nome} </p>
              <button
                className="prodotto-bottone"
                onClick={RimuoviIngredienteExtra}
                value={ingrediente.nome}
                id={ingrediente.id}
              >
                -
              </button>
            </li>
          ))}
        </Modal.Body>
        <Modal.Body>
          <div className="listaAggiungiIngredienti">
            <hr></hr>
            <h5 className="intro-dati">Aggiunte</h5>
            <ul>
              <MyContext.Consumer>
                {(context) =>
                  context[0].map(
                    (ingrediente) =>
                      !ingredienti.includes(ingrediente.Nome) &&
                      ingredientiExtra.find(
                        (dato) => dato.nome === ingrediente.Nome
                      ) === undefined && (
                        <li
                          key={ingrediente.Nome}
                          className="prodotto-aggiungi"
                        >
                          <p>{ingrediente.Nome}</p>
                          <button
                            className="prodotto-bottone"
                            onClick={AggiungiIngredienteExtra}
                            value={ingrediente.Nome}
                            id={ingrediente.ID_Ingrediente}
                          >
                            +
                          </button>
                        </li>
                      )
                  )
                }
              </MyContext.Consumer>
            </ul>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <input
            type="text"
            onChange={(e) => SetPrezzo(e.target.value)}
            value={prezzo}
          />
          <Button variant="secondary" onClick={ChiudiModal}>
            Close
          </Button>
          <Button variant="primary" onClick={InviaDati}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Prodotto;
