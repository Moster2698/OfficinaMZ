

var pietanze = [];
async function PrendiPietanze() {
  try {
    const response = await fetch("http://192.168.178.20:3010/api/ristorazione/cibo", {
      method: "get",
      headers: {},
      mode: "cors",
    });
    const exam = await response.json();
    return exam;
  } catch (error) {
    console.log(error);
  }
}
var antipasti=[], primi=[], secondi=[], dolci=[];
async function prendi(){
    const pietanze = await PrendiPietanze();
    
        antipasti = pietanze.filter((pietanza) => pietanza.Nome === "Antipasto");
        primi = pietanze.filter((pietanza) => pietanza.Nome === "Primo");
        secondi = pietanze.filter((pietanza) => pietanza.Nome === "Secondo");
        dolci = pietanze.filter((pietanza) => pietanza.Nome === "Dessert");
     

}
prendi();


export { antipasti, primi, secondi, dolci };
