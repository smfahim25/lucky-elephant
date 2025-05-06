/*========================================
  FILE: src/section/header/v2/Header.jsx
========================================*/

/**********************************************************************************************
 * CHANGES:
 * 1) Removed any old @web3modal/wagmi/react import.
 * 2) Added import { useAppKit } from '@reown/appkit/react'.
 * 3) Replaced the connect function call from the old library with useAppKit's `open()`.
 *
 * Everything else remains exactly as you had it: the styles,
 * your UI for connecting the wallet, the mobile menu toggle, etc.
 **********************************************************************************************/

"use client"; // <--- Add this at the very top

import { useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react"; // Reown's hook for open/close the modal
import { useAccount } from "wagmi";
import { FaWallet } from "react-icons/fa";
import Navigation from "./Navigation";
import Button from "@/src/common/button";
import HeaderStyleWrapper from "./Header.style";

import logo from "@/src/assets/images/mint-logo.png";
import menuIcon from "@/src/assets/images/icon/mint-menu_icon.svg";
import { conciseAddress } from "@/src/utils/helper";
import dynamic from "next/dynamic";

const Header = ({ solana }) => {
  // 1) Use Reown's `useAppKit` to get `.open()`
  const { open } = useAppKit();
  // 2) Wagmi's `useAccount` for address
  const { address } = useAccount();

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

  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return (
    <>
      <HeaderStyleWrapper id="navbar">
        <div className="header_wrapper bg-transparent">
          <div className="header_left">
            <div className="logo">
              <img src={logo.src} alt="logo" />
            </div>
          </div>

          <div className="header_right">
            <div className="bithu_menu_btns">
              {/* 3) On connect button click => Reown's `open()` */}
              {solana ? (
                <div className="">
                  <WalletMultiButtonDynamic className="text-[14px]" />
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="hovered"
                  className="connect_btn"
                  onClick={() => open()}
                >
                  <FaWallet /> {address ? conciseAddress(address) : "Connect"}
                </Button>
              )}

              <button
                // variant="outline"
                className="text-md rounded-xl bg-[#1e0a25] px-3 py-3 font-bold text-white shadow-lg transition-all hover:from-purple-700 active:scale-95 border-t-2 border-[#833497]"
                onClick={handleMobileMenu}
              >
                <img src={menuIcon.src} alt="menu bar icon" />
              </button>
            </div>
          </div>
          {/* <div className=" xs:!hidden">
            <WalletMultiButtonDynamic className="text-[14px]" />
          </div> */}
        </div>
      </HeaderStyleWrapper>

      {isMobileMenu && <Navigation mobileMenuHandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
