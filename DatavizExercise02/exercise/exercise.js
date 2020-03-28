console.log("Test");
console.log("Constructor inheritance");
//Constructor inheritance
function Foo() {}
Foo.prototype.y = 11;
function Bar() {}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.z = 31;
const x = new Bar();
 // 42
console.log(x.y + x.z);

console.log("\nOLOO inheritance");
const FooObj = { y: 11 };
let BarObj = Object.create(FooObj);
BarObj.z = 31;
const X = Object.create(BarObj);
console.log(X.y + X.z); // 42

console.log("\nClass");
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  get area() {
    return this.calcArea();
  }
  calcArea() {
    return this.height * this.width;
  }
}
const square = new Rectangle(10, 10);
console.log(square.area);

console.log("\nInheritance");
class Cat {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}
class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
   }
}
const l = new Lion('Fuzzy');
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.


/*
## Functions and iteration
To implement:

* isEven(value)
* apply isEven on [1, 2, 3, 4, 5]
* filter [1, 2, 3, 4, 5] by isEven

*/
console.log("\nEx1");
let isEven = (n) => {return n%2==0}
let tab = [1, 2, 3, 4, 5].map(x => isEven(x))
console.log(tab);
let fin = [1, 2, 3, 4, 5].filter(x => isEven(x))
console.log(fin);

/*
### multiply
To implement:
* multiply, a function that accepts arbitrary number of parameters
* find a product of the following numbers: 1,2,3,4,5
* multiply(1,2,3,4,5) should return 120
*/

console.log("\nEx2");
let multiply = (...numbers) => {
  let product = 1;
  numbers.forEach(n => {
    product*=n;
  });
  return product;
}
console.log(multiply(1,2,3,4,5));


/*
## Closures

### divisibleBy
To implement:
* divisibleBy
* filter [0, 1, 2, 3, 4, 5, 6] by divisibleBy(3)
*/

console.log("\nEx3");
let divisibleBy = (divisor) => {
  return function(d){
    return d%divisor==0;
  }
}

let divisibleBy10 = divisibleBy(10);
console.log(divisibleBy10(59));
console.log(divisibleBy(10)(60));
console.log([0, 1, 2, 3, 4, 5, 6].filter(x => divisibleBy(3)(x)));


/*
### increment
To implement:
* increment
* initial value is 100, step size is 2
*/
console.log("\nEx4");
let increment = (initial) => {
  if (initial === undefined) {
    initial = 0
  }
  return function(incr) {
    if (incr === undefined) {
      incr = 1
    }
    return initial+incr;
  }
}

console.log(increment(100)());


/*
### colorCycle
To implement:
colorCycle(colors=COLOR_CYCLE_DEFAULT)
*/

console.log("\nEx5");


const COLOR_CYCLE_DEFAULT = ['red', 'green', 'magenta', 'blue'];

//let colorCycle = (tab=COLOR_CYCLE_DEFAULT) => {  }

 let colorCycle = (colors=COLOR_CYCLE_DEFAULT) => {
	let idx = -1;
	return function() {
		idx = (idx + 1) % colors.length;
		return colors[idx];
	}
}

const cc_r_g = colorCycle(['red', 'green']);

console.log(cc_r_g(), cc_r_g(), cc_r_g());
console.log("\n");

// This is a way to run 10 times, see the task about `range` below.
console.log('cycle red/green', Array.from(Array(10), cc_r_g));

const cc1 = colorCycle();
const cc2 = colorCycle();
console.log('cycle default', [cc1(), cc1(), cc2(), cc2(), cc1()]);

const my_cc = colorCycle(['purple', 'rgb(20, 230, 220)', 'rgb(10, 230, 20)', 'rgb(230, 20, 10)', 'black']);

///////////////////

//PROVIDED

///////////////////

//uncomment to color squares
showColorCycle(my_cc);

/*
## Range

To implement:
* range
* filter range(100) by divisibility by 13
*/

console.log("\nEx6");

let range = (n) => {
  let tab = []
  for (var i = 0; i < n; i++) {
    tab[i]=i
  }
  return tab;
}

console.log('range(10)', range(10));
// Expeceted result:
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(range(100).filter(x => divisibleBy(13)(x)));



/*
To implement:
* Implement a function `randomInRange(min_val=0, max_val=100)` which returns a random float value between `min_val` and `max_val`.

* Implement a function `randomArrayv` which generates an array of `N` random values between `min_val` and `max_val`.

*/
console.log("\nEx7");

function randomInRange(min_val=0, max_val=100){
  return Math.random() * (max_val - min_val) + min_val;
}

let randomArray = (N, min_val=0, max_val=100) => {
  let array = []
  for (var i = 0; i < N; i++) {
    array[i] = randomInRange(min_val, max_val);
  }
  return array;
}

console.log('randomArray', randomArray(5, 0, 10));

