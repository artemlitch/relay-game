const readline = require('readline');
const City = require('./city.js');
const Player = require('./player.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function welcomeMessage() {
    console.log('Welcome to the Relay Delivery Game, you have a hot sandwich to deliver!');
    console.log('You are on the Lower East Side of Manhattan, and you must make it to Rockefeller Center');
    console.log("to see a list of moves, type in help");
    console.log("To see your items and descriptions, type in items");
    console.log("You have 20 moves left before the sandwich gets cold, and no one will want it anymore");
    console.log("Good Luck! The future of lunch depends on you!");
    console.log("This is your starting block");
    city.printBlock(player.currentRow, player.currentCol);
}

function helpMessage() {
    console.log("To see what block you are on, type in block");
    console.log("To move, type in move, and compass direction 'move north'");
    console.log("To see your items and descriptions, type in items");
    console.log("to use an item, type in use and item number 'use 1'");
    console.log("to pick up an item, type in grab and item number, 'grab 1'");
}

var getCommand = function () {
    rl.question('Command: ', function (command) {
        var commands = command.split(' ');
        const mainCommand = commands[0];
        if (mainCommand === 'exit')
            return rl.close();
        var gameEnded = processCommand(commands);
        if (!gameEnded) {
            getCommand();
        } else {
            return rl.close();
        }
    });
};

var processCommand = function (commands) {
    const mainCommand = commands[0];
    const directions = new Set(['north', 'south', 'east', 'west']);
    if (mainCommand === 'help') {
        helpMessage();
    }
    if (mainCommand === 'move') {
        if (commands[1] === undefined || !directions.has(commands[1])) {
            console.log("Wrong command for move, try 'move [north, south, east, west]'");
        } else {
            try {
                player.move(commands[1]);
                player.city.printBlock(player.currentRow, player.currentCol);
                console.log("You now have ", player.stepsLeft, " steps to make it in time!");
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    if (mainCommand === 'print') {
        player.city.printCity(player.currentRow, player.currentCol);
    }
    if (mainCommand === 'use') {
        try {
            player.useItem(commands[1]);
        }
        catch (e) {
            console.log(e);
        }
    }
    if (mainCommand === 'items') {
        player.displayItems();
    }
    if (mainCommand === 'take') {
        try {
            player.takeItem(commands[1]);
        }
        catch (e) {
            console.log(e);
        }
    }
    if (player.didLose()) {
        console.log("You've ran out of steps! The sandwich is now too cold to enjoy. Try again next time.")
        return true;
    }
    if (player.didWin()) {
        console.log("Congrats! You've made it in time to Rockefeller Center! Lunch has been saved!");
        return true;
    }
    return false;

};

const city = new City();
const player = new Player(5, 3, city);
welcomeMessage();
getCommand();

