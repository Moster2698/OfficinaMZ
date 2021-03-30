const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());
const MiddleWare = require("./Middleware/InsertsErrorHandling.js");
const ConnessioneDatabase = require("./database/database.js");
const server = require("http").createServer(app);
app.use("/api", require("./api"));
const verifyJWT = (req, res, next) => {
  let token = req.headers["x-access-token"];
  let refreshToken = req.headers["x-refresh-token"];
  if (!token || !refreshToken) {
    res.send("No");
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        //Prendo il timeOut dell Jwt se é minore significa che sono passati i 10 min
        let decodedToken = jwt.decode(token);
        if (Date.now() >= decodedToken.exp * 1000) {
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
              if (err) {
                res.json({ auth: false });
              } else {
                let token = jwt.sign(
                  decodedToken,
                  process.env.ACCESS_TOKEN_SECRET
                );
                res.json({ log: true, token: token });
              }
            }
          );
        }
      } else {
        next();
      }
    });
  }
};
app.post("/isAuth", verifyJWT, (req, res) => {
  res.json({ auth: true });
});
process.on("uncaughtException", function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});
app.post("/login", (req, res) => {
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
              { refresh: "sium" },
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

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});
server.listen("3010", () => {});
