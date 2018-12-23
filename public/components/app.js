const e = React.createElement;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            screen: "start",
        };
    }

    render() {
        switch (this.state.screen) {
            case "start":
                return e("div", {className: "createjoin"},
                    e(CreateGroup, {setState: state => this.setState(state)}),
                    e(JoinGroup, {setState: state => this.setState(state)})
                );
            case "select":
                return e(SelectGroup, {setState: state => this.setState(state)});
            case "game":
                return e(Buttons);
        }
    }

}

