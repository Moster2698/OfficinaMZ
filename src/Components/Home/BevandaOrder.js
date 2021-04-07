import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

function BevandaOrder(props) {
  console.log(props)
  function modificaQuantita(e) {
    let operatore = e.target.value;
    
    if (operatore === "-" && props.quantita === 1)
      props.rimuoviOrdineBevanda(props.id, props.prezzo);
    else props.modificaQuantita(operatore, props.id);
  }
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <h5>{props.nome} {props.volume} </h5>
        </div>
        <div className="d-flex flex-column">
          <p>€{parseFloat(props.prezzo).toFixed(2)} </p>
          <div className="d-flex">
            <ButtonGroup size="sm">
              <Button disabled variant="secondary">
                x{props.quantita}
              </Button>
              <Button variant="outline-secondary" onClick={modificaQuantita} value={"+"}>
                +
              </Button>
              <Button variant="outline-secondary" onClick={modificaQuantita} value={"-"}>
                -
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BevandaOrder;
