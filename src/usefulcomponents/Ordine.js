import React, { useState } from "react";
import '../Styles/Orders.css';
function Ordine(props) {
  let ordine = props.value;
  const [visible, SetVisible] = useState(true);

  return (
    visible && (
      <div className="Ordine">
        <h2>{ordine.Nome_Pizza}</h2>

        <div className="Ordine-listaIngredienti">
          {ordine.Ingredienti_Extra !== undefined &&
            ordine.Ingredienti_Extra.split(",").map((Ingrediente_extra) => (
                
              <p className="Ordine-ingrediente">{Ingrediente_extra}</p>
            ))}
        </div>
      </div>
    )
  );
}

export default Ordine;
