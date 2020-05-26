var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-IN';
var recognizing = false;
var dataTypes = ['int', 'char', 'float', 'double', 'void'];
var identifiers = {int:'d', float:'f', double:'lf', char:'c'};
var translationDictionary = {integer:'int', mean:'main', character:'char', '=':'equals', 'percent':'%', 'backslash':'\\', percentage:'%', line:'\\n'};
var programTextArea = document.getElementById('program-text-area');
var textBefore, textAfter;
var includeStatements;
var indentVal = 0;
var variables = {};
var splitWords = [];



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
        includeLibrary();
    }
    if (splitWords[0] == 'function') {
        newFunction();
    }
    if (arrayContains(dataTypes, splitWords[0])) {
      newVariable();
    }
    if (splitWords[0] === 'print') {
        printf();
    }
    if (splitWords[0] === 'scan') {
        scanf();
    }
    if (splitWords[0] === 'if') {
        ifStatement();

    }

    if(splitWords[0] === 'while'){
        loops();
    }

    } 
    // if (splitWords[0] === 'else') {
    //
    // }
    if(splitWords[0]=='out'){
    braceOut();
    }
    transcript = '';
    splitWords = [];

}

