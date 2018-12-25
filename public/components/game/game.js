class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: null,
            board: null,
            playerx: null,
            playero: null
        }
    }

    render() {
        if (this.state.board == null) {
            this.getGame(this.props.gameID);
            return null;
        }

        $("#spinner").hide();
        
        
        console.log(this.state);
        
        return e("div", null,

            "Game ID: " + this.props.gameID,

            e("div", {className: "board"}, this.gameTiles()),

            e("button", {
                onClick: () => {
                    setAppState({screen: "start"});
                    pastPages.pop();
                }
            }, "back"),

            e("button", {
                onClick: () => {
                    $("#spinner").show();
                    $.ajax({
                        url: "serverFunctions",
                        data: {
                            func: "deleteGroup",
                            id: this.props.gameID
                        }
                    })
                    .done(() => {
                        setAppState({screen: "start"});
                        pastPages.pop();
                    })
                    .fail(error => console.error(error));
                }
            }, "delete game")

        );
    }

    selectPlayer() {
        
    }

    getGame(id) {
        $("#spinner").show();
        $.ajax({
            url: "serverFunctions",
            data: {
                func: "getGroup",
                id: id
            }
        })
        .done(response => {
            $("#spinner").hide();
            let gameState = response.results[0];
            this.setState({
                board: gameState.board,
                playerx: gameState.playerx,
                playero: gameState.playero
            });
        })
        .fail(error => console.error(error));
    }

    gameTiles() {
        var tiles = [];
        let key = 0;

        for (let y = 0; y < this.boardSize().y; y++) {
            for (let x = 0; x < this.boardSize().x; x++) {
                tiles.push(
                    e(Tile, {
                        key: key++,
                        pos: {x: x, y: y},
                        gameState: this.state,
                        setTiles: tiles => this.setState({tiles: tiles})
                    })
                );
            }
        }
        return tiles;
    }

    boardSize() {
        let board = JSON.parse(this.state.board);
        let size = {
            x: board[0].length,
            y: board.length
        };

        document.body.style.setProperty("--boardCols", size.x);
        document.body.style.setProperty("--boardRows", size.y);

        return size;
    }

}
