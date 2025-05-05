"use client";
import { useModal } from "@/src/utils/ModalContext";
import Header from "@/src/section/header/pageMenu/header";
import PageHeader from "@/src/common/pageHeader/v4";
import Collection from "@/src/section/collection";
//import CTA from "@/src/section/cta/v1";
import Footer from "@/src/section/footer/v1";
import MetamaskModal from "@/src/common/modal/metamaskModal/MetamaskModal";
import Popup from "@/src/section/popup";
import ConnectWallet from "@/src/common/ConnectWallet";
export default function Collections() {
  // const { walletModalvisibility, metamaskModal, isPopup, popupHandle } =
  //   useModal();

  return (
    <>
      <Header />
      <PageHeader />
      <Collection />
      <Footer />
    </>
  );
}
