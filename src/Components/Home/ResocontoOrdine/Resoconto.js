import React, { useContext } from "react";
import OrdiniContext from "../../../Contexts/OrdiniContext";
import OrdineCibo from "./OrdineCibo";
import "../../../Styles/Resoconto.css";
import Ordine from "./Ordine";
import TavoloContext from "../../../Contexts/TavoloContext";
import PrezzoContext from "../../../Contexts/PrezzoContext";
import OrdineBevanda from "./OrdineBevanda";
import { Card } from "react-bootstrap";
function Resoconto(props) {
  const { ordiniPizze, ordiniBevande, ordiniCibo } = useContext(OrdiniContext);
  const [ordiniTotali, setOrdiniTotali] = ordiniPizze;
  const [ordiniBevandeTotali, setordiniBevandeTotali] = ordiniBevande;
  const [ciboOrdiniTotali, setCiboOrdiniTotali] = ordiniCibo;
  const [tavolo, setTavolo] = useContext(TavoloContext);
  const [prezzo, setPrezzo] = useContext(PrezzoContext);
  

  function InviaDati() {
    let dato = { tavolo: tavolo, pizze: ordiniTotali, cibo: ciboOrdiniTotali,bevande:ordiniBevandeTotali };
    fetch("http://localhost:3010/api/ristorazione/insert-ordine", {
      mode: "cors",
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dato),
    });
    
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center">
        <Card.Header>Riepilogo Ordine</Card.Header>
        {ordiniTotali.map((ordine) => (
          <Ordine value={ordine} />
        ))}

        {ciboOrdiniTotali.map((ordine) => (
          <OrdineCibo value={ordine} />
        ))}
        {ordiniBevandeTotali.map((bevanda)=>(
          <OrdineBevanda value={bevanda}/>
        ))}
        <Card.Footer>
          <p>Prezzo: {prezzo}</p>
          <div className="footer-buttons">
            <button className="bottone-conferma" onClick={InviaDati}>
              Conferma Ordine
            </button>
            <button className="bottone-annulla">Annulla Ordine</button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Resoconto;
