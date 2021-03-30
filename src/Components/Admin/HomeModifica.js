import React from "react";
import { useState, useEffect } from "react";
import { CardDeck, Nav } from "react-bootstrap";
import IngredientiProvider from "../../Contexts/IngredientiProvider";
import AggiungiPizza from "./AggiungiPizza";
import Prodotto from "./Prodotto";

function HomeModifica() {
  const [pizze, setPizze] = useState([]);
  const [visible, Setvisible] = useState(false);
  const [change, SetChange] = useState(0);
  const [modalVisible, SetmodalVisible] = useState(false);
  useEffect(() => {
    fetch("http://localhost/Pizzeria%20Backend/Php/get_pizze.php", {
      method: "POST",
      headers: {},
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        setPizze(result);
      });
  }, [change]);
  function Cambia() {
    SetChange(change + 1);
  }
  useEffect(() => {

  }, [modalVisible])

  return (
    <div>
      <Nav className="justify-content-end" activeKey="/">
        <Nav.Item>
          <Nav.Link onClick={()=>SetmodalVisible(!modalVisible)}>
            Aggiungi Pizza
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <IngredientiProvider>
        <div className="lista-prodotti">
          {pizze.map((pizza) => (
            <Prodotto key={pizza.ID_Pizza} change={Cambia} value={pizza} />
          ))}
        </div>
        {modalVisible && (<AggiungiPizza ok={()=>SetmodalVisible(!modalVisible)} />)}
      </IngredientiProvider>
    </div>
  );
}

export default HomeModifica;
