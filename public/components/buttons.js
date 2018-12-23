class Buttons extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedButton: null,
            numOfButtons: 3
        };
    }
    
    render() {
        var children = [];
        for (let i = 0; i < this.state.numOfButtons; i++) {
            children.push(
                e(Button, {
                    key: i,
                    number: i,
                    appState: this.state,
                    setAppState: state => this.setState(state)
                })
            );
        }
        return e("div", null,
            children,
            e(Button, {
                key: -1,
                number: "reset",
                setAppState: state => this.setState(state)
            })
        );
    }
}