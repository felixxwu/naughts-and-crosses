class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symol: null
        }
    }

    render() {
        let className = "tile grid3x3";
        if (this.state.symol == null) {
            className += " clickable";
        }
        return e("div", {
            className: className,
            onClick: () => this.handleClick()
        }, e("div", null, this.state.symol));
    }

    handleClick() {
        if (this.state.symol != null) {
            return;
        }
        this.setState({symol: "X"});
    }
}