import React from "react";
import Header from "./Header";
import Chart from "./Chart";
function Profile() {
  
  return (
    <div>
      <div className="charts">
        <div className="deck-info">
            <div className="box-info">
              <div className="box-header">
                <h3>Soldi fatturati oggi</h3>
              </div>
                <p>Soldi fatturati Oggi</p>
            </div>
            <div className="box-info">
                <p>Ordini effettuati</p>
                <Header />
            </div>
            <div className="box-info">
                <p>Nuovi clienti</p>
            </div>
            <div className="box-info">
                <p>Boh</p>
            </div>
        </div>
        <div className="canvas-strano">
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default Profile;
