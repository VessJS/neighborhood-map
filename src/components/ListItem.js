import React from "react";

export const ListItem = (props) => {
    console.log(props.onListItemClick)
    return (
        <li className="list-item"
            onClick={props.onListItemClick}
            name={props.name}
            key={props.venueId}
            role="button"
            tabIndex="3"
        >
            {props.name}
        </li>
    )
}


export default ListItem;