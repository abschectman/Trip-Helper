import * as d3 from "d3";
import * as topojson from "topojson";
export function renderMap() {
  let config = {
    speed: 0.005,
    verticalTilt: 0,
    horizontalTilt: 0
  };
  var width = 460;
  var height = 300;


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
  svg
    .append("path")
    .datum({ type: "Sphere" })
    .attr("class", "water")
    .style("fill", "lightblue")
    .attr("d", path);
    var g = svg.append("g");
    var path = d3.geoPath().projection(projection);
    const countries = topojson.feature(world, world.objects.countries).features
      g.selectAll("path")
      .data(countries)
      .enter()
      .append("path")
      .attr("fill", "red")
      .attr("stroke", "#EDECF4")
      .attr("d", path)
      .style("fill", function(d) {
        return d;
      })
      .on("click", function(d) {
        rotateMe(d);
      });
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
    timer.stop();
  }
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
  rotateGlobe();
}