class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let symbol = this.getSymbolFromProps();

        let className = "tile grid3x3";
        let click = () => {};
        if (
            symbol == null && 
            this.props.gameState.player == this.props.gameState.turn &&
            this.props.gameState.disableClick == false
        ) {
            className += " clickable";
            click = () => this.handleClick();
        }
        return e("div", {
            className: className,
            onClick: () => click()
        }, e("div", null, symbol));
    }

    handleClick() {
        $("#spinner").show();
        this.props.disableClick();
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