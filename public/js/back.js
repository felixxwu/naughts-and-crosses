var pastPages = [];

window.addEventListener("hashchange", function(e) {
    // this check is so when forward is called, the hashchange listener is activated, but nothing happens
    // because the current hash is the last element in the hashstack
    // if it wasnt, we know that the user changed it
    if (location.hash != "#" + appState().screen) {
        transitions[appState().screen]();
    }
});

// transitions for going back in the browser
var transitions = {
    start: () => {exitApp()},
    select: () => {setAppState({screen: "start"})},
    game: () => {setAppState({screen: "start"})}
}

// forces back button until app is exited
function exitApp() {
    history.back();
    exitApp();
}
