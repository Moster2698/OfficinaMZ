const ConnessioneDatabase = require("../database/database.js");
const mysql = require("mysql");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
function VerifyInputInsertOrdini(req, res, next) {
  if (
    req.body.tavolo !== undefined &&
    req.body.pizze !== undefined &&
    req.body.cibo !== undefined &&
    req.body.bevande !== undefined
  ) {
    let numeroTavolo = req.body.tavolo;
    try {
      ConnessioneDatabase.con.query(
        "SELECT * from tavolo where numero= " + mysql.escape(numeroTavolo),
        (err, rows) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
            throw new Error(
              "C'è stato un errore nella comunicazione col Database"
            );
          } else {
            if (rows.length > 0) next();
            else res.sendStatus(404);
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  } else res.sendStatus(400);
}
function CheckReqValues(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    next();
  } else {
    res.sendStatus(400);
  }
}
function VerifyJWT(req, res, next) {
  let token = req.headers["x-access-token"];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      if (decoded.ruolo == "Admin") next();
      else res.sendStatus(403);
    }
  });
}
function VerifyJWTRefresh(req, res, next) {
  let refreshToken = req.headers["x-refresh-token"];
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (decoded.ruolo == "Admin") next();
      else res.sendStatus(403);
    }
  });
}
exports.VerificaAccessJWT = VerifyJWT;
exports.VerificaRefreshJWT = VerifyJWTRefresh;
exports.VerificaInputInsertOrdini = VerifyInputInsertOrdini;
exports.ControllaInputVuoto = CheckReqValues;
