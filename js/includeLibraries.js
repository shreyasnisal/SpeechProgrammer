function includeLibrary() {
  libName = '';
  for (var i = 1; i < splitWords.length; i++) {
      libName += splitWords[i].toLowerCase();
  }

  // programTextArea.value = '#include <' + libName + '.h>\n' + textBefore + textAfter;

  programTextArea.setValue('#include <' + libName + '.h>\n' + textBefore + textAfter)

  // textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
  // textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);
  textBefore = programTextArea.getValue().substring(0, programTextArea.getSelection().getStartPosition());
  textAfter = programTextArea.getValue().substring(programTextArea.getSelection().selectionEnd, programTextArea.getValue().length);
  includeStatements += '#include <' + libName + '.h>\n';
}
