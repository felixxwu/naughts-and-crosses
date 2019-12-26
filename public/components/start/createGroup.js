class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationError: null,
            boardSize: {x: 3, y: 3},
            showPicker: false
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

        if (this.state.showPicker) {
            return e(SizePicker, {
                handleClick: () => this.handleClick(),
                setValues: boardSize => this.setState({boardSize: boardSize})
            });
        }
        
        return e('button', {
            id: "createGameButton",
            onClick: () => {
                this.setState({showPicker: true});
            }
        },
            "create game"
        );
    }

    handleClick() {
        getLocation(
            position => {   // success
                $("#spinner").show();
                this.createGroup(position.coords);
            },
            error => {      // error
                this.setState({locationError: lookUpLocationError(error)});
            }
        );
    }

    createGroup(coords) {
        $.ajax({
            url: "serverFunctions",
            data: {
                func: "newGroup",
                x: coords.latitude,
                y: coords.longitude,
                players: 0,
                board: this.emptyBoardStringForSQL()
            }
        })
        .done(response => {
            setAppState({
                screen: "game",
                gameID: response.results[response.results.length - 1].id
            });
        })
        .fail(error => console.error(error));
    }

    emptyBoardStringForSQL() {
        var tiles = [];
        for (let y = 0; y < this.state.boardSize.y; y++) {
            let row = [];
            for (let x = 0; x < this.state.boardSize.x; x++) {
                row.push(null);
            }
            tiles.push(row);
        }
        return "'" + JSON.stringify(tiles) + "'";
    }
}
