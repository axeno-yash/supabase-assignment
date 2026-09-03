import React from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrapper container">
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={onChange}
        className="search-bar"
      />
    </div>
  );
}

export default SearchBar;