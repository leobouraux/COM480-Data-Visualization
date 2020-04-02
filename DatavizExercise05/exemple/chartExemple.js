/*
https://observablehq.com/@d3/focus-context
*/

//link html element
const chartDiv = document.getElementById("chart-container");

//variables
const width_tot = chartDiv.clientWidth * 0.95;
const height_tot = chartDiv.clientHeight * 0.5;

let margin_graph = {top: 10, right: 10, bottom: 100, left: 40},
    margin_cursor = {top: 450, right: 10, bottom: 20, left: 40},
    width = width_tot - margin_graph.left - margin_graph.right,
    height_graph = height_tot - margin_graph.top - margin_graph.bottom,
    height_cursor = height_tot + 20 - margin_cursor.top - margin_cursor.bottom;

//create svg on html element
let svg = d3.select("#chart-container").append("svg")
    .attr("width", width + margin_graph.left + margin_graph.right)
    .attr("height", height_graph + margin_graph.top + margin_graph.bottom);

// fait en sorte que le graphe ne se taille pas à aihe ou a droite de l'axe des ordonnées
svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height_graph);

let focus_main = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin_graph.left + "," + margin_graph.top + ")");

let focus_curs = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin_cursor.left + "," + margin_cursor.top + ")");

//load csv
d3.csv("totaltopics.csv", type, createChart);

//function of the csv loading
function type(d) {
    d.date = parseDate(d.date);
    //d.date = +d.date;
    d.caseid = +d.caseId;
    return d;
}

//function of the csv loading
function createChart(error, data) {
    console.log(data);
    x_graph.domain(d3.extent(data.map(function(d) { return d.date; })));
    y_graph.domain([0, d3.max(data.map(function(d) { return d.caseid; }))]);
    x_cursor.domain(x_graph.domain());
    y_cursor.domain(y_graph.domain());

    //display data on the big graph
    focus_main.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    //display values on x axis
    focus_main.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height_graph + ")")
        .call(xAxis);

    //display values on y axis
    focus_main.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    //display data on cursor
    focus_curs.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area2);

    //display values on x axis mais du coup pas de values
    focus_curs.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height_cursor + ")")
        .call(xAxis2);

    //display the brush
    focus_curs.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", height_cursor + 7);
}

let parseDate = d3.time.format("%Y").parse;

let x_graph = d3.time.scale().range([0, width]),
    x_cursor = d3.time.scale().range([0, width]),
    y_graph = d3.scale.linear().range([height_graph, 0]),
    y_cursor = d3.scale.linear().range([height_cursor, 0]);

let xAxis = d3.svg.axis().scale(x_graph).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x_cursor).orient("bottom"),
    yAxis = d3.svg.axis().scale(y_graph).orient("left");

let area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x_graph(d.date); })
    .y0(height_graph)
    .y1(function(d) { return y_graph(d.caseid); });

let area2 = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x_cursor(d.date); })
    .y0(height_cursor)
    .y1(function(d) { return y_cursor(d.caseid); });

let brush = d3.svg.brush()
    .x(x_cursor)
    .on("brush", brushed);

function brushed() {
    if(brush.empty()){
        x_graph.domain(x_cursor.domain());
    } else x_graph.domain(brush.extent());
    focus_main.select(".area").attr("d", area);
}


