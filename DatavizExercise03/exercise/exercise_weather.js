
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
	};

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

	//Part 3

	const div_out3 = document.getElementById('weather-part3');
	const forecast3 = new ForecastOnline(div_out3);
	btn.addEventListener("click", () => {
		forecast3.reload();
	});





});

// Part 3 - fetch

const QUERY_LAUSANNE = 'http://api.weatherbit.io/v2.0/forecast/daily?city=Lausanne&days=7&key=ed330abe3f5a4104afd9a6ef10b707ca';

class ForecastOnline extends Forecast {
	/*reload = () => {
		this.temperatures = [2, 3, 4, 5, 6, 7, 8];
		this.show();
	}*/
	reload = () => {
		fetch(QUERY_LAUSANNE)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				//console.log('data', jsonToTemperatures(data));
				this.temperatures = jsonToTemperatures(data);
			})
			.then(() => {this.show()});
	}

}

function jsonToTemperatures(data) {
	let tab = [];
	for (const row of data['data']) {
		tab.push(row['temp'])
	}
	return tab;
}


// Part 4 - interactive
class ForecastOnlineCity extends ForecastOnline {

	setCity = (city) => {
		this.city = city;
	};

	reload = () => {
		const query = ('http://api.weatherbit.io/v2.0/forecast/daily?city='+ this.city + '&days=7&key=ed330abe3f5a4104afd9a6ef10b707ca');
		fetch(query)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				this.temperatures = jsonToTemperatures(data);
				this.city = data['city_name'];
			})
			.then(() => {
				this.show();
			});
	};

	show() {
		super.show();

		const elem_city_name = document.createElement('h4');
		elem_city_name.textContent = this.city;
		this.container.insertBefore(elem_city_name, this.container.children[0]);
	}
}




whenDocumentLoaded(() => {
	const city_query_input = document.getElementById('query-city');
	const btn_query = document.getElementById('btn-city');

	// Part 2: inheritance
	const forecast_city = new ForecastOnlineCity(document.getElementById('weather-city'));

	btn_query.addEventListener('click', () => {
		const new_city_name = city_query_input.value;
		console.log('Query =', new_city_name);

		forecast_city.setCity(new_city_name);
		forecast_city.reload();
	})
});



