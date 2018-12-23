class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "create group",
            locationError: null
        }
    }

    render() {
        if (this.state.locationError != null) {
            return e("div", {className: "animated flash"},
                e("p", null, this.state.locationError),
                e("button", {
                    onClick: () => {
                        this.createGroup({latitude: 0, longitude: 0});
                    }
                }, "create group without location")
            );
        }
        
        return e('button', { onClick: () => this.handleClick() },
            this.state.buttonText
        );
    }

    handleClick() {
        getLocation(
            position => {   // success
                this.setState({buttonText: "creating group..."});
                this.createGroup(position.coords);
            },
            error => {      // error
                $("#app").animateCss("fadeOut faster", () => {
                    $("#app").animateCss("fadeIn faster");
                    this.setState({locationError: lookUpLocationError(error)});
                });
            }
        );
    }

    createGroup(coords) {
        $.ajax({
            url: "serverFunctions",
            data: {
                func: "newGroup",
                x: coords.latitude,
                y: coords.longitude
            }
        })
        .done(response => {
            $("#app").animateCss("fadeOut faster", () => {
                $("#app").animateCss("fadeIn faster");
                this.props.setState({screen: "select"});
            });
        })
        .fail(error => console.error(error));
    }
}
