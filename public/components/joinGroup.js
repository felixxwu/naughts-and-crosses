class JoinGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "join group"
        }
    }

    render() {
        return e('button', {
                onClick: () => this.joinGroup(),
                id: "joinGroup"
            },
            this.state.buttonText
        );
    }

    joinGroup() {
        $("#joinGroup").animateCss('bounce', function() {
            alert("done");
        })
    }
}
