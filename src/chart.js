import * as d3 from "d3";

export const renderChart = (countryData, origin) => {
   const countries = Object.keys(countryData);
   const data = Object.values(countryData).map(v => v * 10);
   //  the size of the overall svg element
   var height = 450,
     width = 700,
     //  the width of each bar and the offset between each bar
     barWidth = 20,
     barOffset = 25;
   var x = d3
     .scaleLinear()
     .domain([d3.min(data), d3.max(data)])
     .range([50, 400]);

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
       return (i * (barWidth + barOffset) + barOffset);
     })
     .attr("y", function(data) {
       return height - x(data) - 28;
     });
   const scaleX = d3
     .scaleBand()
     .domain(countries)
     .range([12.5, 12.5 + (data.length * (barWidth + barOffset))]);

   background
     .append("g")
     .attr("transform", "translate(0, 420)")
     .call(d3.axisBottom(scaleX));
   
   var y_axis = d3.axisLeft().scale(x)


   background
     .append("g")
     .attr("transform", "translate(20, 0)")
     .call(y_axis);

}