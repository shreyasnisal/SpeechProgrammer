var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-IN';
var recognizing = false;

var dataTypes = ['int', 'char', 'float', 'double', 'void'];
var identifiers = {int:'d', float:'f', double:'lf', char:'c'};

var translationDictionary = {integer:'int', mean:'main', character:'char', '=':'equals', 'percent':'%', 'backslash':'\\', percentage:'%', line:'\\n'};

var programTextArea = document.getElementById('program-text-area');

// programTextArea.value += '\n';
// programTextArea.focus();

var textBefore, textAfter;
var includeStatements;

var indentVal = 0;

var variables = {};

function clearCode(event) {
  console.log('Clear code');
  programTextArea.value = '';
}


function startStopButton(event) {
    if (!recognizing) {
        console.log("start recognition");
        recognizing = true;
        document.getElementById("start_stop_button").innerHTML = "Stop"
        recognition.start();
    }
    else {
        console.log("stop recognition");
        recognizing = false;
        document.getElementById("start_stop_button").innerHTML = "Start"
        recognition.stop();
    }
}

var splitWords = [];

function arrayContains(array, element) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === element)
            return true;
    }

    return false;
}

function dictContains(dict, element) {
    for (var i in dict) {
        if (dict[i] === element)
            return true;
    }

    return false;
}

function insertAtPosition(str, pos, charToInsert) {
    return str.substr(0, pos) + charToInsert + str.substr(pos);
}


function getCondition() {

    var varName = '';
    var wordCount = 0;
    var condition = '';
    var i = 1;
    var conditionLHS = '';
    var finished = false;

    while (!finished) {

        varName = '';
        wordCount = 0;
        conditionLHS = '';

        if (splitWords[i] === 'variable') {
            for (var j = i+1; j < splitWords.length && splitWords[j] !== 'greater' && splitWords[j] !== 'less' && splitWords[j] !== 'equals' && splitWords[j] !== 'and' && splitWords[j] !== 'or'; j++) {
                if (wordCount === 0)
                    varName += splitWords[j];
                else
                    varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase());

                wordCount++;
                i = j;
            }

            condition += varName;
            conditionLHS = varName;

            varName = '';
            wordCount = 0;
        }
        else {
            condition += isNaN(splitWords[i]) ? '\'' + splitWords[i][0] + '\'' : splitWords[i];
        }


        if (splitWords[i+1] === 'greater' && splitWords[i+2] === 'equals') {
            condition += ' >= ';
            i += 3;
        }
        else if (splitWords[i+1] === 'greater') {
            condition += ' > ';
            i += 2;
        }
        else if (splitWords[i+1] === 'less' && splitWords[i+2] === 'equals') {
            condition += ' <= ';
            i += 3
        }
        else if (splitWords[i+1] === 'less') {
            condition += ' < ';
            i += 2;
        }
        else if (splitWords[i+1] === 'equals') {
            condition += ' == ';
            i += 2;
        }


        if (splitWords[i] === 'variable') {
            for (var j = i+1; j < splitWords.length && splitWords[j] !== 'and' && splitWords[j] !== 'or'; j++) {
                if (wordCount === 0)
                    varName += splitWords[j];
                else
                    varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase());


                i = j;
            }

            condition += varName;
        }
        else {
            condition += (isNaN(splitWords[i]) || variables[conditionLHS] === 'char') ? '\'' + splitWords[i][0] + '\'' : splitWords[i];
            i++;
        }

        if (i === splitWords.length) {
            finished = true;
            break;
        }
        else {
            if (splitWords[i] === 'and')
                condition += ' && ';
            else if (splitWords[i] === 'or')
                condition += ' || ';
            i++;
        }
    }

    return condition;
}


