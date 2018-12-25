var pastPages = [];

window.addEventListener("hashchange", function(e) {
    // this check is so when forward is called, the hashchange listener is activated, but nothing happens
    // because the current hash is the last element in the hashstack
    // if it wasnt, we know that the user changed it
    if (location.hash != "#" + appState().screen) {
        parents[appState().screen]();
    }
});

var parents = {
    start: () => {},
    select: () => {setAppState({screen: "start"})},
    game: () => {setAppState({screen: "start"})}
}
