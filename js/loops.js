function loops() {

  var statement = 'while ('; //statement variable contains the entire while-statement including the condition
  condition += getCondition(); // get condition and append it to the condition
  condition += ') {\n\n}'; // add closing paranthesis and braces to while loop

  // add statement to program textarea
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

  // set cursor to between the braces
  programTextArea.setPosition({lineNumber: programTextArea.getPosition().lineNumber - 1, column: programTextArea.getPosition().columnNumber + 2})

  indent++ // added new braces, hence increment indent
  autoIndent() //call function to implemment auto indent

  programTextArea.focus(); // focus cursor on textarea
}