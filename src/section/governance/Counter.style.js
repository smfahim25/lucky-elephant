import styled from "styled-components";

const CoinInfoCounterWrapper = styled.section`
  background: rgba(13, 27, 38, 0.7);
  min-height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .headings_text {
    font-size: 36px;
    font-weight: 800;
  }
  .input_text {
    border: 2px solid red;
    height: fit-content;
    width: 100%;
    max-width: 380px;
    color: #ffffff;
    padding: 11px 20px;
    /* width: 380px; */
    background-color: transparent;

    border: 1px solid rgb(255 255 255 / 30%);
  }
  .input_text::placeholder {
    color: gray;
    /* border:red 2px solid;      */
    font-size: larger;
  }
  .banner_content {
    display: flex;
    align-items: center;
    gap: 50px;
    width: 80%;
    justify-content: space-between;
    z-index: 9;
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    z-index: 1;
    position: relative;
    padding: 0;
    margin: 0;
    li {
      width: 25%;
      h3 {
        font-family: "Bakbak One";
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 36px;
        text-transform: uppercase;
        color: #ffffff;
        /* border: 2px solid red; */
      }
      h4 {
        font-family: "Bakbak One";
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 36px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  .bg-shape {
    position: absolute;

    &.shape-left {
      left: 0;
    }

    &.shape-top {
      top: 0;
    }
    &.shape-bottom {
      bottom: 0;
    }

    &.shape-right {
      right: 0;
      transform: rotate(90deg);
    }
  }

  @media only screen and (max-width: 991px) {
    ul {
      li {
        h3 {
          font-size: 35px;
        }
        h4 {
          font-size: 16px;
        }
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .banner_content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .headings_text {
      font-size: 28px;
    }
    ul {
      flex-wrap: wrap;
      padding: 15px 0px;

      li {
        width: 50%;
        padding: 15px 0px;
        text-align: center;
      }
    }
  }

  @media only screen and (max-width: 480px) {
    
    ul {
      flex-wrap: nowrap;
      flex-direction: column;

      li {
        width: 100%;
      }
    }
  }
`;

export default CoinInfoCounterWrapper;
