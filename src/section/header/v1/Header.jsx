"use client";
// src/section/header/v1/Header.jsx

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaDiscord, FaWallet } from "react-icons/fa";
import { MdNotes } from "react-icons/md";

// Import the Reown hook for multi-chain addresses
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import NavWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";
import Button from "@/src/common/button";
import { conciseAddress } from "@/src/utils/helper";

export default function Header() {
  const { open } = useAppKit();
  // useAppKitAccount covers addresses for both EVM (via Ethers) and Solana
  const { address, isConnected } = useAppKitAccount();

  const router = useRouter();
  const path = usePathname();

  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => setMobileMenu(!isMobileMenu);

  useEffect(() => {
    const header = document.getElementById("navbar");
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        header?.classList.add("sticky");
      } else {
        header?.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <NavWrapper
        className={path === "/" ? "bithu_header_home" : "bithu_header"}
        id="navbar"
      >
        <div className="">
          <div className="bithu_menu_sect">
            <div className="bithu_menu_left_sect">
              <div
                className="main_logo"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img src="/assets/images/LuckyElephant.png" alt="LEC nft logo" />
                <p className="header-content logo-text">Lucky Elephant Club</p>
              </div>
            </div>
            <div className="bithu_menu_right_sect bithu_v1_menu_right_sect">
              <div className="bithu_menu_list">
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="#about">About</Link></li>
                  <li><Link href="#roadmap">Roadmap</Link></li>
                  <li><Link href="#team">Team</Link></li>
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
                      onClick={() => router.push("/governance")}
                    >
                      Governance
                    </button>
                  </li>
                  <li className="submenu">
                    <Link href="/mint2d">Mint</Link>
                  </li>
                </ul>
              </div>

              <div className="bithu_menu_btns" style={{ display: "flex" }}>
                <button className="menu_btn" onClick={handleMobileMenu}>
                  <MdNotes />
                </button>
                <a
                  href="https://discord.gg/gjnKPwRRCc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline" className="join_btn">
                    <FaDiscord /> Join
                  </Button>
                </a>
                {/* Connect button => Reown's Networks view */}
                <Button
                  size="sm"
                  variant="hovered"
                  className="connect_btn"
                  onClick={() => open()}
                  style={{ marginLeft: "10px" }}
                >
                  <FaWallet />
                  &nbsp;
                  {isConnected && address
                    ? conciseAddress(address)
                    : "Connect"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </NavWrapper>

      {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
    </>
  );
}
