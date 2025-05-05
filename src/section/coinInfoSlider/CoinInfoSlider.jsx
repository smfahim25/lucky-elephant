import { Slider, SliderItem } from "@/src/common/slider/Slider";
import ConinInfoSliderWrapper from "./CoinInfoSlider.style";
import data from "@/src/assets/data/coinSlider";
const CoinInfoSlider = () => {
  const sliderSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    pauseOnHover: false,
    speed: 1500,
    autoplaySpeed: 1500,
    cssEase: "linear",
    centerMode: true,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 667,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <ConinInfoSliderWrapper className="coin_info_slider">
      <Slider {...sliderSettings}>
        {data?.map((item, idx) => (
          <SliderItem key={idx}>
            <div className="slide_item">
              <img src={item.icon.src} alt="icon" />
              {item.text}
            </div>
          </SliderItem>
        ))}
      </Slider>
    </ConinInfoSliderWrapper>
  );
};

export default CoinInfoSlider;
