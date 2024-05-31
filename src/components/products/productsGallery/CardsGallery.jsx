import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../store/productSlice';
import CardModel from './CardModel';
import '../../../styles/cardsGallery.css';

const CardsGallery = () => {
  const dispatch = useDispatch();
  const { items: allProducts, loading, error, searchQuery } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    filterProductsByTypesAndSearch(selectedTypes, searchQuery);
  }, [allProducts, selectedTypes, searchQuery]);

  const filterProductsByTypesAndSearch = (types, query) => {
    let filtered = [];

    if (types.length === 0) {
      filtered = allProducts;
    } else {
      filtered = allProducts.filter(product => types.includes(product.category_name_ar));
    }

    if (query) {
      filtered = filtered.filter(product => product.name.includes(query));
    }

    setFilteredProducts(filtered);
    setDisplayedProducts(filtered.slice(0, currentPage * 20));
  };

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handleFilterChange = (type) => {
    setCurrentPage(1); 

    setSelectedTypes(prevTypes => {
      if (prevTypes.includes(type)) {
        return prevTypes.filter(t => t !== type);
      } else {
        return [...prevTypes, type];
      }
    });
  };

  const handleRemoveFilter = (type) => {
    setCurrentPage(1); 

    setSelectedTypes(prevTypes => prevTypes.filter(t => t !== type));
  };

  if (loading && allProducts.length === 0) {
    return <div>Loading...</div>;
  }

  if (!loading && allProducts.length === 0 && error) {
    // run the following code in chrome folder powershell to open project"
    //  ./chrome.exe --disable-web-security --user-data-dir="C:\chromeDevSession"
    return <div>Error fetching data please watch the video sent in mail.</div>;
  }

  return (
    <>
      <div>
        <h2 className='products-header-title'>جميع منتجات القهوة</h2>
        <div className="all-filters">
          <button
            onClick={() => setSelectedTypes([])}
            className={selectedTypes.length === 0 ? 'active single-filter' : 'single-filter'}>
            كل المنتجات
          </button>
          {Array.from(new Set(allProducts.map(product => product.category_name_ar))).map(category => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={selectedTypes.includes(category) ? 'active single-filter' : 'single-filter'}>
              {category}
              {selectedTypes.includes(category) && (
                <button onClick={(e) => { e.stopPropagation(); handleRemoveFilter(category); }} className="remove-filter">
                  ×
                </button>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="cards-gallery">
        {displayedProducts.map((product, index) => (
          <CardModel key={index} product={product} index={index} />
        ))}
      </div>

      {currentPage * 20 < filteredProducts.length && (
        <button className="show-more" onClick={handleShowMore}>
          عرض المزيد
        </button>
      )}
    </>
  );
};

export default CardsGallery;
