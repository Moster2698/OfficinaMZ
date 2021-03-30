import React from "react";
import OrdiniContext from "./OrdiniContext";
import { useState } from "react";
function OrdiniProvider(props) {
  const [ordiniTotali, setOrdiniTotali] = useState([]);
  const [bevandeTotali,setBevandeTotali] = useState([]);
  const [ciboOrdiniTotali, setCiboOrdiniTotali] = useState([]);
  return (
    <OrdiniContext.Provider value={{ordiniPizze:[ordiniTotali, setOrdiniTotali],ordiniBevande:[bevandeTotali,setBevandeTotali],ordiniCibo:[ciboOrdiniTotali,setCiboOrdiniTotali]}}>
      {props.children}
    </OrdiniContext.Provider>
  );
}
export default OrdiniProvider;
