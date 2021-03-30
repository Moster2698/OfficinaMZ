const express = require("express");
const router = express.Router();
const MiddleWare = require("../../Middleware/InsertsErrorHandling.js");
const ConnessioneDatabase = require("../../database/database.js");


router.get("/ingredienti", MiddleWare.ControllaInputVuoto, (req, res) => {
  ConnessioneDatabase.getIngredienti(res)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error);
    });
});
router.get("/cibo", MiddleWare.ControllaInputVuoto, (req, res) => {
  ConnessioneDatabase.getCibo(res)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error);
    });
 
});
router.get("/pizze", MiddleWare.ControllaInputVuoto, (req, res) => {
  ConnessioneDatabase.getPizze(res)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error);
    });
});
router.get(
  "/ingredientiAggiunta",
  MiddleWare.ControllaInputVuoto,
  (req, res) => {
    ConnessioneDatabase.getIngredientiAggiunta(res)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
);


router.post(
  "/insert-ordine",
  MiddleWare.VerificaInputInsertOrdini,
  (req, res) => {
    ConnessioneDatabase.InsertOrdine(req);
    res.sendStatus(200); 
  }

  
);
router.post("/get-ordini", (req, res) => {
  //ConnessioneDatabase.getOrdini(res);
  ConnessioneDatabase.AsyncgetOrdini()
    .then(function (results) {
      res.json(results);
    })
    .catch((err) => console.log(err));
});
router.post("/update-state", (req, res) => {
  res.sendStatus(ConnessioneDatabase.ComandaCompletata(req));
});
router.get("/get-bevande",(req,res)=>{
  ConnessioneDatabase.getBevande().then(function(result){
    res.json(result);
  }).catch((err)=>console.log(err));
})
module.exports = router;
