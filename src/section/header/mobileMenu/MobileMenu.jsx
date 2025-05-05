/*========================================
  5) src/section/header/mobileMenu/MobileMenu.jsx
========================================*/
import Link from "next/link";
import { useState } from "react";
import { FaDiscord, FaTwitter, FaWallet } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import Button from "@/src/common/button";
import openseaIcon from "@/src/assets/images/icon/opensea.svg";
import MobileMenuStyleWrapper from "./MobileMenu.style";

// Reown's "open" function
import { useAppKit } from "@reown/appkit/react";
import { conciseAddress } from "@/src/utils/helper";
import { useAccount } from "wagmi";

const MobileMenu = ({ mobileMenuhandle }) => {
  const { open } = useAppKit();
  const { address } = useAccount();

  const [isSubmenu, setSubmenu] = useState(false);
  const handleSubmenu = () => setSubmenu(!isSubmenu);

  return (
    <MobileMenuStyleWrapper className="bithu_mobile_menu">
      <div className="bithu_mobile_menu_content">
        <div className="mobile_menu_logo">
          <Link className="mobile_menu_main_logo" href="/">
            <img src="/assets/images/LuckyElephant.png" alt="bithu nft logo" />
          </Link>
          <button
            className="mobile_menu_close_btn"
            onClick={() => mobileMenuhandle()}
          >
            <BsXLg />
          </button>
        </div>

        <div className="bithu_mobile_menu_list">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/jungle-hub">Jungle Hub</Link></li>
            <li><Link href="/lucky-market">Marketplace</Link></li>
            <li><Link href="/governance">Governance</Link></li>
            <li className="submenu mobile_submenu" onClick={handleSubmenu}>
              <Link href="/mint">Mint</Link>
            </li>
          </ul>
        </div>

        <div className="mobile_menu_social_links">
          <Link href="https://opensea.io/collection/official-lucky-elephant-club-jungleverse">
            <img src={openseaIcon.src} alt="bithu social icon" />
          </Link>
          <Link href="https://twitter.com/LuckyEllyClub">
            <FaTwitter />
          </Link>
          <Link href="https://discord.gg/gjnKPwRRCc">
            <FaDiscord />
          </Link>
        </div>

        <Button
          size="sm"
          variant="hovered"
          className="connect_btn"
          onClick={() => open()}
        >
          <FaWallet /> {address ? conciseAddress(address) : "Connect"}
        </Button>
      </div>
    </MobileMenuStyleWrapper>
  );
};

export default MobileMenu;
