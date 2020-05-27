function ifStatement() {
	var condition = 'if (';

	condition += getCondition();

	condition += ') {\n\n}';

	programTextArea.executeEdits("", [{
		range: {
			startLineNumber: programTextArea.getPosition().lineNumber, 
			startColumn: programTextArea.getPosition().column,
			endLineNumber: programTextArea.getPosition().lineNumber, 
			endColumn: programTextArea.getPosition().column
		},
		text: condition,
		forceMoveMarkers: true
	}]);

	programTextArea.setPosition({lineNumber: programTextArea.getPosition().lineNumber - 1, column: programTextArea.getPosition().columnNumber + 2})

	programTextArea.focus();

}
