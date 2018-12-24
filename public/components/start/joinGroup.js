class JoinGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "join game"
        }
    }

    render() {
        $("#spinner").hide();
        
        return e('button', {
                onClick: () => {
                    $("#spinner").show();
                    setAppState({screen: "select"});
                    saveHistory("start");
                },
                id: "joinGroup"
            },
            this.state.buttonText
        );
    }
}
