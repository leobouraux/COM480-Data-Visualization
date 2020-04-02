const data = [
    { "x": 10, "y": 15}, { "x": 13, "y": 20},
    { "x": 30, "y": 30}, { "x": 35, "y": 40},
    { "x": 40, "y": 20}, { "x": 80, "y": 70}];

const lineGenerator = d3.line().x(d => d.x).y(d => d.y);
const svgContainer = d3.select("body") .append("svg").attr("width", 200) .attr("height", 200);
const lineChart = svgContainer.append("path").attr("d", lineGenerator(data)).attr("stroke", "blue") .attr("stroke-width", 2) .attr("fill", "none");

let svg = d3.select("svg");
let data = [10, 20, 50, 100]; // new datapoint
let circles = svg.selectAll("circle").data(data);
circles.enter().append('circle')
    .transition() // tells d3 that we want a transition
    .duration(1000) // how long it's going to last
    .ease(d3.easeLinear) // how to interpolate values
    .attr('cx', (d, i) => 100 * (i+1))
    .attr('cy', (d, i) => 100 * (i+1))
    .attr('r', d => d) // 100
    .style("fill", "red");