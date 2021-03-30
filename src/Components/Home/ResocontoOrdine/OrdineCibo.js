import React from "react";

function OrdineCibo(props) {
  
  return (
    <div>
      <div key={props.value.id} className="dato">
        <p>{props.value.quantita}x {props.value.nomeCibo}</p>
        <div className="fine-dato">
          <p className="prezzo">{parseFloat(props.value.prezzoCibo).toFixed(2)}</p>
        </div>
      </div>
      {props.value.ingredientiRimossi.length>0 &&  (<h6>Rimossi</h6>)}
      {props.value.ingredientiRimossi.length>0   && (
        <ul>
          {props.value.ingredientiRimossi.map((ing) => (
            <li className="ingrediente-extra" key={ing}>{ing}</li>
          ))}
        </ul>
      )}
      <hr/>
    </div>
  );
}

export default OrdineCibo;
