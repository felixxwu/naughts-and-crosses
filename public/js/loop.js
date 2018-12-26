var loopAction = () => loop();

function loop() {
    console.log(loopAction);
    if (appState().screen != "game") {
        loopAction = () => loop();
    }
    setTimeout(() => {
        loopAction();
    }, 1000);
}