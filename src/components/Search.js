import React, { Component } from 'react';
import ListItem from "./ListItem";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ''
        }
        this.locations = props.locations;
    }

    onSearchCategory = event => {
        this.setState({
            searchQuery: event.target.value
        })
    };

    onListItemClick = (e, marker) => {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            markerAnimation: 1,
        });
    };

    render() {
        let filteredLocations = this.props.locations.filter(
            (location) => {
                return location.category.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
            }
        );
        return (
            <div>
                <form className="search-form" onSubmit={e => e.preventDefault()} >
                    <input type="text"
                        className="search-input"
                        value={this.state.searchQuery}
                        onChange={this.onSearchCategory.bind(this)}
                    />
                    <label htmlFor="input" className="search-label">
                        <br></br>Search by category (restaurant, hotel, attraction)
                    </label>
                </form>
                {filteredLocations.map((locaction) => {
                    return <ListItem
                        onListItemClick={this.onListItemClick}
                        name={locaction.name}
                        key={locaction.venueId}
                    />
                })}
            </div>
        );
    };
}

export default Search;