function clearCode(event) {
  programTextArea.setValue('');
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
