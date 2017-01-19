/**
 * Conway's Game of Life
 * Canvas & Javascript Solution
 *
 * @copyright Jakob Ploens www.jakobploens.com, 2016
 */

var GameOfLife = function(){
    var self = this;

    /** Colors **/
    this.colors = {
        alive: '#666666',
        dead:  '#d1d1d1'
    };

    this.speed    = 50;
    this.interval = false;

    /** Cell settings **/
    this.cell = {
        count: 128,
        size:  5,

        /** Return if cell with point x and y is alive **/
        lives: function(x, y){
            return self.cells[x] && self.cells[x][y];
        },

        /** Return amount of neighbours of cell with point x and y **/
        neighbours: function(x, y){
            var amount = 0;

            /** Go through all neighbours from left top clockwise and increase amount if alive **/
            if(self.cell.lives(x-1, y+1)){ amount++; } // left top
            if(self.cell.lives(x,   y+1)){ amount++; } // top
            if(self.cell.lives(x+1, y+1)){ amount++; } // right top
            if(self.cell.lives(x+1, y  )){ amount++; } // right
            if(self.cell.lives(x+1, y-1)){ amount++; } // right bottom
            if(self.cell.lives(x,   y-1)){ amount++; } // bottom
            if(self.cell.lives(x-1, y-1)){ amount++; } // left bottom
            if(self.cell.lives(x-1, y  )){ amount++; } // left

            return amount;
        }
    };

    this.generations = 0;

    /** Calculate width and height of canvas **/
    this.height = this.cell.count * this.cell.size;
    this.width  = this.cell.count * this.cell.size;

    /** Canvas **/
    this.canvas = document.getElementById("gameoflife").getContext("2d");

    /** Cells array **/
    this.cells = [];

    /**
     * Setup
     */
    this.setup = function(){
        /** Set canvas sizes **/
        self.canvas.canvas.width = self.width;
        self.canvas.canvas.height = self.height;

        /** Set basic canvas styles **/
        self.canvas.strokeStyle = self.colors.dead;
        self.canvas.fillStyle   = self.colors.alive;
        self.canvas.lineWidth   = 0.25;

        /** Create cells array **/
        for(var x = 0; x < self.cell.count; x++){
            self.cells[x] = [];

            for(var y = 0; y < self.cell.count; y++){
                self.cells[x][y] = 0;
            }
        }

        /** Initialize random cells to be drawn **/
        self.init();

        /** Initialize controlls **/
        self.controlls();
    };

    /**
     * Init
     */
    this.init = function(cells){
        /** Get random cells **/
        var cells = self.random();

        /** Set starting cells to alive **/
        cells.forEach(function(point){
            var x = point[0];
            var y = point[1];
            self.cells[x][y] = 1;
        });

        self.draw();
    };

    /**
     * Start
     */
    this.start = function(){
        self.interval = setInterval(function(){
            self.step();
        }, self.speed);
    };

    /**
     * Step
     */
    this.step = function(){
        var generation = [];

        self.cells.forEach(function(row, x){
            generation[x] = [];

            row.forEach(function(cell, y){
                var alive = 0;
                var neighbours = self.cell.neighbours(x, y);

                if(cell > 0){
                    alive = neighbours === 2 || neighbours === 3 ? 1 : 0;
                } else {
                    alive = neighbours === 3 ? 1 : 0;
                }

                generation[x][y] = alive;
            });
        });

        self.cells = generation;
        self.generations++;

        self.draw();
    };

    /**
     * Draw
     */
    this.draw = function(){
        var size = self.cell.size;

        self.clear();

        self.cells.forEach(function(row, x){
            row.forEach(function(cell, y){
                self.canvas.beginPath();
                self.canvas.rect(x * size, y * size, size, size);

                if(cell){
                    self.canvas.fill();
                } else {
                    self.canvas.stroke();
                }
            });
        });

        self.updateCounter();
    };

    /**
     * Stop
     */
    this.stop = function(){
        clearInterval(self.interval);
        self.interval = false;
    };

    /**
     * Clear
     */
    this.clear = function(){
        self.canvas.clearRect(0, 0, self.width, self.height);
    };

    /**
     * Reset
     */
    this.reset = function(){
        self.clear();
        self.generations = 0;
        self.updateCounter();
        self.init();
        self.draw();
    };

    /**
     * Random
     */
    this.random = function(counter){
        /**
         * Get a random integer between `min` and `max`.
         *
         * @param {number} min - min number
         * @param {number} max - max number
         * @return {int} a random integer
         */
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }

        var cells = [];

        if(!counter){
            var amount = self.cell.count * self.cell.count;
            var min = amount * 0.3;
            var max = amount * 0.5;
            counter = getRandomInt(min, max);
        }

        var x, y;
        for(var i = 0; i < counter; i++){
            x = getRandomInt(0, self.cell.count-1);
            y = getRandomInt(0, self.cell.count-1);
            cells.push([x, y]);
        }

        return cells;
    };

    /**
     * Update counter
     */
    this.updateCounter = function(){
        var generations = document.getElementById('gol-btn-generations');
        generations.innerHTML = self.generations;
    };

    /**
     * Controlls
     */
    this.controlls = function(){
        var startstop   = document.getElementById('gol-btn-start-n-stop');
        var step        = document.getElementById('gol-btn-step');
        var reset       = document.getElementById('gol-btn-reset');

        step.addEventListener('click', function(){
            self.step();
        });

        reset.addEventListener('click', function(){
            self.stop();
            self.reset();
        });

        startstop.addEventListener('click', function(){
            if(self.interval){
                self.stop();
            } else {
                self.start();
            }
        });
    };

    /** Return this **/
    return this;
};