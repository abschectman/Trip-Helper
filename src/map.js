import * as d3 from "d3";
import * as topojson from "topojson";
export function renderMap(arr = [], bool) {
  let config = {
    speed: 0.05,
    verticalTilt: 0,
    horizontalTilt: 0
  };
  var width = 460;
  var height = 300;

 d3.select("#map-holder > svg").remove();
  var projection = d3
    .geoOrthographic()
    .scale(100)
    .translate([width / 2.2, height / 1.5]);

  var svg = d3
    .select("#map-holder")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");
  // svg
  //   .append("path")
  //   .datum({ type: "Sphere" })
  //   .attr("class", "water")
  //   .style("fill", "lightblue")
  //   .attr("d", path);
    var g = svg.append("g");
    var path = d3.geoPath().projection(projection);
    let countries = topojson.feature(world, world.objects.countries).features
    let c = countries.filter(count => count.id === arr[arr.length - 1]);
     g
     .selectAll("path")
       .data(countries)
       .enter()
       .append("path")
       .attr("fill", function(c) {
        return arr.includes(c.id) ? "rgba(255, 40, 0, 0.49)" : "#1db9542e";
       })
       .attr("stroke", "#1DB954")
       .attr("d", path)
       .style("fill", function(d) {
        //  debugger
         return d;
       })
       .on("click", function(d) {
         debugger
         rotateMe(d);
       });
         
       

    // countries = countries.filter(count => !arr.includes(count.id))
    //   console.log("rendering red countries")
    //   g
    //   .selectAll("path")
    //   .data(countries)
    //   .enter()
    //   .append("path")
    //   .attr("fill", "red")
    //   .attr("stroke", "#EDECF4")
    //   .attr("d", path)
    //   .style("fill", function(d) {
    //     return d;
    //   })
    //   .on("click", function(d) {
    //     rotateMe(d);
    //   });


  let timer;
  function rotateGlobe() {
    timer = d3.timer(function(elapsed) {
      projection.rotate([
        config.speed * elapsed - 120,
        config.verticalTilt,
        config.horizontalTilt
      ]);
      svg.selectAll("path").attr("d", path);
    });
  }
  function stopGlobe() {
    if(timer){
    timer.stop();
  }}
  var rotateMe = function(d) {
    (function transition() {
      d3.transition()
        .duration(1250)
        .tween("rotate", function() {
          var p = d3.geoCentroid(d);
          var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
          return function(t) {
            projection.rotate(r(t));
            svg.selectAll("path").attr("d", path);
          };
        });
    })();
    stopGlobe();
  };

  if(!bool){
  rotateGlobe();
  } else{
     rotateMe(c[0]);
  }
}