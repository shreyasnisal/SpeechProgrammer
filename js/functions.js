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


    programTextArea.executeEdits("", [{
        range: {
            startLineNumber: programTextArea.getPosition().lineNumber, 
            startColumn: programTextArea.getPosition().column,
            endLineNumber: programTextArea.getPosition().lineNumber, 
            endColumn: programTextArea.getPosition().column
        },
        text: '\n' + returnType + ' ' + funcName + '(' + argumentString + ') {\n' + '\n}',
        forceMoveMarkers: true
    }]);

    programTextArea.setPosition({lineNumber: programTextArea.getPosition().lineNumber - 1, column: 4})
    programTextArea.focus()
    
}
