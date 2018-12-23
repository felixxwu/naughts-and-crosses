class JoinGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "join game"
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
        $("#app").animateCss('fadeOut faster', () => {
            setAppState({screen: "select"});
            $("#spinner").show();
            $("#spinner").animateCss("fadeIn faster");
        })
    }
}
