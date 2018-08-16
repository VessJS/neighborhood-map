import React, { Component } from 'react';
import locations from "../Data/locations";
import Search from "./Search";

export class Menu extends Component {
    constructor(props) {
        super();
        this.locations = locations;
        this.searchQuery = props.searchQuery;
    }


    render() {

        return (
            <ul className='menu'>
                <Search
                    locations={locations}
                    onSearchCategory={this.onSearchCategory}
                    searchQuery={this.searchQuery}
                />

            </ul>
        );
    };
}

export default Menu;