import React, { Component } from 'react';
import ListItem from "./ListItem";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
        };
        this.locations = props.locations;
        this.activeMarker = props.activeMarker;
    }

    // targets input value and set it to state
    onSearchQuery = event => {
        this.props.searchQuery(event.target.value);
        this.setState({
            searchQuery: event.target.value
        })
    };
    onListItemClick = event => {
        this.props.onListItemClick(event.target.childNodes[0].data);
    };

    render() {
        const INPUT_STYLE = {
            boxSizing: `border-box`,
            MozBoxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `20px`,
            marginBottom: `5px`,
            padding: `3px 12px`,
            borderRadius: `1px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
        };
        // filter locations 
        let filteredLocations = this.props.locations.filter(
            (location) => {
                return location.category.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1 || location.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        );
        return (
            <div>
                <input type="text"
                    className="search-input"
                    value={this.state.searchQuery}
                    onChange={this.onSearchQuery.bind(this)}
                    tabIndex="1"
                    style={INPUT_STYLE}
                />
                <label htmlFor="input" className="search-label">
                    <br></br>Search by category or name (restaurant, hotel, attraction)
                    </label>
                {/* show filtered locations */}
                {filteredLocations.map((locaction) => {
                    return <ListItem
                        onListItemClick={this.onListItemClick.bind(this)}
                        name={locaction.name}
                        key={locaction.venueId}
                    />
                })}
            </div>
        );
    };
}

export default Search;