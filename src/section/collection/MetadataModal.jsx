import React from "react";
import Modal from "react-modal";

const MetadataModal = ({ nft, isOpen, onRequestClose }) => {
  // Handle missing or invalid NFT metadata gracefully
  if (!nft || !nft.metadata) return null;

  const { attributes, image, name, description } = nft.metadata;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="NFT Metadata"
      ariaHideApp={false}  // Ensure the app is accessible when modal is open
      className="metadata-modal"
      overlayClassName="metadata-modal-overlay"
    >
      <div className="metadata-modal-content">
        <div className="modal-header">
          <h2>{name || `NFT #${nft.token_id}`}</h2>  {/* Fallback to token ID if name is missing */}
          <button onClick={onRequestClose} className="close-button">X</button>
        </div>
        <div className="modal-body">
          <div className="nft-image-wrapper">
            <img src={image} alt={name || `NFT #${nft.token_id}`} className="nft-image" />
          </div>
          <p className="nft-description">{description || 'No description available.'}</p>
          <div className="nft-attributes">
            <h3>Attributes:</h3>
            <ul>
              {attributes && attributes.length > 0 ? (
                attributes.map((attr, idx) => (
                  <li key={idx}>
                    <strong>{attr.trait_type}:</strong> {attr.value}
                  </li>
                ))
              ) : (
                <li>No attributes available.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MetadataModal;
