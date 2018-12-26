class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: null,
            board: null,
            playerx: null,  // timestamp of last server poll
            playero: null,  // ^
            turn: null,
            disableClick: false // temporarily disables tile click until new server poll
        }
    }

    render() {
        if (this.state.board == null) {
            this.getGame(this.props.gameID);
            return null;
        }

        if (this.state.player == null) {
            this.setState({player: this.choosePlayer()});
        }

        this.pollServer();
        
        return e("div", null,

            "Game ID: " + this.props.gameID,

            e("div", null, "You are player: ", e("b", null, this.state.player)),
            
            this.turnMessage(),

            e("div", {className: "board"}, this.gameTiles()),

            e("button", {
                onClick: () => {
                    setAppState({screen: "start"});
                    pastPages.pop();
                }
            }, "back")

        );
    }

    choosePlayer() {
        if (this.state.playerx < this.state.playero) {
            return "x";
        } else {
            return "o";
        }
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
                playero: gameState.playero,
                turn: gameState.turn
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
                        gameID: this.props.gameID,
                        setTiles: tiles => this.setState({tiles: tiles}),
                        disableClick: () => {this.setState({disableClick: true})}
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

    turnMessage() {
        if (this.state.turn == this.state.player) {
            return e("div", null, "Your turn");
        } else {
            return e("div", null, e("b", null, this.state.turn), "'s turn");
        }
    }

    pollServer() {
        loopAction = () => {
            $.ajax({
                url: "serverFunctions",
                data: {
                    func: "playerPoll",
                    player: this.state.player,
                    id: this.props.gameID
                }
            })
            .done(response => {
                let gameState = response.results[0];
                this.setState({
                    board: gameState.board,
                    playerx: gameState.playerx,
                    playero: gameState.playero,
                    turn: gameState.turn,
                    disableClick: false
                });
                loop();
                $("#spinner").hide();
            })
            .fail(error => console.error(error));
        };
    }

}
