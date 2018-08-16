import React, { Component } from 'react';
import ListItem from "./ListItem";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            activeMarker: {},
        }
        this.locations = props.locations;
    }
    // targets input value and set it to state
    onSearchCategory = event => {
        this.setState({
            searchQuery: event.target.value
        })
    };

    render() {
        // filter locations 
        let filteredLocations = this.props.locations.filter(
            (location) => {
                return location.category.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
            }
        );
        return (
            <div>
                <input type="text"
                    className="search-input"
                    value={this.state.searchQuery}
                    onChange={this.onSearchCategory.bind(this)}
                    tabIndex="1"
                />
                <label htmlFor="input" className="search-label">
                    <br></br>Search by category (restaurant, hotel, attraction)
                    </label>
                {/* show filtered locations */}
                {filteredLocations.map((locaction) => {
                    return <ListItem
                        onListItemClick={this.props.onListItemClick}
                        name={locaction.name}
                        key={locaction.venueId}
                    />
                })}
            </div>
        );
    };
}

export default Search;