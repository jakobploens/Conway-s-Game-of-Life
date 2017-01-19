# Conway's Game of Life

Javascript simulation of [Conway's Game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

## Demo

See running example at [this pen](http://codepen.io/jakobploens/pen/pbJPYr).

## Installation and Usage

1. [Clone](https://github.com/jakobploens/Conway-s-Game-of-Life.git) or [download](https://github.com/jakobploens/Conway-s-Game-of-Life/archive/master.zip)  this repository.
2. Unzip the archive if needed open the `index.html` in your favourite browser.

## Setup

Have a look at the index.html file and take it as starting point. The game needs just the included JS file and two lines of javascript:

```javascript
var gol = new GameOfLife();
gol.setup();
```

## Options

You can adjust several values for the layout. Rules are fixed, so no option to change something here.

```javascript
var gol = new GameOfLife();
gol.colors.alive = '#666666'; /* Background for living cell */
gol.colors.dead  = '#d1d1d1'; /* Background for dead cell */
gol.speed        = 50;        /* Speed for autorun */
gol.cell.count   = 128;       /* Amount of cells in one row/column */
gol.cell.size    = 5;         /* Cell size */
gol.cells        = [];        /* Starting cells. More information down the page */
gol.setup();
```

### gol.cells

With the cells option, you can create your own simulations with fixed starting cells. If this array is empty, the simulation will fill in cells randomly (between 30% and 50% of all available cells will be alive at the start).

Usage of `gol.cells` is as easy as the following:

```javascript
gol.cells = [
    x: {
        y: 0
    }
];
```

`X` and `Y` are integers between 0 and `gol.cell.count` and define the coordinates of the cell. The last value, `0` in this case, is either `0` (dead) or `1` (alive).

## License

[MIT](https://opensource.org/licenses/MIT)

## Credits

[Jakob Ploens](http://jakobploens.com)