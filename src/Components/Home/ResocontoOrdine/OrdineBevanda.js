
import React from "react";

function OrdineBevanda(props) {
  
  return (
    <div>
      <div key={props.value.id} className="dato">
        <p>{props.value.quantita}x {props.value.nome} {props.value.volume}</p>
        <div className="fine-dato">
          <p className="prezzo">{parseFloat(props.value.prezzo).toFixed(2)}</p>
        </div>
      </div>
      <hr/>
    </div>
  );
}

export default OrdineBevanda;
