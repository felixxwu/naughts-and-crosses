var spinner;

window.onload = () => {
    $("#spinner").animateCss("fadeOut faster", function() {
        $("#spinner").hide();
        $("#app").animateCss("fadeIn faster");
        ReactDOM.render(e(App), document.querySelector("#app"));
    });
};
