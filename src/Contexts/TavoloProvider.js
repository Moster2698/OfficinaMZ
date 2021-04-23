import React  from "react";
import TavoloContext from "./TavoloContext";
import { useState } from "react";
//const listaPizze = require('../pizze.json');
function IngredientiProvider(props) {
  const [numeroTavolo, setNumeroTavolo] = useState(11);
  return (
    <TavoloContext.Provider value={[numeroTavolo, setNumeroTavolo]}>
      {props.children}
    </TavoloContext.Provider>
  );
}
export default IngredientiProvider;
