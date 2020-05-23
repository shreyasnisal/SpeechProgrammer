function newFunction() {
  var i;

  var returnType = splitWords[1];

  var funcName = splitWords[2];

  for (i = 3; i < splitWords.length && splitWords[i] != 'takes'; i++) {
      funcName += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase());
  }


  var dataType = '';
  var paramName = splitWords[i+2];
  var argumentString = '';

  for (var j = i+1; j < splitWords.length; i++) {
      dataType = splitWords[j];

      var k;

      paramName = splitWords[j+1];

      for (k = j+2; k < splitWords.length && !arrayContains(dataTypes, splitWords[k]); k++) {
          paramName += splitWords[k].replace(/^./, splitWords[k][0].toUpperCase());
      }

      j = k;

      if (argumentString !== '')
          argumentString += ', ';

      argumentString += dataType + ' ' + paramName;

      dataType = '';
      paramName = '';

  }

  programTextArea.value += '\n\n' + returnType + ' ' + funcName + '(' + argumentString + ') {\n' + '\n}';

  programTextArea.focus();

  programTextArea.selectionEnd = programTextArea.selectionEnd - 2;

  textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
  textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);
}
