import React, { useEffect, useState } from "react";
import RistorazioneContext from "./RistorazioneContext";
function RistorazioneProvider(props) {
  const [antipasti, setAntipasti] = useState([]);
  const [primi, setPrimi] = useState([]);
  const [secondi, setSecondi] = useState([]);
  const [dolci, setDolci] = useState([]);
  const [pizze, setPizze] = useState([]);
  const [bevande, setBevande] = useState([]);
  useEffect(() => {
    fetch("http://192.168.178.20:3010/api/ristorazione/get-bevande", {
      method: "Get",
      headers: {},
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        setBevande(result);
      });
    fetch("http://192.168.178.20:3010/api/ristorazione/cibo", {
      method: "get",
      headers: {},
      mode: "cors",
    })
      .then((response) => response.json())
      .then(function (result) {
        console.log(result);
        setAntipasti(
            result.filter((pietanza) => pietanza.Nome === "Antipasto")
        );
        setPrimi(result.filter((pietanza) => pietanza.Nome === "Primo"));
        setSecondi(result.filter((pietanza) => pietanza.Nome === "Secondo"));
        setDolci(result.filter((pietanza) => pietanza.Nome === "Dessert"));
      });
    fetch("http://192.168.178.20:3010/api/ristorazione/pizze", {
      method: "Get",
      headers: {},
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        setPizze(result);
      });
  }, []);
  return (
    <RistorazioneContext.Provider
      value={{
        antipasti: antipasti,
        primi: primi,
        secondi: secondi,
        dolci: dolci,
        pizze: pizze,
        bevande: bevande
      }}
    >
      {props.children}
    </RistorazioneContext.Provider>
  );
}
export default RistorazioneProvider;
