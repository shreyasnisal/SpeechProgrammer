var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-IN"; //recognition locale
var recognizing = false; //is the app listening for voice?
//data types array
var dataTypes = ["int", "char", "float", "double", "void"];
//format specifiers for printf and scanf variables
var identifiers = { int: "d", float: "f", double: "lf", char: "c" };
var passArray = ["pass"];
// translation dictionary for pronunciation correction for commonly misinterpreted words
var translationDictionary = {
  integer: "int",
  mean: "main",
  character: "char",
  "=": "equals",
  percent: "%",
  backslash: "\\",
  percentage: "%",
  line: "\\n",
  cal : "call",
};
var programTextArea; //text area to write programs
var includeStatements;
var variables = {}; //object containing variables that the user declares
var splitWords = []; //word array for recognition
var indent = 0; //indentation level, increment when adding braces
var doLoopCalled = 0; //To check if a do-while loop is called

//handles voice recognition complete event (for one line)
recognition.onresult = function (event) {
  // split results into word array
  for (var i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[event.results.length - 1].isFinal) {
      splitWords = event.results[event.results.length - 1][0].transcript
        .trim()
        .split(" ");
      console.log(splitWords);
    }
  }

  // translate apppropriate words using translation dictionary
  for (var i = 0; i < splitWords.length; i++) {
    if (translationDictionary[splitWords[i]] != undefined) {
      splitWords[i] = translationDictionary[splitWords[i]];
    }
  }

  //call function according to command (first word(s) spoken)
  if (splitWords[0] === "include") {
    includeLibrary();
  }
  if (splitWords[0] == "function") {
    newFunction();
  }
  if (arrayContains(dataTypes, splitWords[0])) {
    newVariable();
  }
  if (splitWords[0] === "print") {
    printf();
  }
  if (splitWords[0] === "scan") {
    scanf();
  }
  if (splitWords[0] === "if") {
    ifStatement();
  }
  if (splitWords[0] === "while") {
    whileLoop();
  }
  if (splitWords[0] === "do") {
    doLoop();
    doLoopCalled = 1;
  }
  if (splitWords[0] === "for") {
    forLoop();
  }
  if (splitWords[0] == "out") {
    braceOut();
  }
  if (splitWords[0] === "else" && splitWords[1] !== "if") {
    elseStatement();
  }
  if (splitWords[0] === "else" && splitWords[1] === "if") {
    elseIfStatement();
  }
  if(splitWords[0]==='call'){
      callFunctions();
  }

  //reset transcript and word array for next line
  transcript = "";
  splitWords = [];
};
