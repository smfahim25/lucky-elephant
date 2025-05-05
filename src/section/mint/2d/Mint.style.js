import styled from "styled-components";
import BgShape from "@/src/assets/images/bg/mint-1_bg.png";
import gradientShape from "@/src/assets/images/nft/v4_baner_mesh-grad.png";

const MintStyleWrapper = styled.section`
  background: url(${BgShape.src}) no-repeat;
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  padding: 150px 0;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    content: "";
    background: linear-gradient(180deg, rgba(4, 12, 18, 0.8) 0%, #040c12 100%);
    z-index: -1;
  }

  // left content
  .mint_left_content {
    padding-right: 99px;

    p {
      margin-top: 23px;
      a {
        color: rgba(255, 255, 255, 0.8);
        font-weight: 600;
      }
    }

    .bithu-btn {
      width: 100% !important;
    }
  }

  .mint_left_inner {
    max-width: 372px;
    width: 100%;
    margin-left: auto;
  }

  .mint_count_list {
    padding: 0;
    margin: 15px 0 30px;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      h5 {
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: #ffffff;
      }
    }
  }

  .mint_quantity_sect {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 106px;
    width: 100%;
    height: 100%;

    button {
      border: none;
      outline: none;
      background: transparent;
      padding: 0px;
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
    }

    input {
      max-width: 58px;
      width: 100%;
      border: none;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      padding: 0px 19px;
      outline: none;
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
    }
  }

  //right content
  .mint_right_content {
    position: relative;
    margin-top: 50px;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: url(${gradientShape.src}) no-repeat;
      background-position: center;
      background-size: contain;
      content: "";
      z-index: -1;
    }
    h1,
    h4,
    h5,
    h6 {
      color: #ffffff;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .content_header {
      h4 {
        img {
          margin-left: 7px;
        }
      }
      h1 {
        font-size: 60px;
        margin-top: 15px;
      }
    }

    .mint_timer {
      margin-top: 20px;
      margin-bottom: 53px;
    }

    .mint_btns {
      display: flex;
      column-gap: 25px;
      margin-top: 70px;

      button {
        background: transparent;
      }
    }
  }

  // timer
  .countdown_wrapper {
    display: flex;
    column-gap: 15px;
    align-items: center;

    .count_number {
      font-family: "Bakbak One";
      align-items: baseline;
      color: #ffffff;
      font-size: 40px;
      padding-right: 25px;
      line-height: 50px;
      .label {
        font-size: 50%;
        font-weight: 400;
        text-transform: uppercase;
        color: #ffffff;
        position: relative;
      }

      &::before {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  /* particles */
  .banner_particles {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .mint_left_content {
      padding-right: 20px;
    }

    .mint_right_content {
      .content_header {
        h4 {
          font-size: 18px;
        }

        h1 {
          font-size: 40px;
        }
      }

      .content_footer {
        h5 {
          font-size: 18px;
        }
      }
    }

    //timer
    .countdown_wrapper {
      .count_number {
        font-size: 36px;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .mint_left_inner {
      margin: 0 auto;
    }
    .mint_left_content {
      padding-right: 0;
    }
  }
  @media only screen and (max-width: 575px) {
    .mint_right_content {
      .content_header {
        h1 {
          font-size: 45px;
        }
      }
    }

    .countdown_wrapper {
      .count_number {
        font-size: 29px;
      }
    }
  }

  @media only screen and (max-width: 375px) {
    .mint_right_content {
      .mint_btns {
        flex-direction: column;
        row-gap: 15px;
      }
    }
  }



/* Overlay styling */
.metadata-modal-overlay {
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
}

/* Modal container */
.metadata-modal {
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

/* Modal header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.modal-header h2 {
  font-size: 20px;
  font-weight: bold;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #ff5e5e;
}

/* Modal body */
.modal-body {
  text-align: center;
}

.nft-image-wrapper {
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

.nft-description {
  font-size: 14px;
  color: #d1d1d1;
  margin-bottom: 15px;
}

/* Attributes section */
.nft-attributes {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 8px;
  text-align: left;
}

.nft-attributes h3 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
}

.nft-attributes ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nft-attributes li {
  font-size: 14px;
  margin-bottom: 5px;
}

.nft-attributes li strong {
  color: #ffd700;
}




  
`;

export default MintStyleWrapper;
