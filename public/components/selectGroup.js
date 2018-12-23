class SelectGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: null,
            location: null,
            locationError: null
        }
    }

    render() {

        // ask for location, restart render when location is answered (success or error)
        if (this.state.location == null && this.state.locationError == null) {
            this.askLocation();
            return null;
        }

        // ajax call to get groups, restart render when completed
        if (this.state.groups == null) {
            this.getGroups();
            return null;
        }
        
        // have location (maybe error) and groups ready
        var children = [];
        for (let i = 0; i < this.state.groups.length; i++) {
            const group = this.state.groups[i];
            children.push(
                e(GroupListing, {key: i, group: group, myLocation: this.state.location})
            );
        }
        return e("div", null, this.state.locationError, children);
    }
    
    // restarts render()
    askLocation() {
        getLocation(
            position => {   // success
                this.setState({location: position.coords});
            },
            error => {      // error
                this.setState({locationError: lookUpLocationError(error)});
            }
        );
    }

    // restarts render()
    getGroups() {
        $.ajax({
            url: "serverFunctions",
            data: {
                func: "getGroups"
            }
        })
        .done(response => {
            $("#spinner").animateCss("fadeOut faster", () => {
                this.setState({groups: response.results});
                $("#spinner").hide();
                $("#app").animateCss("fadeIn faster");
            });
        })
        .fail(error => console.error(error));
    }

}