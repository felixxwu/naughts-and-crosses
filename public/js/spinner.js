function fadeOutSpinner() {
    $("#spinner").animateCss("fadeOut faster", () => {
        $("#spinner").hide();
    });
}

function fadeInSpinner() {
    $("#spinner").animateCss("fadeIn faster");
    $("#spinner")[0].classList.remove("fadeOut");
    $("#spinner").show();
}