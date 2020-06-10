
// function to come out of closes brace
// called when the user says the 'out'
function braceOut() {

  // iterate from current position to end of the textarea
  for (let i = programTextArea.getPosition().lineNumber; i <= programTextArea.getModel().getLineCount(); i++) {

    // check if the last chracter of the line is a closing brace
    if ((programTextArea.getModel().getLineContent(i))[programTextArea.getModel().getLineLength(i) - 1] === '}') {

      // set cursor to line of the brace
      programTextArea.setPosition({lineNumber: i, column: programTextArea.getModel().getLineLength(i) + 1});

      // add newline after coming out of a brace
      programTextArea.executeEdits("", [{
        range: {
          startLineNumber: programTextArea.getPosition().lineNumber,
          startColumn: programTextArea.getPosition().column,
          endLineNumber: programTextArea.getPosition().lineNumber,
          endColumn: programTextArea.getPosition().column
        },
        text: '\n',
        forceMoveMarkers: true
      }])

      indent-- // got out of a brace, so decrement indent
      autoIndent() // call function to implement indentation

      break; // brace was found, so stop iterating further
    }
  }
}
