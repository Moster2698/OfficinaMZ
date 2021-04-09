import React from "react";
import { Card } from "react-bootstrap";
function OrdineTavolo(props) {
 
  return (
    <>
      <Card>
          <Card.Header className="bg-navbar-Ordini">
              <h4 className="my-0 ">Tavolo {props.value.NumeroTavolo}</h4>
          </Card.Header>
          <Card.Body>
              <ul className="list-unstyled mt-3 mb-3 fw-bold">
                  <div>
                      {props.value.pizze.map((pizza,idx)=>(
                         <>
                              <li key={idx} className="text-primary-pz">{pizza.NomePizza}</li>     
                              {pizza.Rimossi!==null && pizza.Rimossi.split(',').map((rimosso)=>(
                                  <li key={rimosso}>- {rimosso}</li>
                              ))}
                              <br/>       
                          </>
                      ))}
                      {props.value.cibi.map((cibo,idx)=>(
                         <>
                              <li className="text-primary-pz" key={idx} >{cibo.nomeCibo}</li>     
                              {cibo.Rimossi!==null && cibo.Rimossi.split(',').map((rimosso)=>(
                                  <li key={rimosso}>- {rimosso}</li>
                              ))}
                              <br/>       
                          </>
                      ))}
                      <hr/>
                      {props.value.bevande.map((bevanda,idx)=>(
                          <>
                          <li className="text-primary-pz" key={idx} >{bevanda.Nome} x{bevanda.Quantita}</li>     
                          
                          <br/>       
                      </>
                      ))}
                  </div>
              </ul>
          </Card.Body>
      </Card>
    </>
  );
}

export default OrdineTavolo;
