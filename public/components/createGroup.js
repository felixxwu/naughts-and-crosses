class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "create group"
        }
    }

    render() {
        return e('button', { onClick: () => this.createGroup() },
            this.state.buttonText
        );
    }

    createGroup() {
        this.setState({buttonText: "creating group..."});
        $.ajax({
            url: "serverFunctions",
            data: {
                func: "newGroup",
                x: 10,
                y: 10
            }
        })
        .done((response) => {
            this.props.setState({groupCreated: true});
        })
        .fail(function (error) {
            console.error(error);
        });
    }
}
