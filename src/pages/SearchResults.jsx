import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css';
import { HeartOutlined } from "@ant-design/icons";
import PropertyDetailView from './property/PropertyDetail';
import { Spin } from 'antd';

const SearchResults = () => {
  const [properties, setProperties] = useState([]);
  const [likedProperties, setLikedProperties] = useState([]);
  const [selectedPropertyData, setSelectedPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    bedrooms: 'Any',
    style: 'Any',
    status: 'Any',
    furnishing: 'Any',
    minPrice: 'Any',
    maxPrice: 'Any',
  });

  const navigate = useNavigate();

  const filters = {
    bedrooms: ['Any', 1, 2, 3, 4, 5],
    style: ['Any', 'firstFloor', 'topFloor', 'gardenFlat'],
    status: ['Any', 'To Let', 'For Sale'],
    furnishing: ['Any', 'furnished', 'unfurnished'],
    minPrice: ['Any', 500, 1000, 1500, 2000],
    maxPrice: ['Any', 1000, 1500, 2000, 3000],
  };


useEffect(() => {
  setLoading(true);
  fetch('https://mira-strapi-dev.q.starberry.com/api/properties?_limit=50')
    .then((res) => res.json())
    .then((data) => {
      setProperties(data.data || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching properties:', err);
      setLoading(false);
    });
}, []);


  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProperties = properties.filter(({ attributes }) => {
    const { bedroom, price, status, style = [], letting_info = {} } = attributes;

    const matchBedroom =
      selectedFilters.bedrooms === 'Any' || bedroom === Number(selectedFilters.bedrooms);

    const priceValue = price || 0;
    const minMatch = selectedFilters.minPrice === 'Any' || priceValue >= Number(selectedFilters.minPrice);
    const maxMatch = selectedFilters.maxPrice === 'Any' || priceValue <= Number(selectedFilters.maxPrice);

    const matchPrice = minMatch && maxMatch;

    const matchStatus =
      selectedFilters.status === 'Any' || status === selectedFilters.status;

    const matchStyle =
      selectedFilters.style === 'Any' || style.includes(selectedFilters.style);

    const matchFurnishing =
      selectedFilters.furnishing === 'Any' ||
      (letting_info.furnishing || []).includes(selectedFilters.furnishing);

    return matchBedroom && matchPrice && matchStatus && matchStyle && matchFurnishing;
  });

  const handleCardClick = (id) => {
    const selected = properties.find((data) => data.id === id);
    if (selected) {
      setSelectedPropertyData(selected);
    }
  };

  const toggleLike = (id) => {
    setLikedProperties((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="search-container">
        <Spin spinning={loading}>

      {!selectedPropertyData && (
        <div>
          <h1 className="search-title">Property for Sales</h1>

          <div className="filter-bar">
            <select value={selectedFilters.bedrooms} onChange={(e) => handleFilterChange('bedrooms', e.target.value)}>
              {filters.bedrooms.map((val) => (
                <option key={val} value={val}>{val === 'Any' ? 'All Bedrooms' : `${val} Bedrooms`}</option>
              ))}
            </select>

            <select value={selectedFilters.style} onChange={(e) => handleFilterChange('style', e.target.value)}>
              {filters.style.map((val) => (
                <option key={val} value={val}>{val === 'Any' ? 'Any Neighbourhood' : val}</option>
              ))}
            </select>

            <select value={selectedFilters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
              {filters.status.map((val) => (
                <option key={val} value={val}>{val === 'Any' ? 'Any Status' : val}</option>
              ))}
            </select>

            <select value={selectedFilters.furnishing} onChange={(e) => handleFilterChange('furnishing', e.target.value)}>
              {filters.furnishing.map((val) => (
                <option key={val} value={val}>{val === 'Any' ? 'Furnishing' : val}</option>
              ))}
            </select>

            <select value={selectedFilters.minPrice} onChange={(e) => handleFilterChange('minPrice', e.target.value)}>
              {filters.minPrice.map((val) => (
                <option key={val} value={val}>{val === 'Any' ? 'Min Price' : val}</option>
              ))}
            </select>

            <select value={selectedFilters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)}>
              {filters.maxPrice.map((val) => (
                <option key={val} value={val}>{val === 'Any' ? 'Max Price' : val}</option>
              ))}
            </select>
          </div>

          <div className="property-grid">
            {filteredProperties.map(({ id, attributes }) => {
              const imgUrl =
                attributes?.featuredImage?.data?.attributes?.url
                  ? `https://mira-strapi-dev.q.starberry.com${attributes.featuredImage.data.attributes.url}`
                  : attributes?.images?.[0]?.srcUrl || 'https://via.placeholder.com/400';

              return (
                <div key={id} className="property-card" onClick={() => handleCardClick(id)}>
                  <div className="image-wrapper">
                    <img src={imgUrl} alt={attributes.title} className="property-image" />
                    <div className="play-overlay">
                      <svg className="play-icon" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0 0l-4.553 2.276A1 1 0 019 15.382V8.618a1 1 0 011.447-.894L15 10z" />
                      </svg>
                    </div>
                    <div
                      className={`heart-icon ${likedProperties.includes(id) ? 'liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent card click
                        toggleLike(id);
                      }}
                    >
                      <HeartOutlined />
                    </div>

                  </div>
                  <div className="property-details">
                    <h3 className="property-title">{attributes.title}</h3>
                    <p className="property-subtitle">{attributes.bedroom || 1} bedroom apartment for sale</p>
                    <p className="property-price">
                      {attributes.price ? `${attributes.price.toLocaleString()} €` : '—'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>)}

      {selectedPropertyData && (
        <PropertyDetailView
          property={selectedPropertyData}
          onClose={() => setSelectedPropertyData(null)}
        />
      )}
  </Spin>
    </div>
  );
};

export default SearchResults;
