import React from "react";
import { useState, useEffect } from "react";
function Header() {
  const [soldi,SetSoldi] = useState();
  useEffect(() => {
    fetch("http://localhost/Pizzeria%20Backend/Php/get_soldi_header.php", {
      method: "POST",
      headers: {},
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        SetSoldi(result);
      });
  }, []);

  return (
     <>
          <p>{soldi}</p>
      </>
  )
}
export default Header;