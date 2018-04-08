function Item(uses, desc, name, icon) {
    this.uses = uses;
    this.desc = desc;
    this.name = name;
    this.icon = icon;
}

Item.prototype.description = function () {
    return this.name + ': ' + this.desc;
};

Item.prototype.canUse = function () {
    if (this.uses === -1)
        return true;
    return this.uses > 0
};

Item.prototype.use = function () {
    if (this.canUse()) {
        console.log("Using " + this.name)
    }
};

function TinFoil() {
    Item.call(
        this,
        1,
        'Use this tinfoil to wrap the sandwich up for warmth, and gain 5 extra steps!',
        'tinfoil',
        'T'
    )
}

TinFoil.prototype = Object.create(Item.prototype);

TinFoil.prototype.use = function (player) {
    Item.prototype.use.call(this, player);
    if (this.canUse()) {
        player.stepsLeft += 5;
        console.log("You now have ", player.stepsLeft, " steps left");
    }
    this.uses -= 1;
    if (!this.canUse()) {
        player.items[this.name] = undefined;
    }
};

function Map() {
    Item.call(
        this,
        1,
        'Use this map to display the Manhattan area',
        'map',
        'M'
    )
}

Map.prototype = Object.create(Item.prototype);

Map.prototype.use = function (player) {
    Item.prototype.use.call(this, player);
    if (this.canUse()) {
        player.city.printCity(player.currentRow, player.currentCol);
    }
    this.uses -= 1;
    if (!this.canUse()) {
        console.log(this.name + " is now expired");
        player.items[this.name] = undefined;
    }
};

module.exports.TinFoil = TinFoil;
module.exports.Map = Map;
