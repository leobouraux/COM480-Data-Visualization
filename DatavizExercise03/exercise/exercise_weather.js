
/*
	Run the action when we are sure the DOM has been loaded
	https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
	Example:
	whenDocumentLoaded(() => {
		console.log('loaded!');
		document.getElementById('some-element');
	});
*/
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}


const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25,16];

// Part 1 - DOM

let showTemperatures = (container_element, temperature_array) => {
	container_element.innerHTML = "";

	for (var temp of temperature_array) {
		// create a new div element
		let newP = document.createElement("p");
		// and give it some content
		newP.textContent = temp.toString();
		// add the text node to the container element
		if(temp >= 23) {
			newP.classList.add('warm');
		} if(temp < 18){
			newP.classList.add('cold');
		}
		container_element.appendChild(newP);
	}
}


whenDocumentLoaded(() => {
	// Part 1.1: Find the button + on click event
	const btn = document.getElementById("btn-part1");
	btn.addEventListener("click", () => {
		console.log("The button was clicked");
	});

	// Part 1.2: Write temperatures
	const div_output = document.getElementById('weather-part1');

	btn.addEventListener('click', () => {
		showTemperatures(div_output, TEST_TEMPERATURES);
	});
});

// Part 2 - class : ici on créer une classe et au lieu de direct appeler showTemperature dans le listener,
// on appelle l'instance de la classe créée

class Forecast {
	constructor(container) {
		this.container=container;
		this.temperatures= [1,2,3,4,5,6,7];
	}

	toString = () => {
		return 'Forecast(temp=' + this.temperatures.toString() + ', container=' + this.container.toString() + ')';
	}

	print = () => {
		console.log(this.toString());
	}

	show = () => {
		this.container.innerHTML = "";

		for (const temp of this.temperatures) {
			// create a new div element
			let newP = document.createElement("p");
			// and give it some content
			newP.textContent = temp.toString();
			// add the text node to the container element
			if(temp >= 23) {
				newP.classList.add('warm');
			} if(temp < 18){
				newP.classList.add('cold');
			}
			this.container.appendChild(newP);
		}
	}

	reload = () => {
		this.temperatures = TEST_TEMPERATURES;
		this.show();
	}

}

whenDocumentLoaded(() => {
	const btn = document.getElementById('btn-part1');

	// Part 2: class
	const div_out2 = document.getElementById('weather-part2');
	const forecast2 = new Forecast(div_out2);
	forecast2.print();

	btn.addEventListener("click", () => {
		forecast2.reload();
	});
});



// Part 3 - fetch

const QUERY_LAUSANNE = 'http://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Lausanne") and u="c"';

function yahooToTemperatures(data) {
}

class ForecastOnline extends Forecast {
}

// Part 4 - interactive
