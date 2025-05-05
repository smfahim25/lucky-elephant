import styled from "styled-components";
import streetwear_bg from "@/src/assets/images/streetwear_bg.jpeg";

const StreetWearStyleWrapper = styled.section`
  background-image: url(${streetwear_bg.src});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: cover;
  width: 100%;
  .street {
    padding-block: 120px;
    margin-top: 120px;
    margin-inline: auto;
    max-width: 1190px;
    padding-inline: 50px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .title {
    color: white;
    font-family: 'Bakbak One';
    font-style: normal;
    font-weight: 400;
    font-size: 54px;
    line-height: 42px;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  .title_2 {
    display: grid;
    grid-template-columns: repeat(2);
    
  }
  .title_3 {
    color: white;
    /* border: red 2px solid; */
    letter-spacing: 4px;
    margin-top: -80px;
    font-family: 'Bakbak One';
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 42px;
    text-transform: uppercase;
    padding-left: 32px;
    margin-bottom: 0;
  }
  .title_4 {
    color: white;
    font-family: 'Bakbak One';
    font-style: normal;
    font-weight: 400;
    /* font-size: 48px; */
    /* line-height: 42px; */
    text-transform: uppercase;
    padding-left: 32px;
    margin-bottom: 0;
  }
  .wear {
    font-family: 'Bakbak One';
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 25px;
    text-transform: uppercase;
    color: #00ffa3;
    margin-bottom: 0;
  }
  .vertical {
    font-size: 28px;
    rotate: 270deg;
    margin-top: 66px;
    margin-left: -60px;
    color: #00ffa3;
  }
  .img {
    width: 100%;
    max-width: 661px;
    /* height: 377px; */
  }

  .btn {
    width: 180px;
    font-size: 14px;
background-color: #FFFFFF33;
    margin-top: 28px;
    color:#fff;
    font-weight: 700;
  }
   .btn:hover {
        color: #000;
        } 

  p {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    color: rgba(255, 255, 255, 0.8);
    /* max-width: 270px; */
    margin: auto;
    margin-bottom: 0;
  }

  @media only screen and (max-width: 991px) {

    @media only screen and (max-width: 767px) {
      
        .title_4{
          font-size: 20px;
        }
      
          .btn{
        width:100%;
        margin-top: 50px;
        
          }
      }
        .street{
        display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding-inline:16px;
    width:100%;
    padding-top: 65px;
    place-items:center;
    }
    }
    .img{
    margin-top:50px;
    }
  };
  

    @media only screen and (max-width: 500px) {
    
    .content_container{
      margin-top: -20px;
    }
    .title {
    font-size: 24px !important;
    
  }

  .title_2 {
    display: grid;
    grid-template-columns: repeat(2);
    /* font-size: 24px !important; */
    /* height: 150px; */
  }
  .title_3 {
    font-size: 24px !important;
    margin: 0px 0px;
    letter-spacing: 0px;
    /* margin-top: -10px; */
   
    text-transform: uppercase;
    padding-left: 2px;
    
  }
  .break{
    display: none;
  }
  .wear {
  font-size: 24px !important;
  
  }
  }
`;

export default StreetWearStyleWrapper;
