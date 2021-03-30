import React from "react";
import PrezzoContext from "./PrezzoContext";
import { useState } from "react";
function PrezzoProvider(props) {
  const [prezzo,setPrezzo] = useState(0.0);
  return (
    <PrezzoContext.Provider value={[prezzo,setPrezzo]}>
      {props.children}
    </PrezzoContext.Provider>
  );
}
export default PrezzoProvider;
