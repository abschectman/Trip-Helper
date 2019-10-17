import axios from "axios";
import * as d3 from "d3"
import {renderMap} from "../src/map"
import {renderChart} from "./chart"
// let map = am4core.create("chartdiv", am4maps.MapChart);
// map.geodata = am4geodata_worldLow;
const destination = {
  "England": "GBP",
  "Hong Kong": "HKD",
  "India": "INR",
  "Israel": "ILS",
  "Mexico": "MXN",
  "Thailand": "THB",
  "Europe": "EUR",
  "China": "CNY",
  "Phillipines": 'PHP',
  "Canada": "CAD",
  "United States": "USD",
  "Brazil": "BRL",
  "Japan": "JPY",
  "Russia": "RUB",
  "Turkey": "TRY"
}
const data = {};
window.addEventListener("DOMContentLoaded", () => {
  const display = async (destObject, orgObject) => {
 var response = await fetch("https://api.ratesapi.io/api/latest?base=USD");
 var myJson = await response.json();
 let countryData = data;
 if(destObject[0]){
    countryData[destObject[0]] = myJson.rates[destObject[1]]} else {
   let keys = Object.keys(destination)
   for (let i = 0; i < keys.length; i++) {
     countryData[keys[i]] = myJson.rates[destination[keys[i]]]   
   }
    }
  console.log(myJson);
  console.log(response);
  renderChart(countryData, origin);
  
    };
    renderMap();
    display(destination, origin)
    d3.selectAll(".destination")
    .on("change", function(){
      d3.select(this)
      let dest = [this.name, destination[this.name]]
      display(dest, origin)
    });
})
  



