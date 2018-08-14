import React from "react";
import ListItem from "./ListItem";

const Menu = (props) => {
    console.log(props);
    return (
        <ul className='menu'>
            {props.locations.map(loc => (
                <ListItem
                    onListItemClick={props.onListItemClick}
                    name={loc.name}
                    key={loc.venueId}
                />
            ))}
        </ul>
    );
};

export default Menu;