/*------------------------------------------------------------------
  src/section/header/v2/Navigation/Navigation.jsx
------------------------------------------------------------------*/
import Link from "next/link";
import {
  FaLinkedinIn,
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { FaPinterest, FaXTwitter } from "react-icons/fa6";
import { useModal } from "@/src/utils/ModalContext";

import Popup from "@/src/section/popup";
import home1 from "@/src/assets/images/nft/index1.png";
import home2 from "@/src/assets/images/nft/index2.png";
import home3 from "@/src/assets/images/nft/index3.png";
import home4 from "@/src/assets/images/nft/index4.png";
import home5 from "@/src/assets/images/nft/index-5.png";

import logo from "@/src/assets/images/mint-logo.png";
import openseaIcon from "@/src/assets/images/icon/opensea.svg";
import mediumIcon from "@/src/assets/images/icon/med.svg";
import hoverShape from "@/src/assets/images/icon/hov_shape_s.svg";
import mailIcon from "@/src/assets/images/icon/mail_icon.svg";
import IconClose from "@/src/assets/images/icon/mint-menu_x_icon..svg";

import NavigationWrapper from "./Navigation.style";
import Button from "@/src/common/button";

const Navigation = ({ mobileMenuHandle }) => {
  const { isPopup, popupHandle } = useModal();

  return (
    <NavigationWrapper>
      <div className="container">
        <div className="navigation_header">
          <img src={logo.src} alt="logo" />
          <h2 className="menu_title">Menu</h2>

          <div className="close_btn">
            <Button size="sm" variant="outline" onClick={() => mobileMenuHandle()}>
              <img src={IconClose.src} alt="icon" />
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="navigation_left">
              <div className="menu_widgets">
                <h3>Lucky Guide</h3>
                <div className="home_pages">
                  <Link href="/">
                    <img src={home1.src} alt="icon" />
                  </Link>
                  <Link href="/mint2d">
                    <img src={home2.src} alt="icon" />
                  </Link>
                  <Link href="/jungle-hub">
                    <img src={home3.src} alt="icon" />
                  </Link>

                  <Link href="/governance">
                    <img src={home4.src} alt="icon" />
                  </Link>
                  <Link href="https://theluckyclubshop.com">
                    <img src={home5.src} alt="icon" />
                  </Link>
                </div>
              </div>
              {/* popup */}
              {isPopup && <Popup popupHandle={popupHandle} />}
            </div>
          </div>
          <div className="col-md-6">
            <div className="navigation_right">
              <div className="menu_widgets">
                <h3>UPDATES & CONTACT</h3>

                <div className="pages_list">
                  <Link href="/mint2d">2D Mint</Link>
                  <Link href="/mint">3D Mint</Link>
                  <Link href="/coming-soon">Coming Soon</Link>
                  <Link href="/blogs">Blog</Link>
                  <Link href="/lucky-market">Marketplace</Link>
                  <Link href="contact">Contact Us</Link>
                </div>
              </div>
              <div className="menu_widgets">
                <h3>JOIN US</h3>

                <div className="social_links">
                  <Link href="https://opensea.io/collection/official-lucky-elephant-club-jungleverse">
                    <img src={openseaIcon.src} alt="icon" />
                    <span className="hover_shape">
                      <img src={hoverShape.src} alt="shape" />
                    </span>
                  </Link>
                  <Link href="https://www.youtube.com/@luckyelephantclub">
                    <FaYoutube />
                    <span className="hover_shape">
                      <img src={hoverShape.src} alt="shape" />
                    </span>
                  </Link>
                  <Link href="https://instagram.com/luckyellyclub/">
                    <FaInstagram />
                    <span className="hover_shape">
                      <img src={hoverShape.src} alt="shape" />
                    </span>
                  </Link>
                  <Link href="https://twitter.com/LuckyEllyClub">
                    <FaXTwitter />
                    <span className="hover_shape">
                      <img src={hoverShape.src} alt="shape" />
                    </span>
                  </Link>
                  <Link href="https://www.pinterest.com/theluckyelephantclub/">
                    <FaPinterest />
                    <span className="hover_shape">
                      <img src={hoverShape.src} alt="shape" />
                    </span>
                  </Link>
                  <Link href="https://medium.com/@theluckyelephantclub/lucky-elephant-club-jungleverse-luckypaper-2-0-748b7aeeefce">
                    <img src={mediumIcon.src} alt="icon" />
                    <span className="hover_shape">
                      <img src={hoverShape.src} alt="shape" />
                    </span>
                  </Link>
                </div>
              </div>

              <div className="menu_widgets contact_address">
                <h3>
                  {" "}
                  <img src={mailIcon.src} alt="icon" /> MAIL US
                </h3>
                <p>Inquiries: info@luckyelephant.io</p>
                <p>Brand Support: info@theluckyclubshop.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationWrapper>
  );
};

export default Navigation;