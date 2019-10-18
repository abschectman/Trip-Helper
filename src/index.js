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
let arr = []
let start = "USD"
window.addEventListener("DOMContentLoaded", () => {
  const display = async (destObject, start) => {
 var response = await fetch(`https://api.ratesapi.io/api/latest?base=${start}`);
 var myJson = await response.json();
 let countryData = data;
 Object.keys(data).forEach(c => {
   data[c] = myJson.rates[destination[c]]
 })
 if(destObject[1]){
   countryData[destObject[0]] = myJson.rates[destObject[1]];
    data[destObject[0]] = myJson.rates[destObject[1]];
  } else if(destObject[1] === null) {
      delete countryData[destObject[0]];
      delete data[destObject[0]];
    } else if (Object.keys(data).length !== 0){
      countryData = data
    } else {
      let holder = {}
   let keys = Object.keys(destination)
   for (let i = 0; i < keys.length; i++) {
     holder[keys[i]] = myJson.rates[destination[keys[i]]]   
   }
    countryData = holder
    }
  console.log(myJson);
  console.log(response);
  renderChart(countryData, origin);
  
    };

    renderMap();
    display(destination, start)

    d3.selectAll("select")
    .on("change", function(){
      d3.select(this)
      start = destination[this.selectedOptions[0].value];
        display(data, destination[this.selectedOptions[0].value])
      
    })


    d3.selectAll(".destination")
    .on("change", function(){
      d3.select(this)
      let dest;
      if (this.checked){
        dest = [this.name, destination[this.name]]
        this.id === "eur"
          ? arr = arr.concat([616, 250, 300, 276, 352, 380, 756, 578, 528])
          : arr.push(parseInt(this.id));
        
        renderMap(arr, true)
      } else {
        arr = arr.filter(id => id !== parseInt(this.id))
        renderMap(arr, false)
        dest = [this.name, null]

      }

      display(dest, start)
    });


   
})
  



