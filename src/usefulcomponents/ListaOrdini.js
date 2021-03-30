import React, { useState } from "react";

import Ordine from '../usefulcomponents/Ordine';
import "../Styles/Orders.css";
function ListaOrdini(props) {
  let ordini = props.value;
  const [stato,SetStato] = useState(true);
function UpdateStatoPizza(e){
  let idOrdine = JSON.stringify({ID_Ordine: e.target.value});
  fetch("http://localhost/Pizzeria%20Backend/Php/update_stato.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: idOrdine,
    mode: "cors",
  }).then((response) => response.json);
  SetStato(false);
}
  return (
    stato && (
    <div>
      <h1>{"Ordine" + " " + ordini[0].ID_Ordine}</h1>
      <button onClick={UpdateStatoPizza} value={ordini[0].ID_Ordine}>ok</button>
      <div className="card-deck">
        {ordini.map((ordine) => (
          <Ordine value={ordine}></Ordine>
        ))}
      </div>
    </div>
    )
  );
}

export default ListaOrdini;

