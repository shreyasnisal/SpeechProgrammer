function newVariable() {
  var dataType = splitWords[0];

  var varName = splitWords[1];

  var statement = '';

  var i;

  for (i = 2; i < splitWords.length && splitWords[i] !== 'equals'; i++) {
      varName += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase());
  }

  statement += dataType + ' ' + varName;

  if (splitWords[i] === 'equals') {

      if (dataType === 'char') {
          statement += ' = \'' + splitWords[i+1][0] + '\'';
      }
      else {
          statement += ' = ' + splitWords[i+1];
      }
  }

  variables[varName] = dataType;

  statement += ';\n';

  programTextArea.value = textBefore + statement + textAfter;

  programTextArea.focus();

  programTextArea.selectionEnd = programTextArea.selectionEnd - textAfter.length;


  textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
  textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);
}
