import styled from "styled-components";

const ParticipantStyledWrapper = styled.section`
  .Jungle_Hub_main {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    margin-inline: auto;
    padding-inline: 40px;
    gap: 20px;
    margin-top: -50px;
  }
  .main_logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 40px;
    width: fit-content;
    margin-inline: auto;
    img {
      width: 100%;
      max-width: 250px;
      /* */
    }
  }
  .logo-text {
    color: #ffe600;
    font-size: 48px;
    line-height: normal;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .jungle_hub_left_section {
    background-color: rgba(13, 27, 38, 0.7);
    padding: 30px 40px;
    border-radius: 20px;
    width: 100%;
    max-width: 450px;
    min-height: 100%;
  }
  .jungle_hub_right_section {
    width: 100%;
    max-width: 280px;
  }
  .margin_class {
    background-color: rgba(13, 27, 38, 0.7);
    padding: 40px 30px;
    border-radius: 20px;
    margin-block: 20px;
  }
  .balance_headings {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    img {
      width: 100%;
      max-width: 30px;
    }
  }
  .eth_heading {
    font-size: 48px;
    font-weight: 800;
  }
  .pricing_stratygies {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left_section {
      p:nth-child(1) {
        text-transform: uppercase;
      }
      p:nth-child(2) {
        text-transform: uppercase;
        text-shadow: 0px 0px 6px rgba(0, 253, 0, 1);
        color: rgba(0, 253, 0, 1);
        font-weight: 700;
      }
    }
    .right_section {
      p:nth-child(1) {
        text-transform: uppercase;
      }
      p:nth-child(2) {
        text-transform: uppercase;
        text-shadow: 0px 0px 6px rgba(0, 253, 0, 1);
        color: rgba(0, 253, 0, 1);
        font-weight: 700;
        text-align: right;
        padding-inline: 10px;
      }
    }
  }
  .jungle_hub_earnings {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    .left_section {
      width: 100%;
      background-color: #000;
      padding: 10px 20px;
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
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .right_section {
      width: 100%;
      background-color: #000;
      padding: 10px 20px;
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
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
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
  .withdraw_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 250px;
    margin-inline: auto;
    border-radius: 15px;
    margin-top: 30px;
    background-color: rgb(107, 93, 248);
    padding-block: 10px;
    border: none;
    color: white;
    font-weight: 700;
  }

  .jungle_hub_right_section {
    .section_cards {
      background-color: rgba(13, 27, 38, 0.7);
      padding: 40px 30px;
      border-radius: 20px;
    }
    .map_heading {
      font-size: 16px;
      text-transform: uppercase;
      line-height: normal;
    }
    .img_content {
      display: flex;
      align-items: start;
      justify-content: space-between;
      margin-top: 10px;
      p {
        font-size: 28px;
        font-weight: 800;
        text-transform: uppercase;
      }
      img {
        width: 50px;
        height: 40px;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .Jungle_Hub_main {
      display: flex;
      flex-direction: column;
    }
    .jungle_hub_right_section {
      width: 100%;
      max-width: 100%;
    }
    .jungle_hub_left_section {
      width: 100%;
      max-width: 100%;
    }
    .header-content {
      font-size: 34px;
    }
    .main_logo {
      img {
        max-width: 200px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .Jungle_Hub_main {
      padding: 20px;
      margin-top: 0px;
    }
    .main_logo {
      flex-direction: column;
      padding-inline: 20px;
      gap: 0px;
      .header-content {
        font-size: 24px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .eth_heading {
      font-size: 30px;
    }
    .jungle_hub_earnings {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 400px) {
    .pricing_stratygies {
      flex-direction: column;
      .left_section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 20px;
      }
      .right_section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 20px;
      }
    }
  }
`;
export default ParticipantStyledWrapper;
