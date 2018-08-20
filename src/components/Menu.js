import React, { Component } from 'react';
import locations from "../Data/locations";
import Search from "./Search";

export class Menu extends Component {
	constructor(props) {
		super(props);
        this.locations = locations;
    }
    
	onSearchQuery(query) {
		this.props.searchQuery(query);
	}
	onListItemClick(value) {
		this.props.onListItemClick(value);
	}

    render() {
        return (
            <div className='menu' role="list">
                <Search
                    locations={locations}
                    searchQuery={this.onSearchQuery.bind(this)}
                    onListItemClick={this.onListItemClick.bind(this)}
                />
            </div>
        );
    };
	
}

export default Menu;