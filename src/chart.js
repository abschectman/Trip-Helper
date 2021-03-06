import * as d3 from "d3";
import {destination} from "./start";

export const renderChart = (countryData, start) => {
  // resolving issue that api doest return a value for EUR when queried for EUR
  if(start === "EUR"){
    countryData["Europe"] = 1;
  }
   const countries = Object.keys(countryData);
   const data = Object.values(countryData);
 
   var height = 450,
     width = 750,
     barWidth = 20,
     barOffset = 32;
   var x = d3
     .scaleLog()
     .domain([d3.min(data), d3.max(data)])
     .range([15, 400]);
      
  var yScale = d3
        .scaleLog()
        .domain([d3.min(data), d3.max(data)])
        .range([400, 15]);
    
      d3.select("#bar-chart > svg").remove()


   const background = d3
     .select("#bar-chart")
     .append("svg")
     .attr("width", width)
     .attr("height", height)
   background
     .selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .style("fill", "#1DB954")
     .style("stroke", "#d6e9c6")
     .style("stroke-width", "5")
     .attr("width", barWidth)
     .attr("id", function(dat){
       let i = data.indexOf(dat)
       return countries[i]
     })
     .attr("height", function(data) {
       return x(data);
     })
     .attr("x", function(data, i) {
       return i * (barWidth + barOffset) + barOffset;
     })
     .attr("y", function(data) {
       return height - x(data) - 32;
     });
   const scaleX = d3
     .scaleBand()
     .domain(countries)
     .range([16, 16 + (data.length * (barWidth + barOffset))]);

   background
     .append("g")
     .attr("transform", "translate(0, 425)")
     .call(d3.axisBottom(scaleX));
   
   background
     .append("g")
     .attr("transform", "translate(25, 5)")
     .call(d3.axisLeft(yScale)
     .tickFormat(d => `${d}`)
     .ticks(2));

     d3.selectAll("rect")
     .on("mouseover", function(){
       let val = this.__data__.toString().slice(0,5)
       let count = destination[this.id];
     let p =  d3.select("#val")
      .append("p")
      p.text(`Conversion rate: 1 ${start} = ${val} ${count}`)
      p.attr("id", "val")
     

     })

     d3.selectAll("rect")
     .on("mouseleave", function(){

       d3.selectAll("p").remove();
     })

}