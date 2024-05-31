import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { setSearchQuery } from '../../store/productSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    dispatch(setSearchQuery(newQuery));
  };

  const clearSearch = () => {
    setQuery('');
    dispatch(setSearchQuery(''));
  };

  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input 
        type="text" 
        className='search-bar-input'
        value={query} 
        onChange={handleInputChange}
        placeholder="البحث عن منتج ...."
      />
      {query && (
        <FontAwesomeIcon 
          icon={faTimes} 
          className="clear-icon" 
          onClick={clearSearch} 
        />
      )}
    </div>
  );
};

export default SearchBar;
