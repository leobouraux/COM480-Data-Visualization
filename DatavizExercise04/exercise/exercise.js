


/*
	Run the action when we are sure the DOM has been loaded
	https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
	Example:
	whenDocumentLoaded(() => {
		console.log('loaded!');
		document.getElementById('some-element');
	});
*/

const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25, 16];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

//const MARGIN = { top: 10, right: 10, bottom: 10, left: 10 };


/** Scatter plot */

class ScatterPlot {
	/* your code here */
	constructor(container_str, data) {
		// not needed with D3
		//this.container = document.getElementById('weather-part2');
		this.svg = d3.select("#"+ container_str); //todo
		this.data = data;

		console.log(this.data[0].x);

		let data_x_max = d3.max(data, d => d.x);
		let data_y_max = d3.max(data, d => d.y);

		console.log('maxY='+data_y_max);

		this.plot_area = this.svg.append('g')
			.attr('x', 10)
			.attr('y', 10);

		this.plot_area.append('rect')
			.classed('plot-background', true)
			.attr('width', 200)
			.attr('height', 100);

		this.plot_area.selectAll("circle")
			.data(data)
			.enter().append("circle")
			.attr("cx", d => {
				return d3.scaleLinear()
					.domain([d3.min(data, d => d.x), data_x_max])
					.range([0, 200])(d.x);})
			.attr("cy", d => {
				return d3.scaleLinear()
					.domain([0, data_y_max])
					.range([100, 0])(d.y);})
			.attr("r", 1.5)
			.classed('cold', d => d.y <= 17)
			.classed('warm', d => d.y >= 23);

		this.svg.append('g')
			.selectAll('text')
			.data(data)
			.enter().append('text')
			.text( d => d.name )
			.attr('x', d => {
				return d3.scaleLinear()
					.domain([d3.min(data, d => d.x), data_x_max])
					.range([0, 200])(d.x);})
			.attr('y', 109);

		let ys = []
		for (let i = 0; i < 6 ; i++) {
			ys.push(d3.format(".1f")(i*data_y_max/5));
		}
		this.svg.append('g')
			.selectAll('text')
			.data(ys)
			.enter().append('text')
			.text( d => d)
			.attr('y', d => {
				return d3.scaleLinear()
					.domain([0, data_y_max])
					.range([100, 0])(d);})
			.attr('x', -5);
	}




}

whenDocumentLoaded(() => {

	/** Preparing the data */

	let data = TEST_TEMPERATURES.map((temp, index) => {
		return {'x': index, 'y': temp, 'name': DAYS[index%7] }
	});

	console.log("jijij")
	console.log(data);
	const plot = new ScatterPlot('plot', data);
});

