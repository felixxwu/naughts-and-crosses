class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.number == "reset") {
            return e("button", { onClick: () => this.handleReset() },
                "reset"
            );
        }

        if (this.props.number == this.props.appState.selectedButton) {
            return 'button pressed';
        }

        return e('button', { onClick: () => this.handleClick() },
            `press me (${this.props.number})`
        );
    }

    handleReset() {
        this.props.setAppState({selectedButton: null});
    }

    handleClick() {
        this.props.setAppState({selectedButton: this.props.number});

        // ajax((response) => {
        //     console.log(response, this);
        //     this.setState({message:response.func});
        // });
    }

}
