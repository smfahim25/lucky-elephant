/* eslint-disable @next/next/no-img-element */
import SectionTitle from "@/src/common/sectionTitle";

import AboutInfoCardList from "../aboutInfoCardList";

import data from "@/src/assets/data/about/aboutv1";
import aboutThumb1 from "@/src/assets/images/nft/about_us_img1.png";
import aboutThumb2 from "@/src/assets/images/nft/about_us_img2.png";
import AboutStyleWrapper from "./About.style";

const About = () => {
  const { aboutDescription1, aboutDescription2 } = data;
  return (
    <AboutStyleWrapper id="about">
      <div className="container">
        <div className="row flex-row-reverse">
          <div className="col-md-6">
            <div className="v1_about_us_right_sect">
              <SectionTitle title="ABOUT US" subtitle="THE STORY " />
              <div className="v1_about_us_right_text">
                <p>{aboutDescription1}</p>
                <p>{aboutDescription2}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="v1_about_us_left_sect sm-mt-60">
              <div className=" ">
                {/* <div className="v1_about_us_img v1_about_us_img1">
                </div>
                <div className="v1_about_us_img1_shapes">
                <div className="v1_about_us_img1_shapes_left">
                <div className="shape_1"></div>
                <div className="shape_2"></div>
                </div>
                <div className="v1_about_us_img1_shapes_right">
                <div className="shape_3"></div>
                </div>
                </div> */}
                <img
                  src="/assets/images/AboutUsImgOne.png"
                  className="v1_about_us_img_card1 "
                  alt="img"
                />
              </div>
              <div className=" ">
                {/* <div className="v1_about_us_img v1_about_us_img2">
                  <img src={aboutThumb2.src} alt="img" />
                </div>
                <div className="v1_about_us_img2_shapes">
                  <div className="v1_about_us_img2_shapes_left">
                    <div className="shape_1"></div>
                    <div className="shape_2"></div>
                  </div>
                  <div className="v1_about_us_img2_shapes_right">
                    <div className="shape_3"></div>
                  </div>
                </div> */}
                <img
                  src="/assets/images/AboutUsImgTwo.png"
                  className="v1_about_us_img_card2 "
                  alt="img"
                />
              </div>
            </div>
          </div>
        </div>
        {/* about card  */}
        <AboutInfoCardList />
      </div>
      <div className="Gif ">
        <img
          src="https://theluckyclubshop.com/wp-content/uploads/2024/10/JungleVerse_Gif.gif"
          className="Video_Gif"
          alt="img"
        />
      </div>
      {/* <div className="Gif ">
        <img src="/assets/images/Benefits.png" className="" alt="img" />
      </div> */}
    </AboutStyleWrapper>
  );
};

export default About;
