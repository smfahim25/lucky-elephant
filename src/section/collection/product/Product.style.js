import styled, { keyframes } from "styled-components";

// Neon Effect for Rank
const neonEffect = keyframes`
  0% {
    text-shadow: 0 0 5px #4affef, 0 0 10px #4affef, 0 0 20px #4affef, 0 0 40px #0abdc6, 0 0 80px #0abdc6, 0 0 90px #0abdc6, 0 0 100px #0abdc6, 0 0 150px #0abdc6;
  }
  100% {
    text-shadow: 0 0 10px #4affef, 0 0 20px #4affef, 0 0 30px #4affef, 0 0 50px #0abdc6, 0 0 100px #0abdc6, 0 0 120px #0abdc6, 0 0 130px #0abdc6, 0 0 200px #0abdc6;
  }
`;

// Abbreviation Map for NFT Traits
const traitAbbreviations = {
  "Accessories": "ACC",
  "Background": "BG",
  "Breed": "BRD",
  "Clothes": "CLTH",
  "Ear Accessories": "EAR ACC",
  "Eyes": "EYES",
  "Eyewear": "EYEW",
  "Face Accessories": "FACE ACC",
  "Headwear": "HDWR",
  "Jewelry": "JEWL",
  "Lucky Abilities": "LUCK ABIL",
  "Mouth": "MTH",
  "Tattoos": "TAT",
  "Tusks": "TSKS"
};

// Function to abbreviate traits
const abbreviateTrait = (traitType) => {
  return traitAbbreviations[traitType] || traitType;
};

const ProductStyleWrapper = styled.div`
  perspective: 1000px;
  width: 100%;
  text-align: center;
  margin-bottom: 60px;

  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 500px;
    position: relative;
    cursor: pointer;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;

    &.flipped {
      transform: rotateY(180deg);
    }

    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }

    .flip-card-front,
    .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 10px;
    }

    .flip-card-front {
      background-color: rgba(255, 255, 255, 0.05);
      color: black;
      z-index: 2;
    }

    .flip-card-back {
      background-color: #000000;
      color: white;
      transform: rotateY(180deg);
      padding: 15px;
      text-align: left;
      overflow-y: auto;
      z-index: 1;
    }
  }

  .product_thumb {
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px 10px 0 0;

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      transition: all 0.3s ease;
    }
  }

  .product_details {
    padding: 15px 20px;

    a {
      display: block;
      font-size: 16px;
      line-height: 1.2;
      margin-bottom: 10px;
      font-weight: 600;
      color: #ffffff;
      font-family: "Inter";
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }

    p {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 12px;

      span {
        display: flex;
        align-items: center;
        gap: 5px;

        svg {
          cursor: pointer;
          transition: color 0.3s ease;

          &:hover {
            color: #f24236;
          }
        }
      }
    }

    .button-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #4a90e2;
        border: none;
        padding: 10px 0;
        color: white;
        cursor: pointer;
        width: 100%;
        font-size: 14px;
        font-family: "Inter";
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          background: #357abd;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      }

      .buy_now_button {
        background: #4a90e2;
      }

      .view_details_button {
        background: #4a90e2;
        color: white;
      }
    }
  }

  /* Grid Styling for the back of the card */
  .nft-attributes {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two equal columns */
    gap: 8px; /* Adjusts spacing between each trait box */
    list-style: none;
    padding: 10px;
    margin: 0;
}

.nft-attributes li {
    padding: 8px;
    background: rgba(255, 255, 255, 0.05); /* Dark semi-transparent background */
    border-radius: 5px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.nft-attributes li strong {
    font-weight: bold;
    font-size: 12px; /* Slightly larger for trait categories */
    color: #fff; /* White for better contrast */
    margin-bottom: 3px; /* Reduce space between category & value */
}

.nft-attributes li span {
    font-size: 13px;
    font-weight: 600;
    color: #bbb; /* Lighter text for trait values */
    border-top: 1px solid rgba(255, 255, 255, 0.1); /* Adds a separator */
    padding-top: 5px;
    width: 100%;
}





  /* Neon effect for rank */
  .rarity-info p {
    font-size: 18px;
    font-weight: bold;
    color: #4affef;
    text-shadow: 0 0 10px #4affef, 0 0 20px #4affef;
    animation: ${neonEffect} 1.5s infinite alternate;
    margin-bottom: 10px;
    text-align: center;
  }

  .back_front_button {
    margin-top: 10px;
    background: #4a90e2;
    border: none;
    padding: 8px 10px;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    transition: background 0.3s ease;

    &:hover {
      background: #357abd;
    }
  }
`;

export default ProductStyleWrapper;
