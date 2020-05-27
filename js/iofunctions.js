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

    programTextArea.executeEdits("", [{
        range: {
            startLineNumber: programTextArea.getPosition().lineNumber, 
            startColumn: programTextArea.getPosition().column,
            endLineNumber: programTextArea.getPosition().lineNumber, 
            endColumn: programTextArea.getPosition().column
        },
        text: 'printf("' + printQuote + '"' + printParams + ');\n',
        forceMoveMarkers: true
    }]);

    programTextArea.focus();
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

    programTextArea.executeEdits("", [{
        range: {
            startLineNumber: programTextArea.getPosition().lineNumber, 
            startColumn: programTextArea.getPosition().column,
            endLineNumber: programTextArea.getPosition().lineNumber, 
            endColumn: programTextArea.getPosition().column
        },
        text: 'scanf("' + scanQuote + '"' + scanParams + ');\n',
        forceMoveMarkers: true
    }]);

    programTextArea.focus();

}
