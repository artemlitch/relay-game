var Queue = require('queue');

function Block(id) {
    this.items = [];
    this.north = undefined;
    this.south = undefined;
    this.east = undefined;
    this.west = undefined;
    this.id = id;
    this.goal = false;
}

Block.prototype.toText = function() {
    var text = '';
    var upperWall = '  ---' + ((this.north) ? '^' : '-') + '---';
    text += upperWall +'\n';
    var lowerWall = '  ---' + ((this.south) ? 'v' : '-') + '---';
    // (this.west) ? console.log('<|       |') : console.log(' |       |');
    text += ' |       |\n';
    text += ' |       |\n';
    text += ' |       |\n';
    text += lowerWall;
    return text;
};

Block.prototype.whiteSpace = function() {
    var text = '';
    var upperWall = '         ';
    text += upperWall +'\n';
    var lowerWall = '         ';
    text += '          \n';
    text += '          \n';
    text += '          \n';
    text += lowerWall;
    return text;
}


function City() {
    this.blocks = {};
    for (var i = 0; i<16; i++) {
        this.blocks[i] = new Block(i);
    }
    // create the city, it will always be the same for now
    // create 15 blocks
    //link blocks in a specific way to each other
    this.createStreet(0,1, 'north');
    this.createStreet(0,2, 'east');
    this.createStreet(0,3, 'west');
    this.createStreet(1,4, 'west');
    this.createStreet(3,4, 'north');
    this.createStreet(4,5, 'west');
    this.createStreet(5,6, 'north');
    this.createStreet(6,7, 'east');
    this.createStreet(4,7, 'north');
    this.createStreet(1,9, 'north');
    this.createStreet(1,9, 'north');
    this.createStreet(7,9, 'east');
    this.createStreet(9,10, 'east');
    this.createStreet(9,11, 'north');
    this.createStreet(7,8, 'north');
    this.createStreet(8,11, 'east');
    this.createStreet(11,12, 'north');
    this.createStreet(12,13, 'west');
    this.createStreet(13,14, 'west');
    this.createStreet(13,15, 'north');
    this.blocks[15].goal = true;
}

City.prototype.createStreet = function(block1, block2, direction) {
    const oppositeDirections = {
        'north': 'south',
        'south': 'north',
        'east': 'west',
        'west': 'east'
    };
    this.blocks[block1][direction] = this.blocks[block2];
    this.blocks[block2][oppositeDirections[direction]] = this.blocks[block1];
};

City.prototype.isGoal = function(location) {
    return this.blocks[location].goal;
};

City.prototype.printNearestblocks = function(startingLocation) {
    var currentBlock = this.blocks[startingLocation];
    var upperRow = '';
    if (currentBlock['north'] !== undefined ) {
        console.log(this.blocks[currentBlock['north'].id].toText(), this.blocks[currentBlock['north'].id].toText());
    }
    // if (currentBlock['east'] !== undefined ) {
    //     this.blocks[currentBlock['east'].id].toText();
    // }
    // if (currentBlock['west'] !== undefined ) {
    //     this.blocks[currentBlock['west'].id].toText();
    // }
    if (currentBlock['south'] !== undefined ) {
        this.blocks[currentBlock['south'].id].toText();
    }
    currentBlock.toText();
}
City.prototype.printCity = function(startingLocation) {
    var map = '';
    const visitedIndexes = new Set();
    const blockQueue = new Queue();
    console.log("visited ", startingLocation);
    visitedIndexes.add(startingLocation);
    // Basic BFS Traversal of block graph
    var currentBlock = this.blocks[startingLocation];
    currentBlock.toText();
    ['north', 'south', 'east', 'west'].forEach(function(direction) {
        if (currentBlock[direction] !== undefined && !visitedIndexes.has(currentBlock[direction].id)) {
            console.log(currentBlock[direction].id);
            visitedIndexes.add(currentBlock[direction].id);
            console.log("visited ", currentBlock[direction].id, " from ", currentBlock.id, " going ", direction);
            blockQueue.push(currentBlock[direction].id);
        }
    });
    while (blockQueue.length > 0) {
        currentBlock = this.blocks[blockQueue.pop()];
        ['north', 'south', 'east', 'west'].forEach(function(direction) {
            if (currentBlock[direction] !== undefined && !visitedIndexes.has(currentBlock[direction].id)) {
                console.log(currentBlock[direction].id);
                visitedIndexes.add(currentBlock[direction].id);
                console.log("visited ", currentBlock[direction].id, " from ", currentBlock.id, " going ", direction);
                blockQueue.push(currentBlock[direction].id);
            }
        });
    }
};


// export the class
module.exports = City;

