
//function to add printf statement
function printf() {
    var printQuote = ''; // the printf string

    var i;

    var printParams = ''; // the additional parameters to pass to printf, the variable names
    var varName = ''; // name of variable to pass
    var wordCount = 0; // keeps track of whether this is the first word of the variable, for camel casing

    // iterate to the end of the word array or till when the word 'variable' is found
    for (i = 1; i < splitWords.length && splitWords[i] != 'variable'; i++) {
        printQuote += splitWords[i]; // add the word to the print string

        // add a space between words in the print string
        if (splitWords[i] !== '%' && splitWords[i] !== '\\' && i !== splitWords.length - 1) {
            printQuote += ' ';
        }
    }

    // loop to add additional parameters to printf, if any
    for (var j = i + 1; j < splitWords.length; j++) {

        if (wordCount === 0)
          varName += splitWords[j]; //first word of variable, start with lowercase
        else
          varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase()); // variable name should be in camel case, so rest of the words start with uppercase characters

        //if variable corresponding to the name is found
        if (arrayContains(Object.keys(variables), varName)) {
            printParams += ', ' + varName; // add variable to printf parameters

            // iterate through the print string and find the first occurence of %
            // add appropriate format indentifier after the % symbol
            for (var k = 0; k < printQuote.length; k++) {
                if (printQuote[k] === '%' && !dictContains(identifiers, printQuote[k+1])) {
                    printQuote = insertAtPosition(printQuote, k + 1, identifiers[variables[varName]]);
                    break;
                }
            }

            // reset variables for next iteration
            wordCount = -1;
            varName = '';
        }
        wordCount++;
    }

    // add the printf statement to the program textarea
    // also adds a newline after the statement
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

    autoIndent();

    programTextArea.focus();
}


function scanf() {
    var scanQuote = ''; // variable for the scanf string
    var scanParams = ''; // additional parameters to pass to scanf
    var varName = ''; // variable name to pass address of
    var wordCount = 0; // keeps track of whether it is the first word of the variable

    // iterate in word array for
    for (var j = 1; j < splitWords.length; j++) {

        if (wordCount === 0)
            varName += splitWords[j]; //first word of variable, start with lowercase
        else
            varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase()); // variable name should be camel case, so start subsequent words with uppercase character

        // check if variable corresponding to the name is found
        if (arrayContains(Object.keys(variables), varName)) {
            scanParams += ', &' + varName; // add address of variable with varName
            scanQuote += '%' + identifiers[variables[varName]]; // add percent symbol and appropriate format specifier in the scan string

            // reset variables for next iteration
            wordCount = -1;
            varName = '';
        }
        wordCount++;
    }

    // add the scanf statement to the program textarea
    // also adds a newline after the statement
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

    autoIndent() // call function to implement indentation for next line

    programTextArea.focus(); // focus the cursor on the program textarea

}
