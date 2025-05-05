/* eslint-disable @next/next/no-img-element */
import React from "react";
import Slider from "react-slick";
import BenefitsStyleWrapper from "./Benefits.style";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Benefits() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <BenefitsStyleWrapper>
    <div className="section_title">
      <h2>Lucky Utilities</h2>
    </div>
    <div className="main_benefits_bg">
      <div className="Coin_Bg">
        <img
          src="/assets/images/Benefits_Main.png"
          className="benefits_main_img"
          alt=""
        />
        </div>
      </div>
      
      {/* Video Slider */}
      <div className="video_slider_wrapper">
        <Slider {...settings}>
          <div className="video_slide">
            <iframe
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/XGnqhteU1iQ"
              title="Train Scene animation Part 1 next Destination to the jungleverse"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video_slide">
            <iframe
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/QEWorJZA0qY"
              title="Link up in the Jungleverse Part 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video_slide">
            <iframe
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/zU8yw7X-B5g"
              title="Promo Video Part 3"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Slider>
      </div>
      
      <div className="Clothing_Main_Div">
        <img
          src="https://theluckyclubshop.com/wp-content/uploads/2024/10/h1_main_background-2.gif"
          className="Clothing_Gif"
          alt=""
        />
      </div>
    </BenefitsStyleWrapper>
  );
}
