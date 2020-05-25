function loops() {
    var condition = 'while (';
  
    condition += getCondition();
  
    condition += ') {\n\n}';
  
    programTextArea.value = textBefore + condition + textAfter;
  
    programTextArea.focus();
  
    programTextArea.selectionEnd = programTextArea.selectionEnd - textAfter.length;
    programTextArea.selectionEnd = programTextArea.selectionEnd - 2;
  
    textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
    textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);
  }
  