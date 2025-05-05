import styled from "styled-components";

const CardsWrappers = styled.section`
  .Cards_Main {
    padding: 40px;
    width: 100%;
    max-width: 1280px;
    margin: auto;
    .JungleHub_heading {
      text-transform: uppercase;
      font-size: 20px;
      font-weight: 800;
      line-height: normal;
    }
    .divider {
      border: 1px solid #fff;
      opacity: 10;
    }
  }
  .Cards_Data {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 50px;
  }
  .map_cards {
    background-color: rgba(13, 27, 38, 0.7);
    padding: 30px 40px;
    border-radius: 20px;
    width: 100%;
    .text_heading {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-inline: 20px;
      margin-top: 20px;
      p {
        line-height: normal;
      }
    }
    .Cards_Main_Img {
      display: flex;
      width: 100%;
      max-width: 200px;
      margin-inline: auto;
    }
    .Dash_Img {
      width: 30px;
      margin-top: -20px;
    }
  }
  .rewards_heading {
    text-transform: uppercase;
    text-align: center;
    margin-top: 20px;
    font-weight: 600;
  }
  .pnuts_heading {
    text-shadow: 0px 0px 6px rgba(0, 253, 0, 1);
    color: rgba(0, 253, 0, 1);
    text-align: center;
  }
  .claim_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin-inline: auto;
    margin-top: 30px;
    background-color: transparent;
    border: none;
  }
  .jungle_hub_earnings {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    .left_section {
      width: 100%;
      background-color: #000;
      padding: 10px 15px;
      border-radius: 15px;
      .earnings_heading {
        text-transform: uppercase;
        font-size: 12px;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p:nth-child(1) {
          text-transform: uppercase;
          text-shadow: 0px 0px 6px rgba(0, 253, 0, 1);
          color: rgba(0, 253, 0, 1);
          font-weight: 700;
          line-height: normal;
          font-size: 14px;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }

  .change_name_bio_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; /* Aligns text and icon in one row */
    width: fit-content;
    padding: 10px 20px; /* Adjust padding for button size */
    margin-inline: auto;
    margin-top: 40px; /* Adjust to move the button down */
    background-color: #000; /* Black background for button */
    color: #fff; /* White text color */
    border: 2px solid #fff; /* White border */
    border-radius: 10px; /* Rounded button corners */
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth hover transitions */
    
    p {
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      margin-right: 10px; /* Space between text and icon */
    }

    img {
      width: 30px; /* Adjust icon size */
      height: 30px;
      position: relative;
      top: 5px; /* Move the SVG icon down */
    }
  }

  .change_name_bio_btn:hover {
    background-color: #333; /* Darker background on hover */
    opacity: 0.9;
  }

  .change_name_bio_btn:active {
    transform: scale(0.98); /* Slightly shrink button on click */
  }    

    .right_section {
      width: 100%;
      background-color: #000;
      padding: 10px 15px;
      border-radius: 15px;
      .input_heading {
        text-transform: uppercase;
        font-size: 12px;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p:nth-child(1) {
          text-transform: uppercase;
          text-shadow: 0px 0px 22px rgba(255, 250, 0, 1);
          color: rgba(255, 250, 0, 1);
          font-weight: 700;
          line-height: normal;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  @media screen and (max-width: 1220px) {
    .Cards_Data {
      grid-template-columns: repeat(1, 1fr);
    }
    .map_cards {
      width: 100%;
      max-width: 450px;
      margin: auto;
    }
  }
  @media screen and (max-width: 490px) {
    .Cards_Main{
        padding: 20px;
    }
    .jungle_hub_earnings {
      flex-direction: column;
    }
    .text_heading {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .Dash_Img {
        margin-top: 0px;
      }
    }
    .map_cards{
        padding: 20px 30px;
    }
  }
`;

export default CardsWrappers;
