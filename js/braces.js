function braceOut(){

  for (let i = programTextArea.getPosition().lineNumber; i <= programTextArea.getModel().getLineCount(); i++) {

    if (programTextArea.getModel().getLineContent(i) === '}') {

      programTextArea.setPosition({lineNumber: i, column: 2});

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
      
      break;
    }
  }
}