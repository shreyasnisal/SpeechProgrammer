
// add a library to the program
// always done at the program top
function includeLibrary() {

  libName = ''; //name of the library to be added

  //determine name by combining all the words after 'include'
  for (var i = 1; i < splitWords.length; i++) {
      libName += splitWords[i].toLowerCase();
  }
  
  // add the text to the program textarea
  programTextArea.executeEdits("", [{
    range: {
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
    },
    text: '#include <' + libName + '.h>\n',
    //only move marker if this is the first library we are including. Otherwise, leave the cursor in the middle of the program
    forceMoveMarkers: programTextArea.getPosition().lineNumber === 1 ? true : false
  }]);

  includeStatements += '#include <' + libName + '.h>\n';
}
