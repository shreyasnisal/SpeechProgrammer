function newFunction() {
    var i;

    var returnType = splitWords[1]; // return type of function is the word spoken after 'function'

    // function name continues till user says 'takes' and starts giving parameters
    var funcName = splitWords[2];
    for (i = 3; i < splitWords.length && splitWords[i] != 'takes'; i++) {
        funcName += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase()); // Function name should be camel case
    }


    var dataType = ''; // data type of parameter

    var paramName = splitWords[i+2];
    var argumentString = ''; //entire string to put in the function parantheses

    for (var j = i+1; j < splitWords.length; i++) {
        dataType = splitWords[j];
        var k;

        //name of parameter variable (goes on till next dataType is mentioned, or continue till end of speech)
        paramName = splitWords[j+1];
        for (k = j+2; k < splitWords.length && !arrayContains(dataTypes, splitWords[k]); k++) {
            paramName += splitWords[k].replace(/^./, splitWords[k][0].toUpperCase());
        }
        j = k;

        //add comma between parameters
        if (argumentString !== '')
            argumentString += ', ';

        argumentString += dataType + ' ' + paramName; //append parameter data type and name to argument string


        //reset datatype and argument string
        dataType = '';
        paramName = '';
    }

    // add function to program textarea
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
    indent++; // since we added new braces, increment indent
    autoIndent(); // call function to implement indent
    programTextArea.focus() //focus on textare

}
