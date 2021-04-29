import React from "react";
import { Card } from "react-bootstrap";
function OrdineTavolo(props) {
    console.log(props.value.pizze);
  return (
    <>
      <Card className=" mb-2">
          <Card.Header className="bg-navbar-Ordini justify-content-center">
              <h4 className="my-0">Tavolo {props.value.NumeroTavolo}</h4>
          </Card.Header>
          <Card.Body>
              <ul className="list-unstyled mt-3 mb-3 fw-bold">
                  <div>
                      {props.value.pizze.map((pizza,idx)=>(
                         <>
                         {pizza.NomePizza!==null && (
                             <>
                             <li key={idx} className="text-primary-pz">{pizza.NomePizza} x{pizza.Quantita}</li>     
                             {pizza.Rimossi!==null && pizza.Rimossi.split(',').map((rimosso)=>(
                                  <li key={rimosso}>- {rimosso}</li>
                              ))}
                              <br/>

                             </>
                         )}
                              
                                
                          </>
                      ))}
                      {props.value.cibi.map((cibo,idx)=>(
                         <>
                              <li className="text-primary-pz" key={idx} >{cibo.nomeCibo} x{cibo.Quantita}</li>     
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
              <button className="w-100 btn btn-lg btn-outline-success" value={props.value.NumeroTavolo} onClick={props.removeOrder}>Completato</button>
          </Card.Body>
          
      </Card>
    </>
  );
}

export default OrdineTavolo;
