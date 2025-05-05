import styled from "styled-components";
import Coin_Img from "@/public/assets/images/Benefits_Coin.png";

const BenefitsStyleWrapper = styled.section`
  .section_title {
    text-align: center; /* Center the title */
    margin-top: 30px; /* Add space below the title */
    margin-bottom: 20px; /* Add space below the title */
    
    h2 {
      font-family: "Bakbak One", sans-serif; /* Use Bakbak font */
      font-size: 56px; /* Adjust font size */
      color: #fff; /* Set title color */
      font-weight: bold; /* Make the title bold */
      text-transform: uppercase; /* Make the title uppercase */
      margin: 0; /* Remove default margin */
    }
  }

  .main_benefits_bg {
    background-color: transparent; /* Make the background transparent */
    margin-top: 100px;
    min-height: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    padding-block: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Coin_Bg {
    background-image: url(${Coin_Img.src});
    min-height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .benefits_main_img {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video_slider_wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 50px auto; /* Center the slider and add margin for spacing */
    padding: 0 20px; /* Add padding to prevent the video from touching the edges on smaller screens */
  }

  .video_slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  iframe {
    width: 100%;
    max-width: 100%;
    height: 500px;
  }

  .Clothing_Gif {
    width: 100%;
    max-width: 1000px;
    height: 80vh; /* Adjust height for optimal viewing */
    padding-block: 50px; /* Adjust padding for better responsiveness */
  }

  .Clothing_Main_Div {
    margin-top: 100px;
    background-color: transparent; /* Make the background transparent */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 1500px) {
    .Clothing_Gif {
      height: 600px; /* Further reduce height for large tablets */
    }
    iframe {
      height: 400px; /* Adjust iframe height for large tablets */
    }
  }

  @media screen and (max-width: 1024px) {
    .Clothing_Gif {
      height: 500px; /* Adjust for smaller screens */
    }
    iframe {
      height: 350px; /* Adjust iframe height for smaller screens */
    }
  }

  @media screen and (max-width: 768px) {
    .Clothing_Gif {
      height: 400px; /* Mobile screens optimization */
    }
    .main_benefits_bg {
      min-height: 60vh; /* Adjust main background for mobile */
    }
    iframe {
      height: 300px; /* Adjust iframe height for mobile devices */
    }
  }

  @media screen and (max-width: 480px) {
    .Clothing_Gif {
      height: 300px; /* Further adjustment for very small screens */
      padding-block: 30px; /* Reduce padding for smaller screens */
    }
    iframe {
      height: 250px; /* Further adjust iframe height for very small screens */
    }
  }
`;

export default BenefitsStyleWrapper;
