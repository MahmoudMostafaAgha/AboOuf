import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const HeaderLinks = () => {
  return (
    <div className='headers-link-container'>
      <a to='/' className='header-link'>الرئيسية </a>
      <FontAwesomeIcon icon={faChevronRight} className="Chevron-icon" />
      <a to='/Coffee' className='header-link'>القهوة</a>
    </div>
  )
}

export default HeaderLinks