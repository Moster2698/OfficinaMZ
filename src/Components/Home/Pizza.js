import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import IngredienteExtra from "./IngredienteExtra";
import MyContext from "../../Contexts/IngredientiContext";
import  {FaPlus,FaSlidersH,FaTimes} from "react-icons/fa";
const listaIngredienti = require("./ingredienti.json");
function Pizza(props) {
  const [isVisibile, setisVisible] = useState(false);
  const [ingredientiExtra, setIngredientiExtra] = useState([]);
  const listaIngredientiExtra = useContext(MyContext)[0];
  const pino = useContext(MyContext);
  const ingredienti = props.value.Ingredienti.split(",");
  const [ingredientiRimossi, setIngredientiRimossi] = useState([]);
  const showPizzaIngredients = () => setisVisible(!isVisibile);
  function handleClose(e) {
   
    setIngredientiRimossi([]);
    if (e.currentTarget.value) props.prezzo(e);
    setIngredientiExtra([]);
    listaIngredientiExtra.map(
      (ingredientiExtra) => (ingredientiExtra.visible = true)
    );
    setisVisible(false);
  }
  function RimuoviIngrediente(e) {
    let valoriIngrediente = JSON.parse(e.currentTarget.value);
    setIngredientiExtra(
      ingredientiExtra.filter(
        (ingrediente) => ingrediente.nome !== valoriIngrediente.nome
      )
    );
  }
  function AggiungiIngrdiente(e) {
    let valoriIngrediente = JSON.parse(e.currentTarget.value);
  
    let nomeIngrediente = valoriIngrediente.nome;
    let prezzoIngrediente = valoriIngrediente.prezzo;
    let idIngrediente = valoriIngrediente.id;
    let cercaIngredienteDoppione = false;
    if(!ingredientiExtra.find((ingredienteExtra)=>ingredienteExtra.nome===nomeIngrediente))
      setIngredientiExtra([
        ...ingredientiExtra,
       valoriIngrediente
      ]);
    
  }
  function CalcolaPrezzoIngredienti() {
    let sum = 0.0;
    ingredientiExtra.map(
      (ingrediente) => (sum += parseFloat(ingrediente.prezzo))
    );
    return sum;
  }

  function RimuoviIngredienteFisso(e) {
    let nomeIngrediente = e.currentTarget.value;
    if (!ingredientiRimossi.includes(nomeIngrediente))
      setIngredientiRimossi((oldArray) => [...oldArray, nomeIngrediente]);
  }
  function RimettiIngredienteFisso(e) {
    let nomeIngrediente = e.currentTarget.value;
    setIngredientiRimossi(
      ingredientiRimossi.filter((ing) => ing !== nomeIngrediente)
    );
  }
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
      <div className="flex-grow-1">
        <h3 className="mb-0 ">{props.value.NomePizza}</h3>

        <p>{props.value.Ingredienti.split(",").toString()}</p>
      </div>
      <div className="flex-shrink-0">
        <button
          type="button"
          className="button-none"
          value={JSON.stringify({
            id: props.id,
            nome: props.value.NomePizza,
            prezzo: props.value.Prezzo,
            ingredienti: ingredienti,
            ingredientiExtra:[],
            ingredientiRimossi:ingredientiRimossi
          })}
          onClick={props.prezzo}
        >
          <span className="text-primary">
            <FaPlus></FaPlus>
          </span>
        </button>
        <button
          type="button"
          className="button-none"
          data-toggle="modal"
          data-target="#editModal"
          onClick={showPizzaIngredients}
        >
          <span className="text-primary flex-shrink-tool">
            <FaSlidersH></FaSlidersH>
          </span>
        </button>{" "}
        <span className="text-primary flex-shrink-tool">
          {" "}
          {parseFloat(props.value.Prezzo).toFixed(2) + " €"}
        </span>
      </div>
      <Modal
        transition="false"
        show={isVisibile}
        onHide={() => setisVisible(false)}
      >
        <Modal.Header>
          <Modal.Title>{props.value.NomePizza}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex justify-content-between">
            <div className="text-primary-tit">Ingredienti presenti: </div>
          </div>
          {props.value.Ingredienti.split(",").map(
            (ingrediente) =>
              !ingredientiRimossi.includes(ingrediente) && (
                <div key={ingrediente} className="d-flex justify-content-between">
                  <div> {ingrediente}</div>
                  <div>
                    <button
                      type="button"
                      className="button-none"
                      onClick={RimuoviIngredienteFisso}
                      value={ingrediente}
                    >
                      <span className="text-primary">
                        <FaTimes className="btn-del" />
                      </span>
                    </button>
                  </div>
                </div>
              )
          )}
        </Modal.Body>
        <Modal.Body>
        <div className="d-flex justify-content-between ">
            <div className="text-primary-tit">Aggiunte: </div>
          </div>
            {ingredientiExtra.map(
              (ingrediente) =>
                !ingredienti.includes(ingrediente.nome) && (
                  <div key={ingrediente.nome} className="d-flex justify-content-between ">
                  <div> {ingrediente.nome}</div>
                  
                  <div className="d-flex align-items-stretch ">
                      <div>{ingrediente.prezzo}€</div>
                    <button
                      type="button"
                      className="button-none"
                      onClick={RimuoviIngrediente}
                      value={JSON.stringify({id:ingrediente.id,nome:ingrediente.nome})}
                    >
                        <FaTimes className="btn-del" />

                    </button>
                  </div>
                </div>
                )
            )}
          
          <div className="d-flex justify-content-between ">
            <div className="text-primary-tit">Rimossi: </div>
          </div>
            {ingredientiRimossi.map((ingrediente) => (
               <div key={ingrediente} className="d-flex justify-content-between ">
               <div> {ingrediente}</div>
               
               <div className="d-flex ">
                 <button
                   type="button"
                   className="button-none"
                   onClick={RimettiIngredienteFisso}
                   value={ingrediente}
                 >
                     <FaPlus className="btn-add" />

                 </button>
               </div>
             </div>
              
            ))}
          <hr />
          <div className="d-flex justify-content-between">
            <div className="text-primary-tit">Ingredienti disponibili: </div>
          </div>
              {listaIngredientiExtra.map(
                (ingredienteDaAggiungere) =>
                  !ingredienti.includes(
                    ingredienteDaAggiungere.NomeIngrediente
                  ) && !ingredientiExtra.find((ingredienteExtra)=>ingredienteExtra.nome===ingredienteDaAggiungere.NomeIngrediente) && (
                    <div className="d-flex justify-content-between" key={ingredienteDaAggiungere.NomeIngrediente}>
                    <div>{ingredienteDaAggiungere.NomeIngrediente}</div>
                    <div>
                       <button type="button" className="button-none" onClick={AggiungiIngrdiente} value={JSON.stringify({
                          id: ingredienteDaAggiungere.IdIngrediente,
                          nome: ingredienteDaAggiungere.NomeIngrediente,
                          prezzo: ingredienteDaAggiungere.Prezzo,
                        })}><span className="text-primary"  
                        ><FaPlus className="btn-add"></FaPlus></span></button>
                    </div>
                 </div>
                    
                  )
              )}
        
        </Modal.Body>
        <Modal.Footer>
      <button type="button" className="btn btn-default " data-dismiss="modal" onClick={handleClose}><span className="btn-del text-primary-tit ">Annulla</span></button>
        <button type="button" className="btn btn-default " data-dismiss="modal"  onClick={handleClose}
            value={JSON.stringify({
              id: props.id,
              nome: props.value.NomePizza,
              idPizza: props.id,
              prezzo:
                parseFloat(props.value.Prezzo) + CalcolaPrezzoIngredienti(),
              ingredientiExtra: ingredientiExtra,
              ingredientiRimossi: ingredientiRimossi,
            })}><span className="btn-add text-primary-tit ">Conferma</span></button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Pizza;
