function fadeOutSpinner() {
    $("#spinner").hide();
}

function fadeInSpinner() {
    $("#spinner")[0].classList.remove("fadeOut");
    $("#spinner").show();
}