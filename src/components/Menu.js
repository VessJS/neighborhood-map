import React, { Component } from 'react';
import locations from "../Data/locations";
import Search from "./Search";

export class Menu extends Component {
    constructor() {
        super();
        this.locations = locations;
    }

    render() {
        return (
            <div className='menu' role="list">
                <Search
                    locations={locations}
                    onSearchCategory={this.onSearchCategory}
                    searchQuery={this.searchQuery}
                    onListItemClick={this.props.onListItemClick}
                />
            </div>
        );
    };
}

export default Menu;