const express = require("express");
const router = express.Router();
const ConnessioneDatabase = require("../../database/database");
const MiddleWare = require("../../Middleware/InsertsErrorHandling.js");
router.post("/mostraOrdini",MiddleWare.VerificaAccessJWT, (req, res) => {
  //ConnessioneDatabase.getOrdini(res);
 
  ConnessioneDatabase.AsyncgetOrdini()
    .then(function (results) {
    
      if(req.body.lunghezza!==results.length)
      res.json(results);
      else
        res.json({LunghezzaUguale:"Si"})
    })
    .catch((err) => console.log(err));
});
module.exports = router;
