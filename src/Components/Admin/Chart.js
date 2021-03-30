import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Chart() {
  const [mesiSoldi, SetmesiSoldi] = useState();

  useEffect(() => {
    fetch("http://localhost/Pizzeria%20Backend/Php/get_grafico.php", {
      method: "POST",
      headers: {},
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        SetmesiSoldi(result);
      });
  }, []);
  var mesi=Array(12), soldi=Array(12);
  if(mesiSoldi!==undefined){
    for (let i = 1; i < 13; i++){
        soldi[i-1]=mesiSoldi[i]["Prezzo"];
        mesi[i-1]=mesiSoldi[i]["Data"];
    };
}
  

  const data = {
    labels: mesi,
    datasets: [
      {
        label: "Fatturato al mese",
        data: soldi,
        fill: false,
        backgroundColor: "rgb(0,54,204)",
        borderColor: "rgba(255, 99, 132, 0.2)",
  
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Bar data={data}   options={options} />
    </>
  );
}

export default Chart;
