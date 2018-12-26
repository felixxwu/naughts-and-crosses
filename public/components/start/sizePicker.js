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
            e("input", {
                className: "sizePicker",
                id: "rows",
                type: "number",
                min: "3",
                defaultValue: "3",
                onChange: () => {
                    this.setState({y: $("#rows")[0].value});
                }
            }),
            " by ",
            e("input", {
                className: "sizePicker",
                id: "cols",
                type: "number",
                min: "3",
                defaultValue: "3",
                onChange: () => {
                    this.setState({x: $("#cols")[0].value})
                }
            }),
            e("br"),
            e("i", {
                className: "material-icons veryLarge clickable",
                onClick: () => {
                    this.props.setValues({x: this.state.x, y: this.state.y});
                    this.props.handleClick();
                }
            }, "check_box")
        );
    }
}