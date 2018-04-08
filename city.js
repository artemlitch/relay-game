const items = require('./items.js');

function Block() {
    this.items = [];
    this.north = false;
    this.south = false;
    this.east = false;
    this.west = false;
    this.goal = false;
}

Block.prototype.print = function () {
    var text = '';
    var upperWall = '  ---' + ((this.north) ? '^' : '-') + '---';
    text += upperWall + '\n';
    var lowerWall = '  ---' + ((this.south) ? 'v' : '-') + '---';
    var row = '     ';
    var space = ' ';
    text += space + '|' +
        ((this.items[0]) ? this.items[0].icon : ' ' ) +
        row +
        ((this.items[1]) ? this.items[1].icon : ' ' ) +
        '|\n';
    text += ((this.west) ? '<' : space) +
        '|   ' + (this.goal ? 'R' : ' ') + '   |' +
        ((this.east) ? '>' : '') + '\n';
    text += space + '|' +
        ((this.items[2]) ? this.items[2].icon : ' ' ) +
        row +
        ((this.items[3]) ? this.items[3].icon : ' ' ) +
        '|\n';
    text += lowerWall;
    console.log(text);
    if (this.items.length > 0) {
        console.log("This room has these items: ")
    }
    for (var i = 0; i < this.items.length; i++) {
        console.log(this.items[i].description())
    }
};

Block.prototype.accessible = function () {
    return this.north || this.south || this.east || this.west;
};

Block.prototype.addItem = function (item) {
    if (this.items.length < 4) {
        this.items.push(item);
    } else {
        throw "Max items reached for block";
    }
};


function City() {
    this.blocks = [];
    // create the city grid, it will always be the same size for now
    for (var row = 0; row < 6; row++) {
        this.blocks[row] = [];
        for (var col = 0; col < 5; col++) {
            this.blocks[row][col] = new Block();
        }
    }
    //link blocks in a specific way to each other
    this.createStreet(5, 3, 'north');
    this.createStreet(5, 3, 'east');
    this.createStreet(5, 3, 'west');
    this.createStreet(4, 3, 'west');
    this.createStreet(5, 2, 'north');
    this.createStreet(4, 2, 'west');
    this.createStreet(4, 1, 'north');
    this.createStreet(3, 1, 'east');
    this.createStreet(3, 2, 'east');
    this.createStreet(4, 3, 'north');
    this.createStreet(3, 3, 'east');
    this.createStreet(3, 4, 'north');
    this.createStreet(2, 4, 'north');
    this.createStreet(1, 4, 'west');
    this.createStreet(1, 3, 'west');
    this.createStreet(1, 2, 'north');
    this.createStreet(3, 2, 'north');
    this.createStreet(2, 2, 'north');
    this.blocks[0][2].goal = true;
    this.blocks[5][3].addItem(new items.TinFoil());
    this.blocks[5][3].addItem(new items.Map());
    this.blocks[5][4].addItem(new items.Map());
    this.blocks[3][3].addItem(new items.Map());
    this.blocks[2][2].addItem(new items.TinFoil());
}

City.prototype.createStreet = function (row, col, direction) {
    var block = this.blocks[row][col];
    if (direction === 'north') {
        if (row - 1 >= 0) {
            var otherBlock = this.blocks[row - 1][col];
            block.north = true;
            otherBlock.south = true;
        }
    }
    if (direction === 'south') {
        if (row + 1 < this.blocks.length) {
            var otherBlock = this.blocks[row + 1][col];
            block.south = true;
            otherBlock.north = true;
        }
    }
    if (direction === 'east') {
        if (col + 1 < this.blocks[row].length) {
            var otherBlock = this.blocks[row][col + 1];
            block.east = true;
            otherBlock.west = true;
        }
    }
    if (direction === 'west') {
        if (col - 1 >= 0) {
            var otherBlock = this.blocks[row][col - 1];
            block.west = true;
            otherBlock.east = true;
        }
    }
};

City.prototype.canMove = function (row, col, direction) {
    if (direction === 'north') {
        if (row - 1 >= 0) {
            return this.blocks[row - 1][col].accessible();
        }
    }
    if (direction === 'south') {
        if (row + 1 < this.blocks.length) {
            return this.blocks[row + 1][col].accessible();
        }
    }
    if (direction === 'east') {
        if (col + 1 < this.blocks[row].length) {
            return this.blocks[row][col + 1].accessible();
        }
    }
    if (direction === 'west') {
        if (col - 1 >= 0) {
            return this.blocks[row][col - 1].accessible();
        }
    }
    return false;
};

City.prototype.printBlock = function (row, col) {
    this.blocks[row][col].print();
};

City.prototype.printCity = function (currentRow, currentCol) {
    const blankSpace = '     ';
    const verticalRoad = '  |  ';
    const horizontalSpace = '-';
    for (var row = 0; row < this.blocks.length; row++) {
        var upRow = '';
        var blockRow = '';
        var downRow = '';
        for (var col = 0; col < this.blocks[row].length; col++) {
            var currentBlock = this.blocks[row][col];
            if (!currentBlock.accessible()) {
                blockRow += blankSpace;
                upRow += blankSpace;
                downRow += blankSpace
            } else {
                upRow += (currentBlock.north) ? verticalRoad : blankSpace;
                downRow += (currentBlock.south) ? verticalRoad : blankSpace;
                if (currentRow === row && currentCol === col) {
                    blockRow += ((currentBlock.west) ? horizontalSpace : ' ') +
                        '[P]' +
                        ((currentBlock.east) ? horizontalSpace : ' ');
                } else if (currentBlock.goal) {
                    blockRow += ((currentBlock.west) ? horizontalSpace : ' ') +
                        '[R]' +
                        ((currentBlock.east) ? horizontalSpace : ' ');
                } else {
                    blockRow += ((currentBlock.west) ? horizontalSpace : ' ') +
                        '[ ]' +
                        ((currentBlock.east) ? horizontalSpace : ' ');
                }

            }
        }
        console.log(upRow);
        console.log(blockRow);
        console.log(downRow);
    }

};

// export the class
module.exports = City;

