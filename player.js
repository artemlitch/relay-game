function Player(startRow, startCol, city) {
    this.items = {};
    this.currentRow = startRow;
    this.currentCol = startCol;
    this.stepsLeft = 20;
    this.city = city;
}

Player.prototype.didWin = function () {
    return this.city.blocks[this.currentRow][this.currentCol].goal;

};
Player.prototype.didLose = function () {
    return this.stepsLeft <= 0;

};
Player.prototype.move = function (direction) {
    if (!this.city.canMove(this.currentRow, this.currentCol, direction)) {
        throw "cannot move in this direction"

    }
    this.stepsLeft -= 1;
    if (direction === 'north') {
        this.currentRow -= 1;
    }
    if (direction === 'south') {
        this.currentRow += 1;
    }
    if (direction === 'east') {
        this.currentCol += 1;
    }
    if (direction === 'west') {
        this.currentCol -= 1;
    }
};

Player.prototype.useItem = function (itemName) {
    if (this.items[itemName] === undefined) {
        throw ("No item with this name " + itemName);
    }
    this.items[itemName].use(this);
};

Player.prototype.takeItem = function (itemName) {
    const cityBlock = this.city.blocks[this.currentRow][this.currentCol]
    var item = undefined;
    cityBlock.items = cityBlock.items.filter(function (t) {
        if (t.name.toLowerCase() === itemName.toLowerCase()) {
            item = t;
        }
        if (t.name.toLowerCase() !== itemName.toLowerCase()) {
            return t
        }
    });
    if (item === undefined) {
        throw ("No item with this name " + itemName);
    }
    if (this.items[itemName] === undefined) {
        this.items[itemName] = item;
        console.log('You picked up ' + item.description());
    } else {
        this.items[itemName].uses += item.uses;
        console.log('You got ' + item.uses + ' extra uses for ' + item.name);
    }
};


Player.prototype.displayItems = function () {
    console.log('You have these items:');
    const items = this.items;
    Object.keys(items).forEach(function (key, index) {
        if (items[key] !== undefined) {
            console.log(items[key].description());
        }
    });
    console.log('Type use item to use');
};

module.exports = Player;
