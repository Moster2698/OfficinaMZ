import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaPlus, FaSlidersH, FaTimes } from "react-icons/fa";
function Cibo(props) {
  const [mostraModale, setMostraModale] = useState(false);
  const [ingredientiRimossi, setIngredientiRimossi] = useState([]);
  const [ingredientiAggiunti, setIngredientiAggiunti] = useState([]);
  const ingredienti = props.value.Ingredienti.split(",");
  function AggiungiIngrediente(e) {
    let nomeIngrediente = e.currentTarget.value;
    setIngredientiRimossi((oldArray) => [...oldArray, nomeIngrediente]);
  }
  function RimuoviIngrediente(e) {
    setIngredientiRimossi(
      ingredientiRimossi.filter((ing) => ing !== e.currentTarget.value)
    );
  }
  function InviaPiatto(e) {
    setMostraModale(false);
    if (ingredientiRimossi.length === ingredienti.length) console.log("Errore");
    else props.prezzo(e);
  }
  function InserisciAggiunta(e) {
    let aggiuntaDaInserire = JSON.parse(e.currentTarget.value);
    setIngredientiAggiunti(ingredientiAggiunti.concat(aggiuntaDaInserire));
  }
  function RimuoviAggiunta(e){
    setIngredientiAggiunti(ingredientiAggiunti.filter((aggiunta)=>aggiunta.IdAggiunta!==JSON.parse(e.currentTarget.value).IdAggiunta))
  }
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
      <div className="flex-grow-1">
        <h3 className="mb-0">{props.value.nomeCibo}</h3>
        <p>{ingredienti}</p>
      </div>
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={InviaPiatto}
          value={JSON.stringify({
            id: props.value.IdCibo,
            nome: props.value.nomeCibo,
            prezzo: props.value.Prezzo,
            descrizione: props.value.Descrizione,
            rimossi: ingredientiRimossi,
            ingredientiExtra: ingredientiAggiunti
          })}
          className="button-none"
        >
          <span className="text-primary">
            <FaPlus></FaPlus>
          </span>
        </button>
        <button
          type="button"
          className="button-none"
          data-toggle="modal"
          data-target="#editModal"
          onClick={() => setMostraModale(!mostraModale)}
        >
          <span className="text-primary flex-shrink-tool">
            <FaSlidersH></FaSlidersH>
          </span>
        </button>{" "}
        <span className="text-primary flex-shrink-tool">
          {" "}
          {parseFloat(props.value.Prezzo).toFixed(2) + " €"}
        </span>
      </div>
      <Modal
        size="sm"
        transition="false"
        show={mostraModale}
        onHide={() => setMostraModale(!mostraModale)}
      >
        <Modal.Body>
          <h6 className="intro-dati">Ingredienti dentro al piatto</h6>
          {props.value.Ingredienti !== undefined &&
            ingredienti.map(
              (ingrediente, idx) =>
                ingredientiRimossi.find((ing) => ing === ingrediente) ===
                  undefined && (
                  <div key={idx} className="d-flex justify-content-between">
                    <p>{ingrediente}</p>
                    <button
                      className="button-none"
                      value={ingrediente}
                      jus={"id"}
                      onClick={AggiungiIngrediente}
                    >
                      <span className="text-primary">
                        <FaTimes className="btn-del" />
                      </span>
                    </button>
                  </div>
                )
            )}
        </Modal.Body>
        {ingredientiAggiunti.length > 0 && (
          <Modal.Body>
            <h6 className="intro-dati">Aggiunte</h6>
            {ingredientiAggiunti.map((aggiunta) => (
              <div
                key={aggiunta.nome}
                className="d-flex justify-content-between"
              >
                <p>{aggiunta.nome}</p>
                <button className="button-none" value={JSON.stringify(aggiunta)} onClick={RimuoviAggiunta}>
                  <span className="text-primary">
                    <FaTimes className="btn-del" />
                  </span>
                </button>
              </div>
            ))}
          </Modal.Body>
        )}
        {ingredientiRimossi.length > 0 && (
          <Modal.Body>
            <h6 className="intro-dati">Ingredienti Rimossi</h6>
            {ingredientiRimossi.map((ingredienteRimosso) => (
              <div
                key={ingredienteRimosso}
                className="d-flex justify-content-between"
              >
                <p>{ingredienteRimosso}</p>
                <button
                  className="button-none"
                  value={ingredienteRimosso}
                  jus={"id"}
                  onClick={RimuoviIngrediente}
                >
                  <span className="text-primary">
                    <FaTimes className="btn-del" />
                  </span>
                </button>
              </div>
            ))}
          </Modal.Body>
        )}

        {props.value.PossibiliAggiunte !== null && (
          <Modal.Body>
            <h6 className="intro-dati">Ingredienti Disponibili</h6>
            {props.value.PossibiliAggiunte.map(
              (Aggiunta) =>
                !ingredientiAggiunti.find(
                  (aggiunta) => aggiunta.nome === Aggiunta.Nome
                ) && (
                  <div
                    key={Aggiunta.IdAggiunta}
                    className="d-flex justify-content-between"
                  >
                    <div>{Aggiunta.Nome}</div>
                    <div>
                      <button
                        type="button"
                        className="button-none"
                        onClick={InserisciAggiunta}
                        value={JSON.stringify({
                          id: Aggiunta.IdAggiunta,
                          nome: Aggiunta.Nome,
                          prezzo: Aggiunta.Prezzo,
                        })}
                      >
                        <span className="text-primary">
                          <FaPlus className="btn-add"></FaPlus>
                        </span>
                      </button>
                    </div>
                  </div>
                )
            )}
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button
            value={JSON.stringify({
              id: props.value.IdCibo,
              nome: props.value.nomeCibo,
              prezzo: props.value.Prezzo,
              descrizione: props.value.Descrizione,
              rimossi: ingredientiRimossi,
              ingredientiExtra: ingredientiAggiunti
            })}
            onClick={InviaPiatto}
          >
            Invia
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cibo;
/*
<div className="container-fluid  m-2  pl-2 pb-2">
      <div className="row mt-2">
        <div className="col-xl-12  col-*-1">
          <h5>{props.value.nomeCibo}</h5>
        </div>
        <div className="col-xl-2 col-2 d-flex">
          <button
            className="bottonePrezzo"
            value={JSON.stringify({
              id: props.value.IdCibo,
              nome: props.value.nomeCibo,
              prezzo: props.value.Prezzo,
              descrizione: props.value.Descrizione,
              rimossi: ingredientiRimossi,
            })}
            onClick={InviaPiatto}
          >
            {parseFloat(props.value.Prezzo).toFixed(2) + " €"}
          </button>
          <button
            className="bottoneIngredienti"
            onClick={() => setMostraModale(!mostraModale)}
          >
            +
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>{props.value.Descrizione}</p>
        </div>
      </div>
      <Modal
        size="sm"
        transition="false"
        show={mostraModale}
        onHide={() => setMostraModale(!mostraModale)}
      >
        <Modal.Body>
          <h6 className="intro-dati">Ingredienti dentro al piatto</h6>
          {props.value.Ingredienti !== undefined &&
            ingredienti.map(
              (ingrediente, idx) =>
                ingredientiRimossi.find((ing) => ing === ingrediente) ===
                  undefined && (
                  <div key={idx}className="d-flex justify-content-between">
                    <p >{ingrediente}</p>
                    <button
                      className="prodotto-bottone"
                      value={ingrediente}
                      jus={"id"}
                      onClick={AggiungiIngrediente}
                    >
                      x
                    </button>
                  </div>
                )
            )}
        </Modal.Body>
        <Modal.Body>
          <h6 className="intro-dati">Ingredienti Rimossi</h6>
          {ingredientiRimossi.map((ingredienteRimosso) => (
            <div key={ingredienteRimosso} className="d-flex justify-content-between">
              <p>{ingredienteRimosso}</p>
              <button
                className="prodotto-bottone"
                value={ingredienteRimosso}
                onClick={RimuoviIngrediente}
              >
                x
              </button>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button

            value={JSON.stringify({
              id: props.value.IdCibo,
              nome: props.value.nomeCibo,
              prezzo: props.value.Prezzo,
              descrizione: props.value.Descrizione,
              rimossi: ingredientiRimossi,
            })}
            onClick={InviaPiatto}
          >Invia</Button>
        </Modal.Footer>
      </Modal>*/
