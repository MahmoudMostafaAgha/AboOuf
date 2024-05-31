import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FullscreenPopup from './FullscreenPopup'; 
import { updateCounter } from '../../../actions/counterActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faRegularHeart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import '../../../styles/singleProduct.css';

const CardModel = ({ product, index }) => {
  const [showCartControls, setShowCartControls] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [activeSizes, setActiveSizes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);


  const dispatch = useDispatch();
  const toggleCartControls = () => {
    setShowCartControls(!showCartControls);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  const handleLike = ()=>{
    setIsFavorited(!isFavorited);
    setLikeCount(prevCount => prevCount + (isFavorited ? -1 : 1));
  }

  const increaseQuantity = () => {
    const newQuantity = quantity + (activeSizes.length > 0 ? activeSizes.length : 1);
    const difference = newQuantity - quantity;
    setQuantity(newQuantity);
    dispatch(updateCounter(difference));
  };
  
  const decreaseQuantity = () => {
    let difference;
    if (quantity > 1) {
      const newQuantity = quantity - (activeSizes.length > 0 ? activeSizes.length : 1);
      difference = newQuantity - quantity;
      console.log(difference);
      setQuantity(newQuantity);
    } else {
      difference = 1 - quantity;
      setQuantity(1);
      setShowCartControls(false);
    }
    dispatch(updateCounter(difference));
  };
  

  const toggleSize = (size) => {
    if (activeSizes.includes(size)) {
      setActiveSizes(activeSizes.filter((activeSize) => activeSize !== size));
    } else {
      setActiveSizes([...activeSizes, size]);
    }
  };

  const sizes = index % 2 === 0 ? ['100 gm', '200 gm', '300 gm'] : ['250 gm'];

  return (
    <div className="product-card">
      <div className="product-img-container">
        <img
          src={product.main_image || '/default-image.jpg'}
          alt={product.name || 'Product Image'}
          className="product-img"
        />
        <button className="fullscreen-button" onClick={togglePopup}>
          <img src="/full-screen.svg" alt="Fullscreen" className="fullscreen-icon" />
        </button>
      </div>
      <div className="product-data">
        <div className="product-title">{product.ar_name || 'Product Name'}</div>
        <div className="size">{sizes.length === 1 ? sizes[0] : ''}</div>
     
        <div className="prices">
          <div className="current-price">
            00 <span className='discount-price'>&nbsp;{product.price}&nbsp;</span>   EGP
          </div>
          {product.sale_price ? (
            <span className="old-price"> {product.sale_price} EGP</span>
          ) : (
            <span className="old-price"> 100 EGP</span>
          )}
        </div>
        {sizes.length > 1 && (
  <div className="sizes">
    {sizes.map((size, idx) => (
      <div
        key={idx}
        className={`single-size ${activeSizes.includes(size) ? 'active-size' : ''}`}
        onClick={() => toggleSize(size)}
      >
        {size}
      </div>
    ))}
  </div>
)}

        <div className="product-card-footer">
          {!showCartControls ? (
            <button className="add-to-cart" onClick={toggleCartControls}>
              Add to Cart
              <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            </button>
          ) : (
            <div className="cart-controls">
              <button className="increase-quantity" onClick={increaseQuantity}>
                <FontAwesomeIcon icon={faPlus} className="plus-icon" />
              </button>
              <div className="quantity">{quantity}</div>
              <button className="decrease-quantity" onClick={decreaseQuantity}>
                <FontAwesomeIcon icon={faMinus} className="minus-icon" />
              </button>
            </div>
          )}
          <button className="favorite-button" onClick={handleLike} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <FontAwesomeIcon icon={isHovered ? faRegularHeart  : faHeart} className="heart-icon" style={{ color: isHovered ? 'red' : 'inherit' }} />

          </button>
        </div>
      </div>
      {showPopup && (
        <FullscreenPopup product={product} onClose={togglePopup} />
      )}
    </div>
  );
};

export default CardModel;
