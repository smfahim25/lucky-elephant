/* eslint-disable @next/next/no-img-element */
import { FaDiscord } from "react-icons/fa";
import SectionTitle from "@/src/common/sectionTitle";
import Button from "@/src/common/button";
import data from "@/src/assets/data/socialProfile";

import hoverShape from "@/src/assets/images/icon/hov_shape_s.svg";
import particleShape1 from "@/src/assets/images/icon/star_1.svg";
import particleShape2 from "@/src/assets/images/icon/star_2.svg";
import particleShape3 from "@/src/assets/images/icon/star_3.svg";
import particleShape4 from "@/src/assets/images/icon/star_4.svg";
import particleShape5 from "@/src/assets/images/icon/star_5.svg";
import particleShape6 from "@/src/assets/images/icon/star_6.svg";
import particleShape7 from "@/src/assets/images/icon/star_7.svg";

import CTAStyleWrapper from "./Cta.style";
import Link from "next/link";

const CTA = () => {
  const particleShapes = [
    particleShape6,
    particleShape3,
    particleShape1,
    particleShape7,
    particleShape4,
    particleShape2,
    particleShape5,
  ];
  return (
    <CTAStyleWrapper>
      <div className="container">
        <SectionTitle
          className="bithu_title_section text-center header-content"
          title="Join Our community & get Early access"
        />
        <div className="title-emo">🤙</div>
        <div className="bithu_v1_cta_content">
          <div className="join_comunity_btns">
            <a
              href="https://heymint.xyz/theluckyelephantclub-whitelist"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="mint" className="wishlist_btn">
                Whitelist Now
              </Button>
            </a>
            <a
              href="https://discord.gg/gjnKPwRRCc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="blue" className="join_discord_btn">
                {" "}
                <FaDiscord /> Join Discord
              </Button>
            </a>
          </div>
          <div className="cta_social_links">
            <ul>
              {data?.map((item, i) => (
                <li key={i}>
                  <Link target="_blank" href={item.url}>
                    {item.thumb ? (
                      <img src={item.thumb.src} alt="bithu nft profiles" />
                    ) : (
                      item.icon
                    )}
                  </Link>
                  <img
                    className="social_hover_shape"
                    src={hoverShape.src}
                    alt="bithu nft hover"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="footer_stras_sect">
            <div className="footer_stars">
              {/* {particleShapes?.map((shape, i) => (
                <span key={i} className={`star_${i + 1}`}>
                  <img src={shape.src} alt="bithu nft background particle" />
                </span>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </CTAStyleWrapper>
  );
};

export default CTA;
