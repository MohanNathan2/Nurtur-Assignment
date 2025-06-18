import React, { useEffect } from "react";
import "./PropertyDetailView.css";

const PropertyDetailView = ({ property, onClose }) => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { attributes } = property;
  const {
    title,
    price,
    bedroom,
    sqm,
    featuredImage,
    images = [],
    location,
    brochure,
    floorPlan,
    agent = {},
    description,
    pricePerSqm,
    thumbnail
  } = attributes;

  const mainImage = `${thumbnail}`;
  return (
    <div className="property-detail-wrapper">
      <button className="back-button" onClick={onClose}>← Back to Listings</button>

      <div className="property-detail-grid">
        {/* LEFT COLUMN: Image Section */}
        <div className="left-column">
          <div className="property-media-vertical">
            {mainImage && (
              <img src={mainImage} className="main-image-top" alt="Main Property" />
            )}
            {images.length > 1 && (
              <div className="gallery-row-bottom">
                {images.slice(1, 3).map((img, idx) => (
                  <img
                    key={idx}
                    src={img.srcUrl || "https://via.placeholder.com/300"}
                    className="gallery-thumb-bottom"
                    alt={`Gallery ${idx + 2}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Info Section */}
        <div className="right-column">
          <div className="property-info">
            {/* Top header: price + icons */}
            <div className="price-header">
              <h2 className="price-heading">
                €{price?.toLocaleString()}{" "}
                <span>{bedroom} bed | {sqm || "—"} sqm</span>
              </h2>

              <div className="icon-actions">
                <i className="fa-regular fa-share-from-square share-icon" title="Share"></i>
                <i className="fa-regular fa-heart heart-icon" title="Save"></i>
              </div>
            </div>

            <p className="sub-title">{title}</p>
            <p className="contact-note">📩 <span>Please contact us</span></p>

            <button className="contact-agent-btn">Contact Agent</button>

            <div className="facts-section">
              <div className="facts-title">FACTS & FEATURES</div>
              <div className="facts-table">
                <div className="fact-row">
                  <div className="fact-label">Neighbourhood:</div>
                  <div className="fact-value">{location || "—"}</div>
                </div>
                <div className="fact-row">
                  <div className="fact-label">Price per sqm:</div>
                  <div className="fact-value">€{pricePerSqm || "—"}</div>
                </div>
                <div className="fact-row">
                  <div className="fact-label">Brochure:</div>
                  <div className="fact-value">
                    <a href={brochure?.url} className="fact-link" target="_blank" rel="noreferrer">Download Brochure</a>
                  </div>
                </div>
                <div className="fact-row">
                  <div className="fact-label">Floor plan:</div>
                  <div className="fact-value">
                    <a href={floorPlan?.url} className="fact-link" target="_blank" rel="noreferrer">View Floorplan</a>
                  </div>
                </div>
              </div>

              {description && <p className="facts-description">{description}</p>}
            </div>

            <div className="agent-card">
              <img src={agent?.photoUrl || "/female.png"} alt="Agent" className="agent-photo" />
              <div className="agent-info">
                <p className="agent-name">{agent?.name || "Agent Name"}</p>
                <p className="agent-role">{agent?.role || "Real Estate Broker"}</p>
                <p className="agent-contact">{agent?.phone || "+377 93 25 86 66 | Email"}</p>
              </div>
            </div>

            <div className="map-placeholder">
              <p>[Map Placeholder]</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetailView;
