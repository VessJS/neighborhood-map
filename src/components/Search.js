import React from 'react'

const Search = (props) => {
    return (
        <form className="search-form" onSubmit={e => e.preventDefault()}>
            <input type="text"
                className="search-input"
                value={props.searchQuery}
                onChange={props.searchCategory}
            />
            <label htmlFor="input" className="search-label">
                Search by category (restaurant, hotel, attraction)
            </label>
        </form>
    );
};

export default Search;