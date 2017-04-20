var inquirer = require("inquirer");
var fs = require("fs");

function basicCard(front, back){
	this.front = front;
	this.back = back;
}

var runProgram = function() {

	inquirer.prompt([
		{
			type: "confirm",
    		message: "Would you like create a flash card?",
    		name: "confirm",
    		default: true
		}
	]).then(function(input){
		if (input.confirm) {
			createBasicCard();
		}
		else {
			console.log("See you later!");
		}
	})
}

var createBasicCard = function() {

	inquirer.prompt([
		{
			name: "front",
			message: "Type in what you want on the front side of this card"
		},

		{
			name: "back",
			message: "Type in what you want on the back side"
		}

	]).then(function(answers){
		var newBasicCard = new basicCard(answers.front, answers.back);
		fs.appendFileSync("./flashCards.txt", newBasicCard.front + " || " + newBasicCard.back + "\n");
		runProgram();
	});
}
runProgram();