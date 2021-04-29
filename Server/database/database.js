var mysql = require("mysql");
const util = require("util");
const con = mysql.createPool({
  host: "localhost",
  database: "prova",
  connectionLimit: 10,
  user: "root",
  password: "",
  port: "3306",
});
con.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Connessione DB chiusa");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database ha troppe connessioni aperte");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("La connessione al database è stata rifiutata");
    }
  }
  if (connection) connection.release();
  return;
});

const getCibo = () => {
  return new Promise(function (resolve, reject) {
    let query =
      "SELECT cibo.IdCibo,nomeCibo,Cibo.Descrizione,Categoria.Nome,cibo.Prezzo,GROUP_CONCAT(DISTINCT nomeIngrediente) as Ingredienti, CASE WHEN ingredienteaggiungicibo.IdCiboAggiunta IS NOT NULL THEN GROUP_CONCAT(DISTINCT JSON_OBJECT('IdAggiunta', ingredienteaggiungicibo.IdCiboAggiunta, 'Nome', ingredienteaggiungicibo.Nome,'Prezzo',ingredienteaggiungicibo.Prezzo) SEPARATOR '|') ELSE NULL END AS PossibiliAggiunte  FROM `cibo`  NATURAL JOIN ciboingrediente NATURAL JOIN ingrediente LEFT JOIN Categoria on cibo.Categoria = Categoria.ID LEFT JOIN ciboaggiunte on cibo.IdCibo = ciboaggiunte.IdCibo LEFT JOIN ingredienteaggiungicibo on ingredienteaggiungicibo.IdCiboAggiunta = ciboaggiunte.IdAggiunta GROUP BY cibo.idCibo";
    con.query(query, (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        let i = 0;
        for (; i < rows.length; i++) {
          if (rows[i].PossibiliAggiunte !== null) {
            let aggiunte = [];
            rows[i].PossibiliAggiunte.split("|").forEach((aggiunta) => {
              aggiunte.push(JSON.parse(aggiunta));
            });
            rows[i].PossibiliAggiunte = aggiunte;
          } else rows[i].PossibiliAggiunte = null;
        }
        if (i === rows.length) resolve(rows);
      } else {
        reject();
      }
    });
  });
};
const getBevande = () => {
  return new Promise(function (resolve, reject) {
    con.query("SELECT * FROM `bevanda`", (err, righe) => {
      if (err) reject("Errore nella ricerca della bevanda");
      if (righe.length > 0) {
        resolve(righe);
      } else {
        reject("nessuna pizza trovata");
      }
    });
  });
};
const getPizze = (res) => {
  return new Promise(function (resolve, reject) {
    con.query(
      "SELECT idPizza,NomePizza,GROUP_CONCAT(NomeIngrediente) as Ingredienti,NomeCategoria,Prezzo from pizza NATURAL JOIN pizzaingrediente NATURAL JOIN ingrediente left JOIN CategoriaPizza on pizza.CategoriaPizza = CategoriaPizza.IdCategoriaPizza group by idPizza",
      (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
          resolve(rows);
        } else {
          reject("nessuna pizza trovata");
        }
      }
    );
  });
};

const getIngredientiAggiunta = (res) => {
  return new Promise(function (resolve, reject) {
    con.query("SELECT * from ingredienteaggiungipizza", (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        resolve(rows);
      } else {
        reject("nessun ingrediente Aggiunte pizza trovato");
      }
    });
  });
};

