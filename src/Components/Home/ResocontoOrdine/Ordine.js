import React from "react";

function Ordine(props) {
  console.log(parseFloat(props.value.ingredientiRimossi));
  return (
    <div>
      <div key={props.value.id} className="dato">
        <p>{props.value.name}</p>
        <div className="fine-dato">
          <p className="prezzo">{parseFloat(props.value.prezzo).toFixed(2)}</p>
        </div>
      </div>
      {props.value.ingredientiExtra.length>0 && <h6>Aggiunte</h6>}
      {props.value.ingredientiExtra.length>0 && (
        <ul>
          {props.value.ingredientiExtra.map((ing) => (
            <li className="ingrediente-extra" key={ing.id}>
              {ing.name}
            </li>
          ))}
        </ul>
      )}
      {props.value.ingredientiRimossi.length>0 && (<h6>Rimossi</h6>)}
      {props.value.ingredientiRimossi.length>0 && (
        <ul>
          {props.value.ingredientiRimossi.map((ing) => (
            <li className="ingrediente-extra" key={ing}>{ing}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Ordine;
/*
<div key={props.id} className="dato">
<p>{props.nome}</p>
<div className="fine-dato">
  <p className="prezzo">{parseFloat(props.prezzo).toFixed(2)}</p>
</div>
</div>
{props.ingredientiExtra!==undefined   (<h6>Aggiunte</h6>)}
{props.ingredientiExtra!==undefined   && (
<ul>
  {props.ingredientiExtra.split(",").map((ing) => (
    <li className="ingrediente-extra" key={ing}>{ing}</li>
  ))}
</ul>
)}
<hr/>
*/
