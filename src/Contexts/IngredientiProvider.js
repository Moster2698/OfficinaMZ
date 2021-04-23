import React, { useEffect } from "react";
import MyContext from "./IngredientiContext";
import { useState } from "react";
//const listaPizze = require('../pizze.json');
function IngredientiProvider(props) {
  const [ingredienti, setIngredienti] = useState([]);
  useEffect(() => {
    fetch("http://192.168.178.20:3010/api/ristorazione/ingredientiAggiunta", {
      method: "get",
      headers: {},
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        result.forEach((r) => {
          r.visible = true;
        });
        
        setIngredienti(result);
      });
  }, []);

  return (
    <MyContext.Provider value={[ingredienti, setIngredienti]}>
      {props.children}
    </MyContext.Provider>
  );
}
export default IngredientiProvider;
