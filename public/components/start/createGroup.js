class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "create game",
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
                }, "create game without location")
            );
        }
        
        return e('button', { onClick: () => this.handleClick() },
            this.state.buttonText
        );
    }

    handleClick() {
        getLocation(
            position => {   // success
                $("#spinner").show();
                this.setState({buttonText: "creating game..."});
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
            setAppState({
                screen: "game",
                gameID: response.results[response.results.length - 1].id
            });
            saveHistory("start");
        })
        .fail(error => console.error(error));
    }
}
