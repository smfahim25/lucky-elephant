/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import CTA from "../../cta/v1";
import { footerLinksV1 } from "@/src/assets/data/insiteLinks";
import footerLogo from "@/src/assets/images/logo.png";
import backToTopIcon from "@/src/assets/images/icon/back_to_top.svg";

import footerShapesLeft from "@/src/assets/images/icon/footer_shapes_left.png";
import footerShapesRight from "@/src/assets/images/icon/footer_shapes_right.png";

import FooterStyleWrapper from "./Footer.style";

const Footer = () => {
  const [copyrightYear, setCopyrightYear] = useState(new Date());

  return (
    <FooterStyleWrapper>
      <CTA />

      <div className="bithu_v1_main_footer">
        <div className="bithu_v1_main_footer_overlay"></div>
        {/* <div className="three_charectre_img">
          <img src={characterShape.src} alt="bithu nft character" />
        </div> */}
        <div className="Footer_Images ">
          <img
            src="/assets/images/Community_Images/Tuskey_Logo_sw.png"
            alt=""
            className="img1 "
          />
          <img
            src="/assets/images/LuckyElephant.png"
            className="img2 "
            alt=""
          />
          <img
            src="/assets/images/Community_Images/blokzoologo.png"
            className="img3 "
            alt=""
          />
        </div>

        <div  className="footer_bottom">
          <div className="footer_bottom_content">
            <span className="footer_shapes_left">
              <img src={footerShapesLeft.src} alt="bithu nft footer" />
            </span>
            <span className="footer_shapes_right">
              <img src={footerShapesRight.src} alt="bithu nft footer" />
            </span>
            <div className="container">
              <div className="footer_menu">
                <div className="bottom_footer_left">
                  <div className="footer_logo">
                    <Link className="mobile_menu_main_logo" href="/">
                      <img
                        src="/assets/images/LuckyElephant.png"
                        alt="bithu nft logo"
                        className="mobile_menu_main_logo "
                      />
                      {/* <p>Lucky Elephant Club</p> */}
                    </Link>
                  </div>
                  <div className="copiright_text">
                    <p>Copyright &copy; {copyrightYear.getFullYear()} Lucky Elephant Club</p>
                  </div>
                </div>
                <Link href="# " className="bact_to_top_btn">
                  <img src={backToTopIcon.src} alt="bithu nft back to top" />
                </Link>
                <div className="bottom_footer_right">
                  <ul>
                    {footerLinksV1?.map((item, i) => (
                      <li key={i}>
                        <Link href={item.url}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FooterStyleWrapper>
  );
};

export default Footer;
