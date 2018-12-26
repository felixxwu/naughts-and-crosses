var loopAction = () => loop();

function loop() {
    console.log(loopAction);
    if (appState() != "game") {
        loopAction = () => loop();
    }
    setTimeout(() => {
        loopAction();
    }, 1000);
}