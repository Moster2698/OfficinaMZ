import React, { useState } from "react";

function NumeroTavolo(props) {
  const [num,setNum] = useState("0");

  function CambiaNumeroTavolo(e){
    if(num.length<2){
    if(num==="0")
      setNum(e.target.value);
    else
      setNum(num+e.target.value);
    }
    props.inserimento();
  }
  function RimuoviUltimoNumero(){
    props.inserimento();
    if(num.length>1)
      setNum(num.substring(0,num.length-1));
    else
      setNum("0");
  }
  return (
    <div className="box">
      <h2>Inserisci il numero del Tavolo</h2>
      <div className="box-inserimento-numero-tavolo">
        <div className="box-inserimento-numero-tavolo-header">
            <p className="input-header">{num}</p>
        </div>
        <div className="box-inserimento-numero-tavolo-body">
          <button className="inserimento-numero" value="9" onClick={CambiaNumeroTavolo}>9</button>
          <button className="inserimento-numero" value="8" onClick={CambiaNumeroTavolo}>8</button>
          <button className="inserimento-numero" value="7" onClick={CambiaNumeroTavolo}>7</button>
          <button className="inserimento-numero" value="6" onClick={CambiaNumeroTavolo}>6</button>
          <button className="inserimento-numero" value="5" onClick={CambiaNumeroTavolo}>5</button>
          <button className="inserimento-numero" value="4" onClick={CambiaNumeroTavolo}>4</button>
          <button className="inserimento-numero" value="3" onClick={CambiaNumeroTavolo}>3</button>
          <button className="inserimento-numero" value="2" onClick={CambiaNumeroTavolo}>2</button>
          <button className="inserimento-numero" value="1" onClick={CambiaNumeroTavolo}>1</button>
          <button className={["inserimento-numero","cancella"].join(' ')} onClick={RimuoviUltimoNumero}>C</button>
          <button className="inserimento-numero" value="0" onClick={CambiaNumeroTavolo}>0</button>
          <button className={["inserimento-numero","conferma"].join(' ')} onClick={props.controllo} value={num}>INVIO</button>
        </div>
      </div>
    </div>
  );
}

export default NumeroTavolo;
