class SizePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 3,
            y: 3
        }
    }

    render() {
        return e("div", {className: "animated fadeIn faster"},
            e("div", {className: "grid3x3"},
                e("div", {className: "a4 grid3x3 bordered"},
                    e("div", {
                        className: "a5 veryLarge",
                        id: "rows"
                    }, this.state.y),
                    e("i", {
                        className: "material-icons clickable hover a2",
                        onClick: () => {
                            if (this.state.y >= 10) {return}
                            this.setState({y: this.state.y + 1});
                        }
                    }, "add"),
                    e("i", {
                        className: "material-icons clickable hover a8",
                        onClick: () => {
                            if (this.state.y <= 3) {return}
                            this.setState({y: this.state.y - 1});
                        }
                    }, "remove")
                ),
                e("div", {className: "a5", style: {padding: "30px"}}, "by"),
                e("div", {className: "a6 grid3x3 bordered"},
                    e("div", {
                        className: "a5 veryLarge",
                        id: "rows"
                    }, this.state.x),
                    e("i", {
                        className: "material-icons clickable hover a2",
                        onClick: () => {
                            if (this.state.x >= 10) {return}
                            this.setState({x: this.state.x + 1});
                        }
                    }, "add"),
                    e("i", {
                        className: "material-icons clickable hover a8",
                        onClick: () => {
                            if (this.state.x <= 3) {return}
                            this.setState({x: this.state.x - 1});
                        }
                    }, "remove")
                ),
            ),
            e("br"),
            e("i", {
                className: "material-icons veryLarge clickable",
                onClick: () => {
                    this.props.setValues({x: this.state.x, y: this.state.y});
                    this.props.handleClick();
                }
            }, "forward")
        );
    }
}