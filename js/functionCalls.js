//Code to implement a function call when a user says 'call'
//Multiple parameters can be passed by saying 'pass' and then the name of the variable to be passed as parameter


function callFunctions() {
    
    var functionStatement = splitWords[1]

    for (var i = 2; i < splitWords.length && splitWords[i] != 'pass'; i++) {
        functionStatement += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase()); // Function name should be camel case
    }
    
    functionStatement += '(';
    for (var j = i; j < splitWords.length; ++j) {
        if (splitWords[j] == 'pass' && j != splitWords.length - 1) {
            functionStatement += takeParameter(j);
        }
    }

    functionStatement += ')';
    // console.log(functionStatement);
       
    // add function to program textarea
    programTextArea.executeEdits("", [{
        range: {
            startLineNumber: programTextArea.getPosition().lineNumber,
            startColumn: programTextArea.getPosition().column,
            endLineNumber: programTextArea.getPosition().lineNumber,
            endColumn: programTextArea.getPosition().column
        },
        text: functionStatement + '\n',
        forceMoveMarkers: true
    }]);

    autoIndent();

}

//Function that takes parameters whenever the word 'pass' is said by the user
function takeParameter(pos) {
    
    var paramName = splitWords[pos + 1];
    
    for (var k = pos + 2; k < splitWords.length && splitWords[k] != 'pass' ; ++k) {
        paramName += splitWords[k].replace(/^./, splitWords[k][0].toUpperCase()); //parameters name should be camelCase
    }

    // console.log(k);
    if(k !== splitWords.length) //if it is the last parameter passed then don't append a comma otherwise append one
        paramName += ' ,';
    
    return paramName;
}