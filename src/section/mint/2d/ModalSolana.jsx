import React from 'react'
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';

export default function ModalSolana({nft, isOpen, onRequestClose}) {

    if (!nft || !nft.name) return <></>;

    const { attributes, image, name, description } = nft;

  return (
    <div>
        <Rodal visible={isOpen} onClose={onRequestClose}>
        <div className="metadata-modal-content">
        <div className="modal-header">
          <h2>{name || `NFT #${nft.edition}`}</h2>  {/* Fallback to token ID if name is missing */}
        </div>
        <div className="modal-body">
          <div className="nft-image-wrapper">
            <img src={image} alt={name || `NFT #${nft.edition}`} className="nft-image" />
          </div>
          <p className="nft-description">{description || 'No description available.'}</p>
          {/* <div className="nft-attributes">
            <h3>Attributes:</h3>
            <div className='css-1dqn1ka'>
              {attributes && attributes.length > 0 ? (
                attributes.map((attr, idx) => (
                  <div key={idx} className='css-1k53b0b'>
                    <div className='css-tl3ftk'>
                        <p>{attr.trait_type}</p>
                        <p>{attr.value}</p>
                    </div>
                  </div>
                ))
              ) : (
                <li>No attributes available.</li>
              )}
            </div>
          </div> */}
        </div>
      </div>
        </Rodal>
    </div>
  )
}
