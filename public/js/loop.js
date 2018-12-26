var loopAction = () => loop();
var lastLooped = (new Date()).getTime();

function loop() {
    lastLooped = (new Date()).getTime();
    if (appState().screen != "game") {
        loopAction = () => loop();
    }
    setTimeout(() => {
        loopAction();
    }, 1000);
}

setInterval(() => {
    if (lastLooped < (new Date()).getTime() - 5000) {
        console.log("loop died");
    }
}, 1000);