recognition.onresult = function(event) {
    console.log(event.results);

    textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
    textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);

    for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[event.results.length - 1].isFinal) {

            splitWords = event.results[event.results.length - 1][0].transcript.trim().split(' ');

            console.log(splitWords);
        }
    }


    for (var i = 0; i < splitWords.length; i++) {
        if (translationDictionary[splitWords[i]] != undefined) {
            splitWords[i] = translationDictionary[splitWords[i]];
        }
    }


    if (splitWords[0] === 'include') {
        libName = '';
        for (var i = 1; i < splitWords.length; i++) {
            libName += splitWords[i].toLowerCase();
        }

        programTextArea.value = '#include <' + libName + '.h>\n' + textBefore + textAfter;

        textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
        textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);
        includeStatements += '#include <' + libName + '.h>\n';
    }


    if (splitWords[0] == 'function') {
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


    if (arrayContains(dataTypes, splitWords[0])) {

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

    if (splitWords[0] === 'print') {
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


    if (splitWords[0] === 'scan') {
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


    if (splitWords[0] === 'if') {

        var condition = 'if (';

        condition += getCondition();

//            var varName = '';
//            var wordCount = 0;
//            var condition = 'if (';
//            var i = 1;
//            var conditionLHS = '';
//            var finished = false;

//            while (!finished) {
//
//                varName = '';
//                wordCount = 0;
//                conditionLHS = '';
//
//                if (splitWords[i] === 'variable') {
//                    for (var j = i+1; j < splitWords.length && splitWords[j] !== 'greater' && splitWords[j] !== 'less' && splitWords[j] !== 'equals' && splitWords[j] !== 'and' && splitWords[j] !== 'or'; j++) {
//                        if (wordCount === 0)
//                            varName += splitWords[j];
//                        else
//                            varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase());
//
//                        wordCount++;
//                        i = j;
//                    }
//
//                    condition += varName;
//                    conditionLHS = varName;
//
//                    varName = '';
//                    wordCount = 0;
//                }
//                else {
//                    condition += isNaN(splitWords[i]) ? '\'' + splitWords[i][0] + '\'' : splitWords[i];
//                }
//
//
//                if (splitWords[i+1] === 'greater' && splitWords[i+2] === 'equals') {
//                    condition += ' >= ';
//                    i += 3;
//                }
//                else if (splitWords[i+1] === 'greater') {
//                    condition += ' > ';
//                    i += 2;
//                }
//                else if (splitWords[i+1] === 'less' && splitWords[i+2] === 'equals') {
//                    condition += ' <= ';
//                    i += 3
//                }
//                else if (splitWords[i+1] === 'less') {
//                    condition += ' < ';
//                    i += 2;
//                }
//                else if (splitWords[i+1] === 'equals') {
//                    condition += ' == ';
//                    i += 2;
//                }
//
//
//                if (splitWords[i] === 'variable') {
//                    for (var j = i+1; j < splitWords.length && splitWords[j] !== 'and' && splitWords[j] !== 'or'; j++) {
//                        if (wordCount === 0)
//                            varName += splitWords[j];
//                        else
//                            varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase());
//
//
//                        i = j;
//                    }
//
//                    condition += varName;
//                }
//                else {
//                    condition += (isNaN(splitWords[i]) || variables[conditionLHS] === 'char') ? '\'' + splitWords[i][0] + '\'' : splitWords[i];
//                    i++;
//                }
//
//
//                if (i === splitWords.length) {
//                    finished = true;
//                    break;
//                }
//                else {
//                    if (splitWords[i] === 'and')
//                        condition += ' && ';
//                    else if (splitWords[i] === 'or')
//                        condition += ' || ';
//                    i++;
//                }
//
//            }

        condition += ') {\n\n}';


        programTextArea.value = textBefore + condition + textAfter;

        programTextArea.focus();

        programTextArea.selectionEnd = programTextArea.selectionEnd - textAfter.length;
        programTextArea.selectionEnd = programTextArea.selectionEnd - 2;


        textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
        textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);
    }

//        if (splitWords[0] === 'else') {
//
//
//        }

    transcript = '';
    splitWords = [];
}


function autoIndent() {

}
