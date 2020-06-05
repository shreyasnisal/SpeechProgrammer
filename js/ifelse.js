function ifStatement() {
	var statement = 'if ('; //
	statement += getCondition();  //get condition for if statement
	statement += ') {\n\n}'; //add closing paranthesis and braces

	//add statement to textarea
	programTextArea.executeEdits("", [{
		range: {
			startLineNumber: programTextArea.getPosition().lineNumber,
			startColumn: programTextArea.getPosition().column,
			endLineNumber: programTextArea.getPosition().lineNumber,
			endColumn: programTextArea.getPosition().column
		},
		text: statement,
		forceMoveMarkers: true
	}]);

	//reset cursor to between braces
	programTextArea.setPosition({lineNumber: programTextArea.getPosition().lineNumber - 1, column: programTextArea.getPosition().columnNumber + 2})

	indent++; //new braces added, increment indent
	autoIndent(); //call function to implement auto indent

	programTextArea.focus(); //focus on textarea

}
