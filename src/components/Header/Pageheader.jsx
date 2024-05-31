import React from 'react'
import SearchBar from './SearchBar'
import HeaderLinks from './HeaderLinks'
import '../../styles/header.css';

const Pageheader = () => {
  return (
    <div className='page-header'>
 <SearchBar/>
 <HeaderLinks/>
        </div>
  )
}

export default Pageheader