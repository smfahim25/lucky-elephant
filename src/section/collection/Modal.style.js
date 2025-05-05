import styled from 'styled-components';

const MintStyleWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  transition: opacity 0.3s ease-in-out;

  .modal-container {
    background: #1e1e2f;
    color: #ffffff;
    padding: 20px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.2);
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 10px;
    margin-bottom: 15px;

    h2 {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .close-button {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #ff5e5e;
    }
  }

  .modal-body {
    text-align: center;
  }

  .image-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }

  .nft-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  }

  .description {
    font-size: 14px;
    color: #d1d1d1;
    margin-bottom: 15px;
  }

  .attributes-container {
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 8px;
    text-align: left;

    h3 {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      font-size: 14px;
      margin-bottom: 5px;
    }

    li strong {
      color: #ffd700;
    }
  }
`;

export default MintStyleWrapper;
