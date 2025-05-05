/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import data from "@/src/assets/data/footer/footerLinks";

import footerLogo from "@/src/assets/images/logo.png";
import backToTopIcon from "@/src/assets/images/icon/back_to_top.svg";
import footerShapesLeft from "@/src/assets/images/icon/footer_shapes_left.png";
import footerShapesRight from "@/src/assets/images/icon/footer_shapes_right.png";

import FooterBottomStyleWrapper from "./FooterBottom.style";

const FooterBottom = () => {
  const [copyrightYear, setCopyrightYear] = useState(new Date());

  return (
    <FooterBottomStyleWrapper className="bithu_v2_main_footer">
      <div className="v2_main_footer">
        <div className="v2_footer_menu">
          <div className="v2_footer_logo">
            <Link className="mobile_menu_main_logo" href="/">
              <img
                src="/assets/images/LuckyElephant.png"
                alt="bithu nft logo"
              />
              {/* <p>Lucky Elephant Club</p> */}
            </Link>
          </div>
          <div className="bottom_footer_menulist">
            <ul>
              {data?.map((item, i) => (
                <li key={i}>
                  <Link href={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="v2_footer_copiright_text">
            <p>
              Copyright &copy; {copyrightYear.getFullYear()} Bithu, All rights
              reserved.
            </p>
          </div>
          <Link href="# " className="bact_to_top_btn">
            <img src={backToTopIcon.src} alt="bithu nft back to top" />
          </Link>
        </div>
      </div>
      <span className="v2_footer_shapes_left">
        <img src={footerShapesLeft.src} alt="bithu nft footer" />
      </span>
      <span className="v2_footer_shapes_right">
        <img src={footerShapesRight.src} alt="bithu nft footer" />
      </span>
    </FooterBottomStyleWrapper>
  );
};

export default FooterBottom;
