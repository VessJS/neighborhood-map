import React from 'react'

export const Button = (props) => {
    console.log(props.toggleMenu);
    return (
        <button aria-label="Toggle Menu"  tabIndex="1" onClick={props.toggleMenu} type="button" className="button"><i className="fa fa-bars"></i></button>
    )
};
export default Button;