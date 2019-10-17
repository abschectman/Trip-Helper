import * as d3 from "d3";

export const renderChart = (countryData, origin) => {
   const countries = Object.keys(countryData);
   const data = Object.values(countryData).map(v => v * 10);
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

    d3.select("#bar-chart > svg").remove()


   const background = d3
     .select("#bar-chart")
     .append("svg")
     .attr("width", width)
     .attr("height", height)
     .style("background", "#dff0d8");
   background
     .selectAll("rect")
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
       return (i * (barWidth + barOffset)) + 40;
     })
     .attr("y", function(data) {
       return height - x(data) - 28;
     });
   const scaleX = d3
     .scaleBand()
     .domain(countries)
     .range([0, width]);

   background
     .append("g")
     .attr("transform", "translate(30, 420)")
     .call(d3.axisBottom(scaleX));
   var y = d3
     .scaleLog()
     .domain(0, 20000)
     .range([0, 400]);

   var y_axis = d3.axisLeft().scale(y);

   background
     .append("g")
     .attr("transform", "translate(30, 0)")
     .call(y_axis);

}