const InsertOrdine = (req) => {
  con.query(
    "SELECT IFNULL(MAX(IDOrdine),0) as IdOrdine FROM ordine",
    (err, rows) => {
      if (err) throw new Error("Errore nella comunicazione col db");
      else {
        let ordine = rows[0].IdOrdine + 1;
        con.query(
          "INSERT INTO ordine(IdOrdine,Stato) VALUES (" +
            mysql.escape(ordine) +
            ", 0)",
          (err, rows) => {
            if (err) throw new Error("Errore nella comunicazione col db");
            else {
              con.query(
                "INSERT INTO tavoloordine(IdTavolo,IdOrdine,IdTavoloOrdine) VALUES(" +
                  mysql.escape(req.body.tavolo) +
                  "," +
                  mysql.escape(ordine) +
                  ",NULL)",
                (err, rows) => {
                  if (err) throw new Error("Errore nella comunicazione col db");
                  else {
                    if (req.body.pizze.length > 0)
                      InsertPizza(ordine, req.body.pizze);
                    if (req.body.cibo.length > 0)
                      InsertCibo(ordine, req.body.cibo);
                    if (req.body.bevande.length > 0)
                      InsertBevande(ordine, req.body.bevande);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};
const InsertBevande = (ordine, listaBevande) => {
  
  listaBevande.forEach((bevanda) => {
    let query = "(" + ordine + "," + bevanda.id + "," + bevanda.quantita + ")";

    con.query(
      "INSERT INTO ordineBevanda(IdOrdine,IdBevanda,quantita) VALUES" + query,
      (err, rows) => {
        if (err) { 
          console.log(err);
          throw new Error("Errore nella comunicazione col db");
        }
      }
    );
  });
};
//SELECT * from tavoloordine LEFT JOIN ordine on tavoloordine.IdOrdine=ordine.IdOrdine RIGHT JOIN ordinebevanda on ordinebevanda.IdOrdine = ordine.IdOrdine LEFT  JOIN bevanda on ordinebevanda.IdBevanda = bevanda.IdBevanda
const InsertCibo = (numeroOrdine, listaCibo) => {
  //Inserire Ordine

  for (let i = 0; i < listaCibo.length; i++) {
    let ordineCibo = listaCibo[i];

    let note = "";
    for (let j = 0; j < ordineCibo.ingredientiRimossi.length; j++) {
      if (j + 1 === ordineCibo.ingredientiRimossi.length)
        note = note.concat(ordineCibo.ingredientiRimossi[j]);
      else note = note.concat(ordineCibo.ingredientiRimossi[j] + ",");
    }
    con.query(
      "INSERT INTO ordinecibo(IdCibo,IdOrdine,Prezzo,Note,Quantita) VALUES(" +
        mysql.escape(ordineCibo.idCibo) +
        " ," +
        numeroOrdine +
        " ," +
        parseFloat(ordineCibo.prezzoCibo).toFixed(2) +
        (note !== ""
          ? "," +
            mysql.escape(note) +
            ", " +
            mysql.escape(ordineCibo.quantita) +
            ")"
          : ",NULL," + mysql.escape(ordineCibo.quantita) + ")"),
      (err, rows) => {
        if (err) {
          console.log(err);
          throw new Error("Errore nella comunicazione col db");
        }
        ordineCibo.ingredientiExtra.forEach((ingredienteExtra) => {
          con.query(
            "INSERT INTO ordineciboaggiunta(IDCibo,IDAggiunta,IdOrdineCibo) VALUES(" +
              ordineCibo.idCibo +
              "," +
              ingredienteExtra.id +
              "," +
              rows.insertId +
              ")",
            (err, rows) => {
              if (err) {
                console.log(err);
                throw new Error("Errore inserimento aggiunta dell'ordine");
              }
            }
          );
        });
      }
    );
  }
};

//Inserire Tavolo Aggiunta

const InsertPizza = (numeroOrdine, listaPizze) => {
  for (let i = 0; i < listaPizze.length; i++) {
    let ordineCibo = listaPizze[i];

    let note = "";
    for (let j = 0; j < ordineCibo.ingredientiRimossi.length; j++) {
      if (j + 1 === ordineCibo.ingredientiRimossi.length)
        note = note.concat(ordineCibo.ingredientiRimossi[j]);
      else note = note.concat(ordineCibo.ingredientiRimossi[j] + ", ");
    }
    con.query(
      "INSERT INTO ordinepizza(IdOrdine,IdPizza,Note,Prezzo,Quantita) VALUES(" +
        numeroOrdine +
        "," +
        mysql.escape(ordineCibo.idPizza) +
        (note !== ""
          ? "," +
            mysql.escape(note) +
            ", " +
            ordineCibo.prezzo +
            "," +
            mysql.escape(ordineCibo.quantita) +
            ")"
          : ",NULL," +
            ordineCibo.prezzo +
            "," +
            mysql.escape(ordineCibo.quantita) +
            ")"),
      (err, rows) => {
        if (err) console.log(err);
        else {
          for (let u = 0; u < ordineCibo.ingredientiExtra.length; u++) {
            con.query(
              "INSERT INTO pizzaaggiunta(IdPizza,IdIngrediente,IdOrdinePizza) VALUES(" +
                ordineCibo.idPizza +
                "," +
                mysql.escape(ordineCibo.ingredientiExtra[u].id) +
                "," +
                rows.insertId +
                ")",
              (err, rows) => {
                if (err) console.log(err);
                else console.log("Pizze inserite");
              }
            );
          }
        }
      }
    );
  }
};

const AsyncgetOrdini = function () {
  return new Promise(function (resolve, reject) {
    con.query(
      "SELECT IdTavolo,orarioInviato FROM `tavoloordine` NATURAL JOIN ordine where stato=0 GROUP by IdTavolo",
      (err, righe) => {
        if (righe.length > 0) {
          var ordini = [];
          let lastID = righe.length;

          for (let i = 0; i < righe.length; i++) {
            let orarioInviato = righe[i].orarioInviato;
            let numeroTavolo = righe[i].IdTavolo;

            let dato = {
              NumeroTavolo: numeroTavolo,
              orarioInviato: orarioInviato,
              cibi: [],
              pizze: [],
              bevande:[]
            };
            con.query(
                `SELECT tavoloordine.IdOrdine,ordinepizza.IdOrdinePizza,pizza.idPizza,pizza.NomePizza,pizza.Prezzo+IFNULL(Sum(ingredienteaggiungipizza.Prezzo),0) as Prezzo,ordinepizza.Note as Rimossi,GROUP_CONCAT(ingredienteaggiungipizza.NomeIngrediente SEPARATOR ",") as Aggiunte, Sum(DISTINCT ordinepizza.Quantita) as Quantita FROM ordine RIGHT JOIN ordinepizza on ordinepizza.IdOrdine=ordine.IdOrdine  LEFT JOIN tavoloordine on ordine.IdOrdine = tavoloordine.IdOrdine  left JOIN pizza on pizza.idPizza = ordinepizza.IdPizza LEFT JOIN pizzaaggiunta on pizzaaggiunta.IdOrdinePizza = ordinepizza.IdOrdinePizza LEFT JOIN ingredienteaggiungipizza on ingredienteaggiungipizza.IdIngrediente = pizzaaggiunta.IdIngrediente where Stato=0 and tavoloordine.IdTavolo= `+mysql.escape(numeroTavolo)+ " GROUP by ordinepizza.IdPizza ,RImossi,pizzaaggiunta.IdOrdinePizza",
              (err, result) => {
                if (err) {
                  console.log(err);
                  reject("Errore nella selezione degli elementi");
                } else {
                  if (result.length > 0) dato.pizze = result;
                  con.query(
                    "SELECT tavoloordine.IdOrdine,cibo.IdCibo,Ordine.IdOrdine,quantita as Quantita,cibo.nomeCibo,ordinecibo.Note as Rimossi,categoria.Nome,ordinecibo.Fatto from tavoloordine LEFT JOIN ordine on tavoloordine.IdOrdine=ordine.IdOrdine LEFT JOIN ordinecibo on ordinecibo.IdOrdine=tavoloordine.IdOrdine  NATURAL JOIN cibo  LEFT JOIN categoria on cibo.Categoria=categoria.ID  where stato=0 and tavoloordine.IdTavolo=" +
                      mysql.escape(numeroTavolo) +
                      " ORDER by cibo.Categoria",
                    (err, resultCibo) => {
                      if (err) {
                        console.log(err);
                        reject("Errore nella selezione degli elementi");
                      } else {
                        if (resultCibo.length >= 0) dato.cibi = resultCibo;
                        con.query(
                            "SELECT tavoloordine.IdOrdine,bevanda.IdBevanda,Nome,Sum(ordinebevanda.quantita) as Quantita, prezzo from tavoloordine LEFT JOIN ordine on tavoloordine.IdOrdine=ordine.IdOrdine RIGHT JOIN ordinebevanda on ordinebevanda.IdOrdine = ordine.IdOrdine LEFT  JOIN bevanda on ordinebevanda.IdBevanda = bevanda.IdBevanda where stato=0 and IdTavolo= "+
                            mysql.escape(numeroTavolo) + "  GROUP By (IdBevanda)",
                          (err, resultBevande) => {
                            if (err) {
                              console.log(err);
                              reject("Errore nella selezione degli elementi");
                            } else {
                              
                              if (resultBevande.length >= 0)
                                dato.bevande = resultBevande;

                              ordini.push(dato);

                            }
                            if (ordini.length === lastID) {
                              resolve(ordini);
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        } else {
          reject("Errore nella selezione degli elementi");
        }
      }
    );
  });
};
const updateState = (req) => {
  let tavolo = req.body.tavolo;
  let flag = 200;
  con.query(
    "Select IdOrdine from tavoloordine natural join Ordine where IdTavolo=" +
      mysql.escape(tavolo),
    (err, rows) => {
      if (rows.length > 0) {
        rows.forEach((row) => {
          con.query(
            "Update Ordine Set Stato=1 where IdOrdine=" +
              mysql.escape(row.IdOrdine),
            (err, righe) => {
              if (err) {
                console.log(err);
                flag = 500;
              }
            }
          );
        });
      }
    }
  );
  return flag;
};

checkUser = function (username) {
  return new Promise(function (resolve, reject) {
    con.query(
      "Select Password,Ruolo from persona where Username=" +
        mysql.escape(username),
      (err, rows) => {
        if (rows.length == 1) {
          resolve({ passw: rows[0].Password, ruolo: rows[0].Ruolo });
        } else reject(new Error("Riga non trovata"));
      }
    );
  });
};
exports.con = con;
exports.getCibo = getCibo;
exports.getPizze = getPizze;
exports.getIngredientiAggiunta = getIngredientiAggiunta;
exports.getBevande = getBevande;
exports.InsertOrdine = InsertOrdine;
exports.ComandaCompletata = updateState;
exports.checkUser = checkUser;
exports.AsyncgetOrdini = AsyncgetOrdini;
/*SELECT * FROM ordinecibo RIGHT JOIN ordine on ordinecibo.IdOrdine = ordine.IdOrdine LEFT JOIN ordinepizza on ordinepizza.IdOrdine=ordine.IdOrdine LEFT JOIN tavoloordine on ordine.IdOrdine = tavoloordine.IdOrdine
SELECT Ordine.IdOrdine,tavoloordine.IdTavolo,pizza.NomePizza,cibo.nomeCibo,ordinecibo.Prezzo,ordinepizza.Prezzo,ordinecibo.Prezzo+IFNULL(ordinepizza.Prezzo,0) FROM ordinecibo RIGHT JOIN ordine on ordinecibo.IdOrdine = ordine.IdOrdine LEFT JOIN ordinepizza on ordinepizza.IdOrdine=ordine.IdOrdine LEFT JOIN tavoloordine on ordine.IdOrdine = tavoloordine.IdOrdine left JOIN cibo on cibo.IdCibo = ordinecibo.IdCibo left JOIN pizza on pizza.idPizza = ordinepizza.IdPizza ORDER by Ordine.IdOrdine*/
/*SELECT Ordine.IdOrdine,pizza.NomePizza,pizza.Prezzo+IFNULL(Sum(ingredienteaggiungipizza.Prezzo),0) as Prezzo,tavoloordine.IdTavolo,GROUP_CONCAT(ingredienteaggiungipizza.NomeIngrediente SEPARATOR ",") as Aggiunte,ordinepizza.Note as Rimossi
FROM ordine left JOIN ordinepizza on ordinepizza.IdOrdine=ordine.IdOrdine  LEFT JOIN tavoloordine on ordine.IdOrdine = tavoloordine.IdOrdine  left JOIN pizza on pizza.idPizza = ordinepizza.IdPizza LEFT JOIN pizzaaggiunta on pizzaaggiunta.IdOrdinePizza = ordinepizza.IdOrdinePizza LEFT JOIN ingredienteaggiungipizza on ingredienteaggiungipizza.IdIngrediente = pizzaaggiunta.IdIngrediente GROUP by ordinepizza.IdOrdinePizza
SELECT Ordine.IdOrdine,tavoloordine.IdTavolo,cibo.nomeCibo,ordinecibo.Prezzo,ordinecibo.Note FROM ordinecibo RIGHT JOIN ordine on ordinecibo.IdOrdine = ordine.IdOrdine LEFT JOIN tavoloordine on ordine.IdOrdine = tavoloordine.IdOrdine left JOIN cibo on cibo.IdCibo = ordinecibo.IdCibo  ORDER by Ordine.IdOrdine*/
/* con.query(
    "SELECT IdTavolo FROM `tavoloordine` NATURAL JOIN ordine where stato=0 GROUP by IdTavolo",
    (err, righe) => {
      var ordini = [];
      let lastID=righe.length;
     
      for (let i = 0; i < righe.length; i++) {
        let IdOrdine = righe[i].IdOrdine;
        let IdOrders= [];
        let numeroTavolo = righe[i].IdTavolo;
        let k=0;
        let dato = {
          
          NumeroTavolo: numeroTavolo,
          ordini:[]
        };
        con.query(
          "SELECT tavoloordine.IdOrdine,tavoloordine.IdTavolo,pizza.idPizza,pizza.NomePizza,pizza.Prezzo+IFNULL(Sum(ingredienteaggiungipizza.Prezzo),0) as Prezzo,GROUP_CONCAT(ingredienteaggiungipizza.NomeIngrediente SEPARATOR ',') as Aggiunte,ordinepizza.Note as Rimossi FROM ordine left JOIN ordinepizza on ordinepizza.IdOrdine=ordine.IdOrdine  LEFT JOIN tavoloordine on ordine.IdOrdine = tavoloordine.IdOrdine  left JOIN pizza on pizza.idPizza = ordinepizza.IdPizza LEFT JOIN pizzaaggiunta on pizzaaggiunta.IdOrdinePizza = ordinepizza.IdOrdinePizza LEFT JOIN ingredienteaggiungipizza on ingredienteaggiungipizza.IdIngrediente = pizzaaggiunta.IdIngrediente where tavoloordine.IdTavolo=" +
            mysql.escape(numeroTavolo) +
            " GROUP by ordinepizza.IdOrdinePizza",
          (err, result) => {
            if (err) throw new Error("Errore nella selezione degli elementi");
            else {
              if (result.length > 0) {
               
                let pizze = result;
                for(let j=0;j<pizze.length;j++){
                  
                  if(!IdOrders.includes(pizze[j].IdOrdine))
                  { 
                    IdOrders[k++]=pizze[j].IdOrdine;
                    console.log(IdOrders);
                  }
                }
                con.query(
                  "SELECT tavoloordine.IdOrdine,cibo.IdCibo,Ordine.IdOrdine,cibo.nomeCibo,ordinecibo.Note,categoria.Nome,ordinecibo.Fatto from tavoloordine LEFT JOIN ordine on tavoloordine.IdOrdine=ordine.IdOrdine LEFT JOIN ordinecibo on ordinecibo.IdOrdine=tavoloordine.IdOrdine  NATURAL JOIN cibo  LEFT JOIN categoria on cibo.Categoria=categoria.ID  where tavoloordine.IdTavolo="+
                    mysql.escape(numeroTavolo) +
                    " ORDER by cibo.Categoria",
                  (err, resultCibo) => {
                    if (err)
                      throw new Error("Errore nella selezione degli elementi");
                    else {
                      if (resultCibo.length >= 0) {
                       
                        
                        let ordine;
                        
                        for(let j=0;j<resultCibo.length;j++){
                          if(!IdOrders.includes(resultCibo[j].IdOrdine))
                          {
                            IdOrders[k++]=resultCibo[j].IdOrdine;
                            
                          }
                        }
                       
                        for(let j=0;j<IdOrders.length;j++){
                          
                          dato.ordini.push({idOrdine:IdOrders[j],cibi:resultCibo.filter((cibo)=>(IdOrders[j]===cibo.IdOrdine)),pizze:pizze.filter((pizza)=>pizza.IdOrdine===IdOrders[j])})
                        }
                       ordini.push(dato);
                        
                       if(ordini.length===lastID ){
                       
                        res.json(ordini);
                       }
                      }
                     
                    }
                  }
                );
              }
            }
          }
        );
      }
      
    
    }
  );
SELECT  tavoloordine.IdOrdine,ordinepizza.IdOrdinePizza,pizza.idPizza,pizza.NomePizza,pizza.Prezzo+IFNULL(Sum(ingredienteaggiungipizza.Prezzo),0) as Prezzo,ordinepizza.Note as Rimossi,GROUP_CONCAT(ingredienteaggiungipizza.NomeIngrediente SEPARATOR ',') as Aggiunte, Sum(DISTINCT ordinepizza.Quantita) as Quantita FROM ordine RIGHT JOIN ordinepizza on ordinepizza.IdOrdine=ordine.IdOrdine  LEFT JOIN tavoloordine on ordine.IdOrdine = tavoloordine.IdOrdine  left JOIN pizza on pizza.idPizza = ordinepizza.IdPizza LEFT JOIN pizzaaggiunta on pizzaaggiunta.IdOrdinePizza = ordinepizza.IdOrdinePizza LEFT JOIN ingredienteaggiungipizza on ingredienteaggiungipizza.IdIngrediente = pizzaaggiunta.IdIngrediente where Stato=0 and tavoloordine.IdTavolo= 11 GROUP by ordinepizza.IdPizza ,RImossi,pizzaaggiunta.IdOrdinePizza};*/