/*
## Counting

* Create a function `countOccurrences(string)` which counts the number of occurrences of each letter in a string.
	For example `countOccurrences("hello")` yields `{'h': 1, 'e': 1, 'l': 2, 'o': 1 }`.
*/
console.log("\nEx8");

let countOccurrences = (string) => {
  let dict = {};
  Array.from(string).forEach((elem) => {
    dict[elem] = (dict[elem] == undefined) ? 1 : dict[elem]+1;
  });
  return dict;
}

console.log(countOccurrences('hello'));
// Expected result:
// countOccurrences("hello") ---> {'h': 1, 'e': 1, 'l': 2, 'o': 1 }

/*
* Create the function `normalizeCounts` which takes the character counts outputted by `countOccurrences`,
	and calculates normalized counts - that is divided by the total sum.
	Please calculate the sum using [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).
	For example:
	`normalizeCounts({'h': 1, 'e': 1, 'l': 2, 'o': 1})` yields `{'h': 0.2, 'e': 0.2, 'l': 0.4, 'o': 0.2}`

* Create `countOccurencesNormalized` - a function which given a string, first applies `countOccurrences` and then normalizes the counts using `normalizeCounts`.

* Visualize the results by calling `setCharacterCountingFunction(countOccurencesNormalized);` - look at `index.html`, now you should be able to count the distribution
of characters in any text you input. You can pass a `colorCycle` with your colors as the second argument to color the bars.
*/
console.log("\nEx9");

let normalizeCounts = (countOcc) => {
  let sum = Object.values(countOcc).reduce((prev, curr) => prev+curr, 0);
  let dict = {};
  Object.entries(countOcc).forEach(kv => {
    dict[kv[0]] = kv[1]/sum;
  });
  return dict;
}

console.log(normalizeCounts(countOccurrences('hello')));

// Expected result:
// normalizeCounts({'h': 1, 'e': 1, 'l': 2, 'o': 1 }) ---> {'h': 0.2, 'e': 0.2, 'l': 0.4, 'o': 0.2 }

const countOccurrencesNormalized = (seq) => normalizeCounts(countOccurrences(seq));

setCharacterCountingFunction(
	countOccurrencesNormalized,
	colorCycle(['red', 'blue', 'green']),
);

/*
## Throwing balls

We will simulate a ball thrown at angle $b$ with velocity $v_0$. The initial velocity $(v_x, v_y)$ is:

$$v_x = v_0 cos(b)$$
$$v_y = v_0 sin(b)$$

The position of the ball at time $t$ is given by:

$$x(t) = v_x * t$$
$$y(t) = v_y * t + (a * t^2 * 0.5)$$

where $a$ is the acceleration caused by gravity, usually -9.81 $m/s^2$.

Implement a function `simulateBall(v0, angle, num_steps, dt, g)` such that:

* `v0` is the magnitude of the initial velocity
* 'angle' is the inclination angle in degrees, multiply by `DEG_TO_RAD = Math.PI / 180.` to get radians for the trigonometric functions,
* `num_steps` is the number of steps of the simulation, the default value should be 256,
* `dt` is the time that advances between steps, default value 0.05,
* `g` is the acceleration, default value -9.81,
* it returns an array of ball positions at each time step,
* each position is given as a array `[x, y]`,

Use the `range` function to create the array of time points, then `map` them to the `[x, y]` values given by the equations above.
* We want to finish the plot when the ball hits the ground (y=0), so please filter the point array to remove points with y below 0.
* Visualize the ball trajectories using `plotBall` (the 2nd optional argument is the line color):
* Use `randomArray` to create 20 random angles between 0 deg and 90 deg, then plot the ball trajectories for each angle.
*/

const DEG_TO_RAD = Math.PI / 180.;


let simulateBall = (v0, angle, num_steps=256, dt=0.05, g=-9.81) => {
  let time_index = range(num_steps);
  let positions = []
  for (var i in time_index) {
    let t = i*dt;
    let vx = v0 * Math.cos(angle * DEG_TO_RAD);
    let vy = v0 * Math.sin(angle * DEG_TO_RAD);
    let x_t = vx * t;
    let y_t = vy * t + (g * t**2 * 0.5);
    if(y_t>=0) {
      positions[i] = [x_t, y_t];
    }
  }
  return positions;

}


const ball_cc = colorCycle(['hsl(160, 100%, 64%)', 'hsl(200, 100%, 64%)', 'hsl(240, 100%, 64%)', 'hsl(120, 100%, 64%)', 'hsl(80, 100%, 64%)']);
plotBall(simulateBall(40, 60), ball_cc());
plotBall(simulateBall(40, 30), ball_cc());
plotBall(simulateBall(40, 45), ball_cc());

randomArray(20, 0, 90).forEach((angle) => {
	plotBall(simulateBall(40, angle), ball_cc());
});
