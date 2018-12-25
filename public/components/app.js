const e = React.createElement;

var appState;
var setAppState;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            screen: "start",
            gameID: null
        };
        appState = () => {return this.state};
        setAppState = state => {
            $("#app").animateCss("fadeOut faster", () => {
                this.setState(state);
            });
        };
    }

    render() {
        location.hash = this.state.screen;
        $("#app").animateCss("fadeIn faster");
        switch (this.state.screen) {
            case "start":
                return e("div", {className: "createjoin"},
                    e(CreateGroup),
                    e(JoinGroup)
                );
            case "select":
                return e(SelectGroup);
            case "game":
                return e(Game, {gameID: this.state.gameID});
        }
    }

}

