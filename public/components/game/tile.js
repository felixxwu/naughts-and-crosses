class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newSymbol: null
        }
    }

    render() {
        let symbol = this.getSymbolFromProps();

        if (this.state.newSymbol != null) {
            symbol = this.state.newSymbol;
        }
        
        let className = "tile grid3x3";
        if (symbol == null) {
            className += " clickable";
        }
        return e("div", {
            className: className,
            onClick: () => this.handleClick()
        }, e("div", null, symbol));
    }

    handleClick() {
        if (this.getSymbolFromProps() != null) {
            return;
        }
        this.setState({newSymbol: this.getPlayer()});
        $("#spinner").show();
        let board = this.getBoard();
        let pos = this.props.pos;
        board[pos.y][pos.x] = this.getPlayer();
        console.log(board);
        $.ajax({
            url: "serverFunctions",
            data: {
                func: "setBoard",
                id: this.props.gameID,
                board: JSON.stringify(board)
            }
        })
        .done(() => {
            $("#spinner").hide();
        })
        .fail(error => console.error(error));
    }

    getSymbolFromProps() {
        let board = this.getBoard();
        let pos = this.props.pos;
        return board[pos.y][pos.x];
    }

    getBoard() {
        return JSON.parse(this.props.gameState.board);
    }

    getPlayer() {
        return this.props.gameState.player;
    }
}