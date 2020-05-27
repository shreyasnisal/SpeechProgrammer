function includeLibrary() {
  
  libName = '';
  for (var i = 1; i < splitWords.length; i++) {
      libName += splitWords[i].toLowerCase();
  }

  programTextArea.executeEdits("", [{
    range: {
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
    },
    text: '#include <' + libName + '.h>\n',
    forceMoveMarkers: programTextArea.getPosition().lineNumber === 1 ? true : false
  }]);

  includeStatements += '#include <' + libName + '.h>\n';
}
