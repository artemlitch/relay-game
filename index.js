const readline = require('readline');
const City = require('./room.js');
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
}
var recursiveReadLine = function () {
    welcomeMessage();
    const city = new City();
    city.printCity(0);
    rl.question('Command: ', function (command) {
        var commands = command.split(' ');
        const mainCommand = commands[0];
        if (mainCommand === 'exit')
            return rl.close();
        console.log('Got it! Your answer was: "', answer, '"');
        recursiveReadLine();
        if (mainCommand === 'help') {
            console.log("To see what block you are on, type in block");
            console.log("To move, type in move, and compass direction 'move north'");
            console.log("To see your items and descriptions, type in items");
            console.log("to use an item, type in use and item number 'use 1'");
            console.log("to pick up an item, type in grab and item number, 'grab 1'");
        }
    });
};
recursiveReadLine();
