const e = React.createElement;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            groupCreated: false
        };
    }

    render() {
        if (this.state.groupCreated) {
            return e(Buttons);
        }
        return e("div", {className: "createjoin"},
            e(CreateGroup, {setState: state => this.setState(state)}),
            e(JoinGroup, {setState: state => this.setState(state)})
        );
    }

}

