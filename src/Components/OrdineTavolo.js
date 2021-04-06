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
                      {props.value.pizze.map((pizza)=>(
                         <>
                              <li key={pizza.IdPizza} className="text-primary-pz">{pizza.NomePizza}</li>     
                              {pizza.Rimossi!==null && pizza.Rimossi.split(',').map((rimosso)=>(
                                  <li key={rimosso}>- {rimosso}</li>
                              ))}
                              <br/>       
                          </>
                      ))}
                      {props.value.cibi.map((cibo)=>(
                         <>
                              <li className="text-primary-pz">{cibo.nomeCibo}</li>     
                              {cibo.Rimossi!==null && cibo.Rimossi.split(',').map((rimosso)=>(
                                  <li key={rimosso}>- {rimosso}</li>
                              ))}
                              <br/>       
                          </>
                      ))}
                      <hr/>
                      <div>
                          
                      </div>
                  </div>
              </ul>
          </Card.Body>
      </Card>
    </>
  );
}

export default OrdineTavolo;
