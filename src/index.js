import axios from "axios";
import * as d3 from "d3"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
// let map = am4core.create("chartdiv", am4maps.MapChart);
// map.geodata = am4geodata_worldLow;
const list = {
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

window.addEventListener("DOMContentLoaded", () => {
  (async () => {
 var response = await fetch("https://api.ratesapi.io/api/latest?base=USD");
 var myJson = await response.json();
  d3.select("#countries")
    .selectAll("option")
    .data(Object.keys(list))
    .enter()
    .append("option")
    .text(function(d) {
      return d;
    });
    d3.select("option").on("select", function() {
      d3.select("#app")
        .append("h3")
        .text(list[("option").text]);
    });
    const countries = Object.keys(list)
    const data = Object.values(myJson.rates).map(v => v * 10);
    //  the size of the overall svg element
    var height = 450,
      width = 2120,
      //  the width of each bar and the offset between each bar
      barWidth = 40,
      barOffset = 20;
      var x = d3
        .scaleLog()
        .domain([d3.min(data), d3.max(data)])
        .range([0, 400]);


   const background  =  d3.select("#bar-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "#dff0d8");
      background.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .style("fill", "#3c763d")
      .style("stroke", "#d6e9c6")
      .style("stroke-width", "5")
      .attr("width", barWidth)
      .attr("height", function(data) {
        return x(data);
      })
      .attr("x", function(data, i) {
        return i * (barWidth + barOffset);
      })
      .attr("y", function(data) {
        return height - x(data);
      });
       var scale = d3
         .scaleBand()
         .domain(countries)
         .range([0, width - 100]);

      background
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(scale));

    //  the size of the overall svg element
//     var height = 200,
//       width = 720,
//       //  the width of each bar and the offset between each bar
//       barWidth = 40,
//       barOffset = 20;
// debugger
//     d3.select("#bar-chart")
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .style("background", "#dff0d8")
//       .selectAll("rect")
//       .data(data)
//       .enter()
//       .append("rect")
//       .style({ fill: "#3c763d", stroke: "#d6e9c6", "stroke-width": "5" })
//       .attr("width", barWidth)
//       .attr("height", function(data) {
//         return data;
//       })
//       .attr("x", function(data, i) {
//         return i * (barWidth + barOffset);
//       })
//       .attr("y", function(data) {
//         return height - data;
//       });
    
    console.log(myJson);
    console.log(response);

    
    // d3.select("li")
    // .selectAll("ul")
    // .data(Object.values)
})();
//  const response = await fetch("https://api.ratesapi.io/api/latest?base=USD");
  
  

});

