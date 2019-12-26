class SelectGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: null,
            location: null,     // this is set when the location is given
            locationError: null // this is set if there was a problem getting the location
        }
    }

    render() {

        $("#spinner").show();

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

        $("#spinner").hide();
        
        // have location (maybe error) and groups ready
        var children = [];
        for (let i = 0; i < this.state.groups.length; i++) {
            const group = this.state.groups[i];
            children.push(
                e(GroupListing, {
                    key: i, 
                    group: group, 
                    myLocation: this.state.location,
                    setState: state => this.setState(state)
                })
            );
        }

        // if there are no groups, then show a message and create group button
        if (children.length == 0) {
            children = [
                e("div", {key: "text"}, "There are no games, create one?"),
                e("br"),
                e(CreateGroup, {key: "button"})
            ];
        }
        
        return e("div", null,
            e("b", null, this.state.locationError),
            children,
            e("button", {
                onClick: () => {
                    setAppState({screen: "start"})
                }
            }, "back"),
            e("i", {
                className: "material-icons veryLarge clickable",
                onClick: () => {this.setState({groups: null})}
            }, "refresh")
        );
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
            this.setState({groups: response.results});
            $("#spinner").hide();
        })
        .fail(error => console.error(error));
    }

}