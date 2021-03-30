import React from "react";
import { useState } from "react";
function IngredienteExtra(props) {
  const [visible, setVisible] = useState(true);
  var nomeIngrediente = props.name;
  function EliminaIngrediente(e){
   // setVisible(false);
  
    props.ClickEvent(e);
  }
  return (
    
    (visible && (
      <li className="ingrediente ingredienteAggiunto" key={nomeIngrediente}>
        <p>{nomeIngrediente}</p>

        <button className="modal-elimina-ingrediente"  onClick={EliminaIngrediente} value={nomeIngrediente +'.' +props.id}>
          {props.price}
        </button>
      </li>
))
  );
}

export default IngredienteExtra;
