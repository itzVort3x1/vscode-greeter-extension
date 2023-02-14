const vscode = require("vscode");
const superheros = require("superheroes");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const date = new Date();
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		"test-example.searchWDS",
		function () {
			// The code you place here will be executed every time your command is executed

			// Display a message box to the user
			vscode.window.showInformationMessage(`Hello ${date.getMinutes()}`);
		}
	);

	context.subscriptions.push(disposable);

	setTimeout(() => {
		vscode.window.showInformationMessage(`Hello ${superheros.random()}`);
	}, 3000);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
