import React from "react";

const ListItem = (props) => {
    console.log(props);
    return (
        <ul className='list-item'>
            <li
                onClick={props.onListItemClick}
                name={props.locations.name}
                key={props.locations.venueId}
            >
                {props.name}
            </li>
        </ul>
    )
}

export default ListItem;