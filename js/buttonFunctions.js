
// clear button clearCode
// clears program textarea
function clearCode(event) {
  programTextArea.setValue('');
}

// start/stop button code
// starts/stop voice recognition
function startStopButton(event) {

    // if recognition is not going on, start it and change button text to 'Stop'
    if (!recognizing) {
        console.log("start recognition");
        recognizing = true;
        document.getElementById("start_stop_button").innerHTML = "Stop"
        recognition.start();
    }
    // if recognition is going on, stop it and change button text to 'Start'
    else {
        console.log("stop recognition");
        recognizing = false;
        document.getElementById("start_stop_button").innerHTML = "Start"
        recognition.stop();
    }
}

// function to switch between light and dark themes
function changeTheme(event) {

  // add light-theme css to body
  document.body.classList.toggle('light-theme');

  // change theme of monaco editor with a delay
  setTimeout(function() {
    programTextArea._themeService.getTheme().id === 'vs vs' ? monaco.editor.setTheme('vs-dark') : monaco.editor.setTheme('vs-light');
  }, 1000);
}
