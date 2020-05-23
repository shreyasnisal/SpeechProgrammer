function printf() {
  var printQuote = '';

  var i;

  var printParams = '';
  var varName = '';
  var wordCount = 0;

  for (i = 1; i < splitWords.length && splitWords[i] != 'variable'; i++) {
      printQuote += splitWords[i];

      if (splitWords[i] !== '%' && splitWords[i] !== '\\' && i !== splitWords.length - 1) {
          printQuote += ' ';
      }
  }

  for (var j = i + 1; j < splitWords.length; j++) {

      if (wordCount === 0)
          varName += splitWords[j];
      else
          varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase());


      if (arrayContains(Object.keys(variables), varName)) {
          printParams += ', ' + varName;

          for (var k = 0; k < printQuote.length; k++) {
              if (printQuote[k] === '%' && !dictContains(identifiers, printQuote[k+1])) {
                  printQuote = insertAtPosition(printQuote, k + 1, identifiers[variables[varName]]);
                  //printQuote = insertAtPosition(printQuote, k + 2, ' ');
                  break;
              }
          }

          wordCount = -1;
          varName = '';
      }
      wordCount++;
  }

  programTextArea.value = textBefore + 'printf("' + printQuote + '"' + printParams + ');\n' + textAfter;

  programTextArea.focus();

  programTextArea.selectionEnd = programTextArea.selectionEnd - textAfter.length;


  textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
  textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);
}


function scanf() {
  var scanQuote = '';
  var scanParams = '';
  var varName = '';
  var wordCount = 0;

  for (var j = 1; j < splitWords.length; j++) {


      if (wordCount === 0)
          varName += splitWords[j];
      else
          varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase());


      if (arrayContains(Object.keys(variables), varName)) {
          scanParams += ', &' + varName;

          scanQuote += '%' + identifiers[variables[varName]];

          wordCount = -1;
          varName = '';
      }
      wordCount++;
  }

  programTextArea.value = textBefore + 'scanf("' + scanQuote + '"' + scanParams + ');\n' + textAfter;

  programTextArea.focus();

  programTextArea.selectionEnd = programTextArea.selectionEnd - textAfter.length;


  textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
  textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);
}
