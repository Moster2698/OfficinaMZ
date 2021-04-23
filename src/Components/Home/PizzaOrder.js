import React from "react";
import { IoIosClose } from "react-icons/io";
import {Button,ButtonGroup} from "react-bootstrap";
function PizzaOrder(props) {
  function modificaQuantita(e) {
    //props.removeOrder([props.id, props.price]);
    let operatore = e.target.value;
    if (operatore === "-" && props.quantita === 1)
      props.removeOrderPizza(props.id, props.price);
    else props.modificaQuantita(operatore, props.id);
  }
console.log(props.ingredientiExtra);
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <h5>{props.name} </h5>
          
          {props.ingredientiExtra.length > 0 && <h6>Aggiunte</h6>}
          {props.ingredientiExtra.length > 0 &&
            props.ingredientiExtra.map((ingrediente) => (
              <p key={ingrediente.id} className="ingrediente-ordine">
                {ingrediente.nome}
              </p>
            ))}
          {props.ingredientiRimossi.length > 0 && <h6>Senza</h6>}
          {props.ingredientiRimossi.map((ingrediente) => (
            <p key={ingrediente} className="ingrediente-ordine">
              {ingrediente}
            </p>
          ))}
        </div>
        <div className="d-flex flex-column">
          <p>€{parseFloat(props.price).toFixed(2)} </p>
          <ButtonGroup size="sm">
            <Button disabled variant="secondary">
              x{props.quantita}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={modificaQuantita}
              value={"+"}
            >
              +
            </Button>
            <Button
              variant="outline-secondary"
              onClick={modificaQuantita}
              value={"-"}
            >
              -
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
export default PizzaOrder;
