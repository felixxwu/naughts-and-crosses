var pastPages = [];

window.addEventListener("hashchange", function(e) {
    // this check is so when forward is called, the hashchange listener is activated, but nothing happens
    // because the current hash is the last element in the hashstack
    // if it wasnt, we know that the user changed it, not forward()
    if (location.hash != "#" + pastPages[pastPages.length - 1]) {
        let screen = pastPages.pop();
        console.log("going to:", screen);
        console.log(pastPages);
        setAppState({screen: screen});
    }
});

function saveHistory(hash) {
    pastPages.push(hash);
    location.hash = hash;
    cleanHistory();
    console.log(pastPages);
}

function cleanHistory() {
    var newPages = [];
    newPages.push(pastPages[0]);

    // start from the second element
    for (let i = 1; i < pastPages.length; i++) {
        if (pastPages[i] != newPages[newPages.length - 1]) {
            newPages.push(pastPages[i]);
        }
    }
    pastPages = newPages;
}