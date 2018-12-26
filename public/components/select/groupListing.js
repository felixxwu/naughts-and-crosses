class GroupListing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let distanceToGroup = this.getDistance();

        let fullMessage = this.getFullMessage();
        
        return e("div", {
                className: "groupListing",
                onClick: () => {
                    if (fullMessage == " (full)") {
                        this.props.setState({groups: null});
                        return;
                    }
                    setAppState({
                        screen: "game",
                        gameID: this.props.group.id
                    });
                }
            },
            e("div", {className: "left"}, "Game ID: " + this.props.group.id),
            e("div", {className: "right"}, distanceToGroup + fullMessage)
        );
    }

    getFullMessage() {
        let cutoff = (new Date()).getTime() - 3000;
        let playerx = this.props.group.playerx;
        let playero = this.props.group.playero;
        let fullMessage = "";
        if (playerx > cutoff && playero > cutoff) {
            fullMessage = " (full)";
        }
        return fullMessage;
    }

    getDistance() {
        if (
            this.props.group.xloc == 0 &&
            this.props.group.yloc == 0
        ) {
            return "n/a";
        }

        if (this.props.myLocation == null) {
            return "- km";
        }

        return Math.round(distance(
            this.props.myLocation.latitude, 
            this.props.myLocation.longitude, 
            this.props.group.xloc, 
            this.props.group.yloc, 
            "K"
        )) + "km";
    }
}