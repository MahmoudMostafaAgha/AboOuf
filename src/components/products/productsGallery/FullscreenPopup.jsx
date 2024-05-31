import React from 'react';
import '../../../styles/fullscreenPopup.css'; 

const FullscreenPopup = ({ onClose, product }) => {
  return (
    <div className="fullscreen-popup-overlay" onClick={onClose}>
      <div className="fullscreen-popup-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={product.main_image || '/default-image.jpg'}
          alt={product.name || 'Product Image'}
          className="fullscreen-product-img"
        />
        <div className="fullscreen-product-details">
          <h2 className="fullscreen-product-title">{product.ar_name || 'Product Name'}</h2>
        </div>
        <button className="fullscreen-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FullscreenPopup;
