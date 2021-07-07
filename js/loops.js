function whileLoop() {
  if (doLoopCalled) {
    var statement = "while (";
    statement += getCondition(1);
    statement += ");\n";
    // add statement to program textarea
    programTextArea.executeEdits("", [
      {
        range: {
          startLineNumber: programTextArea.getPosition().lineNumber,
          startColumn: programTextArea.getPosition().column,
          endLineNumber: programTextArea.getPosition().lineNumber,
          endColumn: programTextArea.getPosition().column,
        },
        text: statement,
        forceMoveMarkers: true,
      },
    ]);
    doLoopCalled=0;
    lastAddedCode = statement;

    autoIndent(); //implement indentation for closing brace
  } else {
    var statement = "while ("; //statement variable contains the entire while-statement including the condition
    statement += getCondition(1); // get condition and append it to the statement
    statement += ") {\n\n"; // add closing parenthesis and braces to while loop

    // add statement to program textarea
    programTextArea.executeEdits("", [
      {
        range: {
          startLineNumber: programTextArea.getPosition().lineNumber,
          startColumn: programTextArea.getPosition().column,
          endLineNumber: programTextArea.getPosition().lineNumber,
          endColumn: programTextArea.getPosition().column,
        },
        text: statement,
        forceMoveMarkers: true,
      },
    ]);
    lastAddedCode = statement;

    autoIndent(); //implement indentation for closing brace

    //add closing brace to textarea
    programTextArea.executeEdits("", [
      {
        range: {
          startLineNumber: programTextArea.getPosition().lineNumber,
          startColumn: programTextArea.getPosition().column,
          endLineNumber: programTextArea.getPosition().lineNumber,
          endColumn: programTextArea.getPosition().column,
        },
        text: "}",
        forceMoveMarkers: true,
      },
    ]);
    lastAddedCode += '}';

    // set cursor to between the braces
    programTextArea.setPosition({
      lineNumber: programTextArea.getPosition().lineNumber - 1,
      column: programTextArea.getPosition().columnNumber + 2,
    });

    indent++; // added new braces, hence increment indent
    autoIndent(); //call function to implement auto indent
  }

  programTextArea.focus(); // focus cursor on textarea
}

//do loop
function doLoop() {
  var statement = "do {\n\n"; //Add parenthesis and opening brace to do loop

  // add statement to program textarea
  programTextArea.executeEdits("", [
    {
      range: {
        startLineNumber: programTextArea.getPosition().lineNumber,
        startColumn: programTextArea.getPosition().column,
        endLineNumber: programTextArea.getPosition().lineNumber,
        endColumn: programTextArea.getPosition().column,
      },
      text: statement,
      forceMoveMarkers: true,
    },
  ]);

  lastAddedCode = statement;

  autoIndent(); //implement indentation for closing brace

  //add closing brace to textarea
  programTextArea.executeEdits("", [
    {
      range: {
        startLineNumber: programTextArea.getPosition().lineNumber,
        startColumn: programTextArea.getPosition().column,
        endLineNumber: programTextArea.getPosition().lineNumber,
        endColumn: programTextArea.getPosition().column,
      },
      text: "}",
      forceMoveMarkers: true,
    },
  ]);
  lastAddedCode += '}';

  // set cursor to between the braces
  programTextArea.setPosition({
    lineNumber: programTextArea.getPosition().lineNumber - 1,
    column: programTextArea.getPosition().columnNumber + 2,
  });

  indent++; // added new braces, hence increment indent
  autoIndent(); //call function to implement auto indent

  programTextArea.focus(); // focus cursor on textarea
}

//IMPLEMENT FOR LOOP FUNCTIONALITY
function forLoop() {}
