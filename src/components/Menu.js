import React, { Component } from 'react'
import ListItem from "./ListItem";
import locations from "../Data/locations"

export class Menu extends Component {
    constructor(props) {
        super();
        this.locations = locations;
    }


    render() {

        return (
            <ul className='menu'>
                {this.locations.map(loc => (
                    <ListItem
                        onListItemClick={this.props.onListItemClick}
                        name={loc.name}
                        key={loc.venueId}
                    />
                ))}
            </ul>
        );
    };
}

export default Menu;