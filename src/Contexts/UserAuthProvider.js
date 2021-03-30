import React from "react";
import { useState } from "react";
import UserAuthContext from "./UserAuthContext";
function UserAuthProvider(props) {
  const [isAuth,setisAuth] = useState(false);
  
  return (
    <UserAuthContext.Provider value={[isAuth,setisAuth]}>
      {props.children}
    </UserAuthContext.Provider>
  );
}
export default UserAuthProvider;
