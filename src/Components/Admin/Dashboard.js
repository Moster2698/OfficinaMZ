import React from "react";
import Navbar from "./Navbar";
import Panel from "./Panel";
import Chart from "./Chart";
function DashBoard(){

    return(
        <div>
            <Navbar/>
            <Panel/>
            <Chart/>
        </div>
    )
}
export default DashBoard;