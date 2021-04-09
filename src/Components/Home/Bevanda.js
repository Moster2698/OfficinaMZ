import React from "react";
import {FaPlus,FaSlidersH} from "react-icons/fa";
function Bevanda(props) {

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
      <div className="flex-grow-1">
        <h3 className="mb-0">
          {props.value.Nome} {props.value.Quantita}
        </h3>
      </div>
      <div className="flex-shrink-0">
        <button type="button" className="button-none" onClick={props.AggiungiBevanda} value={JSON.stringify({id:props.value.IdBevanda,nome:props.value.Nome,prezzo:props.value.Prezzo,volume:props.value.Quantita})}>
          <span className="text-primary">
            <FaPlus></FaPlus>
          </span>
        </button>
        <span className="text-primary flex-shrink-tool">
          {" "}
          {parseFloat(props.value.Prezzo).toFixed(2) + " €"}
        </span>
      </div>
    </div>
  );
}

export default Bevanda;
