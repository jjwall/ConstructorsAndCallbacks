var inquirer = require("inquirer");
var fs = require("fs");

function BasicCard(front, back){
	this.front = front;
	this.back = back;
}

function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
}

var blankText = "";

var x = 0;

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
			//start inner-inquirer
			inquirer.prompt([
				{
					type: "list",
					name: "specify",
    				message: "Basic flash card or cloze flash card?",
    				choices: ["Basic", "Cloze"]
				}
			]).then(function(choice){
				if (choice.specify === "Basic") {
					createBasicCard();
				}
				else if (choice.specify === "Cloze") {
					createClozeCard();
				}
			})
			//end inner-inquirer
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
		var newBasicCard = new BasicCard(answers.front, answers.back);
		fs.appendFileSync("./flashCards.txt", newBasicCard.front + " || " + newBasicCard.back + "\n");
		runProgram();
	});
}

var createClozeCard = function() {

	inquirer.prompt([
		{
			name: "text",
			message: "Type in what you want for the full text"
		},

		{
			name: "cloze",
			message: "Type in what you want to be cloze-deleted"
		}

	]).then(function(answers){
		var newClozeCard = new ClozeCard(answers.text, answers.cloze);
		var clozeText = answers.cloze;
		var fullText = answers.text;
		for (var i = 0; i < answers.text.length; i++) {
			if (fullText.charAt(i) === clozeText.charAt(x)){
				if (x < 3){
					blankText += ".";
					x++;
				}
				else if (x >= 3) {
					blankText += "";
					x++;
				}
			}
			else if (fullText.charAt(i).includes(" ")){
				blankText += " ";
			}
			else {
				blankText += fullText.charAt(i);
			}
		}
		fs.appendFileSync("./flashCards.txt", answers.cloze + " || " + blankText + "\n");
		blankText = "";
		runProgram();
	});
}

runProgram();