class JoinGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "join game"
        }
    }

    render() {
        return e('button', {
                onClick: () => setAppState({screen: "select"}),
                id: "joinGroup"
            },
            this.state.buttonText
        );
    }
}
