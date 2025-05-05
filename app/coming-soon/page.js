"use client";
import { useModal } from "@/src/utils/ModalContext";
import Header from "@/src/section/header/v2";
import Upcoming from "@/src/section/upcoming";
import MintNowModal from "@/src/common/modal/mintNowModal";
import MetamaskModal from "@/src/common/modal/metamaskModal/MetamaskModal";
import Popup from "@/src/section/popup";
import ConnectWallet from "@/src/common/ConnectWallet";

export default function ComingSoon() {
  const {
    visibility,
    metamaskModal,
    walletModalvisibility,
    isPopup,
    popupHandle,
  } = useModal();

  return (
    <>
      {isPopup && <Popup popupHandle={popupHandle} />}
      {metamaskModal && <MetamaskModal />}
      {visibility && <MintNowModal />}
      {walletModalvisibility && <ConnectWallet />}
      <Header />
      <Upcoming />
    </>
  );
}

