/*==========================================================
  FILE: src/section/header/pageMenu/header.jsx
==========================================================*/

/**********************************************************************************************
 * CHANGES:
 * 1) Removed any old @web3modal/wagmi/react imports.
 * 2) Added: import { useAppKit } from '@reown/appkit/react'.
 * 3) Replaced the connect button call with onClick={() => open()} from Reown's useAppKit().
 *
 * Everything else remains exactly as before: same styling, layout, menu toggles, etc.
 **********************************************************************************************/

import { useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react";  // Reown's hook
import Button from "@/src/common/button";
import { conciseAddress } from "@/src/utils/helper";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaDiscord } from "react-icons/fa";
import { MdNotes } from "react-icons/md";
import MobileMenu from "../mobileMenu/MobileMenu";
import NavWrapper from "./Header.style";
import { useAccount } from "wagmi";

const Header = () => {
  // Reown usage
  const { open } = useAppKit();
  // wagmi usage for retrieving the connected address
  const { address } = useAccount();

  const router = useRouter();
  const path = usePathname();

  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  useEffect(() => {
    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });

    return () => {
      window.removeEventListener("sticky", handleScroll);
    };
  }, []);

  return (
    <>
      <NavWrapper className={path == '/' ? 'bithu_header_home' : 'bithu_header'} id="navbar">
        <div className="">
          {/* Main Menu Start */}
          <div className="bithu_menu_sect">
            <div className="bithu_menu_left_sect">
              <div
                className="main_logo"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                href="/"
              >
                <img
                  src="/assets/images/LuckyElephant.png"
                  alt="LEC nft logo"
                />
                <p className="header-content logo-text" style={{}}>
                  Lucky Elephant Club
                </p>
              </div>
            </div>

            <div className="bithu_menu_right_sect bithu_v1_menu_right_sect">
              <div className="bithu_menu_list">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link target="_blank" href="https://theluckyclubshop.com">
                      Clothing Line
                    </Link>
                  </li>
                  <li>
                    <button
                      className="staking_btn"
                      onClick={() => router.push("/jungle-hub")}
                    >
                      Jungle Hub
                    </button>
                  </li>
                  <li>
                    <button
                      className="staking_btn"
                      onClick={() => router.push("/lucky-market")}
                    >
                      Marketplace
                    </button>
                  </li>
                  <li>
                    <button
                      className="staking_btn"
                      onClick={() => router.push("/governance")}
                    >
                      Governance
                    </button>
                  </li>
                  <li className="submenu">
                    <Link href="/mint">Mint</Link>
                  </li>
                </ul>
              </div>
              <div
                className="bithu_menu_btns"
                style={{
                  display: "flex",
                }}
              >
                <button className="menu_btn" onClick={handleMobileMenu}>
                  <MdNotes />
                </button>

                <a href="https://discord.gg/gjnKPwRRCc" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="join_btn">
                    <FaDiscord /> Join
                  </Button>
                </a>

                {/* Connect button -> Reown's open() */}
                <Button
                  size="sm"
                  variant="outline"
                  className="join_btn"
                  onClick={() => open()}
                  style={{ marginLeft: "10px" }}
                >
                  {address ? conciseAddress(address) : "Connect"}
                </Button>
                {/* <WalletConnect /> (Removed old references if any) */}
              </div>
            </div>
          </div>
          {/* Main Menu END */}
        </div>
      </NavWrapper>

      {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
    </>
  );
};

export default Header;