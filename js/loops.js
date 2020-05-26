function loops() {
    var condition = 'while (';
  
    condition += getCondition();
  
    condition += ') {\n\n}';
  
    programTextArea.value = textBefore + condition + textAfter;
  
    programTextArea.focus();
  
    programTextArea.selectionEnd = programTextArea.selectionEnd - textAfter.length;
    programTextArea.selectionEnd = programTextArea.selectionEnd - 2;
  
    textBefore = programTextArea.getValue().substring(0, programTextArea.getSelection().getStartPosition());
    textAfter = programTextArea.getValue().substring(programTextArea.getSelection().selectionEnd, programTextArea.getValue().length);
  }
  