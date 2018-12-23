var spinner;

window.onload = () => {
    $("#spinner").animateCss("fadeOut faster", function() {
        $("#spinner").hide();
        ReactDOM.render(e(App), document.querySelector("#app"));
    });
};
