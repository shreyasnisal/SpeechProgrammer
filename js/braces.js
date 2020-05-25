function braceOut(){
    var brace ='}';
    var condition = "\n\n";
    console.log(brace); 
    if(textAfter.length>0 &&textAfter.indexOf(brace) > -1){
       
        programTextArea.value =textBefore + textAfter + condition;

  programTextArea.focus();

  programTextArea.selectionEnd = programTextArea.selectionEnd - textAfter.length;
  // programTextArea.selectionEnd = programTextArea.selectionEnd + 2;

  textBefore = programTextArea.value.substring(0, programTextArea.selectionStart);
  textAfter = programTextArea.value.substring(programTextArea.selectionEnd, programTextArea.value.length);
}

    
}