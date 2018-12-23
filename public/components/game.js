class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardSize: 3,
            tiles: []
        }
    }

    render() {
        document.body.style.setProperty("--boardsize", this.state.boardSize);
        return e("div", null,
            "Game ID: " + this.props.gameID,
            e("div", {className: "board"}, this.generateTiles()),
            e("button", {
                onClick: () => {
                    $("#app").animateCss("fadeOut faster",() => {
                        setAppState({screen: "start"});
                    });
                }
            }, "quit"),
            e("button", {
                onClick: () => {
                    $.ajax({
                        url: "serverFunctions",
                        data: {
                            func: "deleteGroup",
                            id: this.props.gameID
                        }
                    })
                    .done(() => {
                        $("#app").animateCss("fadeOut faster", () => {
                            setAppState({screen: "start"});
                        });
                    })
                    .fail(error => console.error(error));
                }
            }, "delete game")
        );
    }

    generateTiles() {
        var tiles = [];
        for (let i = 0; i < Math.pow(this.state.boardSize, 2); i++) {
            tiles.push(
                e(Tile, {
                    key: i,
                    setTiles: tiles => this.setState({tiles: tiles})
                })
            );
            this.state.tiles[i] = null;
        }
        return tiles;
    }

}