class GroupListing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let distanceToGroup = this.getDistance();
        
        return e("div", {
                className: "groupListing",
                onClick: () => {
                    alert();
                }
            },
            e("div", {className: "left"}, "Group ID: " + this.props.group.id),
            e("div", {className: "right"}, distanceToGroup)
        );
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