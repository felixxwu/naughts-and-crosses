const e = React.createElement;

var setAppState;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            screen: "start",
            gameID: null
        };
        setAppState = state => this.setState(state);
    }

    render() {
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

