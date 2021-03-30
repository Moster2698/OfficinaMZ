import React, { useContext, useState} from "react";
import { Redirect } from "react-router-dom";
import UserAuthContext from "../../Contexts/UserAuthContext";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setisAuth] = useContext(UserAuthContext);
  function formSubmit(e) {
    e.preventDefault();
    //if (username !== "" && password != "")
    inviaDati();
  }

  function inviaDati() {
    let dati = { username: username, password: password };
    fetch("http://127.0.0.1:3010/api/auth/login", {
      method: "Post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(dati),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.log) {
          localStorage.setItem("PizzaAccessToken", result.token);
          localStorage.setItem("PizzaRefreshToken", result.refreshToken);
          setisAuth(true);
        }
      });
  }

  return (
    <div className=" d-flex  justify-content-center align-items-center text-center min-vh-100">
      {!isAuth ? (
        <div
          className="card rounded-10 "
          style={{ width: "18rem", height: "25rem" }}
        >
          <div className="card-body m-auto">
            <form id="login" onSubmit={formSubmit}>
              <div className="form-group mt-5">
                <label className="mb-3" htmlFor="input_username">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="input_username"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label className="mb-3" htmlFor="input_password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="input_password"
                  placeholder="Password"
                />
              </div>
              <div className="form-check mt-3">
                <button>Invia</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Redirect to="/admin"/>
      )}
    </div>
  );
}
//
export default Login;
