const vscode = require("vscode");
const superheros = require("superheroes");
const editJsonFile = require("edit-json-file");
const Quote = require("inspirational-quotes");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	let file = editJsonFile(`${__dirname}/data.json`);
	console.log(Quote.getQuote());

	if (file.get().name === "" || file.get().name === undefined) {
		const name = await vscode.window.showInputBox({
			placeHolder: "Enter your name",
			prompt: "What is your name?",
		});
		if (name === "") {
			vscode.window.showErrorMessage(
				"Name not entered, use this command sethero to set your name"
			);
		} else {
			file.set("name", name);
			file.save();
		}
	}
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		"test-example.sethero",
		async function () {
			// The code you place here will be executed every time your command is executed

			// Display a message box to the user
			const name = await vscode.window.showInputBox({
				placeHolder: "Enter your name",
				prompt: "What is your name?",
			});
			if (name === "") {
				vscode.window.showErrorMessage(
					"Name not entered, use this command sethero to set your name"
				);
			} else {
				file.set("name", name);
				file.save();
				messager(name);
			}
		}
	);

	context.subscriptions.push(disposable);

	if (file.get().name !== "" && file.get().name !== undefined) {
		messager(file.get().name);
	}
}

// This method is called when your extension is deactivated
function deactivate() {}

function messager(name) {
	vscode.window.showInformationMessage(
		`Welcome back ${name} 🦸 Let's Rock and Roll!`
	);
	setTimeout(() => {
		vscode.window.showInformationMessage(
			`Today's hero of the day is: ${superheros.random()}`
		);
	}, 5000);

	setTimeout(() => {
		vscode.window.showInformationMessage(
			`Quote: ${Quote.getQuote().text} - Author: ${Quote.getQuote().author}`
		);
	}, 7000);
}

module.exports = {
	activate,
	deactivate,
};
