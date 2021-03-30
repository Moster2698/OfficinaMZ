const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
var refreshTokens = [];
const ConnessioneDatabase = require("../../database/database");
const MiddleWare = require("../../Middleware/InsertsErrorHandling.js");
router.post("/login", (req, res) => {
  let passwUtente = req.body.password;
  ConnessioneDatabase.checkUser(req.body.username)
    .then(function (results) {
      let passwCifrata = results.passw;

      if (passwCifrata !== null) {
        bcrypt.compare(passwUtente, passwCifrata, function (err, result) {
          if (err) {
            throw err;
          }
          if (result) {
            let payload = { username: req.body.username, ruolo: results.ruolo };
            let accessToken = jwt.sign(
              payload,
              process.env.ACCESS_TOKEN_SECRET,
              {
                algorithm: "HS256",
                expiresIn: "10m",
              }
            );
            var refreshToken = jwt.sign(
              { username: req.body.username, ruolo: results.ruolo },
              process.env.REFRESH_TOKEN_SECRET,
              {
                algorithm: "HS256",
                expiresIn: "24h",
              }
            );
            refreshTokens.push(refreshToken);
            res.json({
              log: true,
              token: accessToken,
              refreshToken: refreshToken,
            });
          } else res.json({ log: false });
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});
router.post("/token", MiddleWare.VerificaRefreshJWT, (req, res) => {
  let refreshToken = req.headers["x-refresh-token"];
  let payload = jwt.decode(refreshToken);
  let accessToken = jwt.sign(
    { username: payload.username, ruolo: payload.ruolo },
    process.env.ACCESS_TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
  if (accessToken) {
    
    res.json({ "accessToken": accessToken });
  } else res.sendStatus(401);
});
module.exports = router;
