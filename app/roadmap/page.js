"use client";
import { useModal } from "@/src/utils/ModalContext";
import Header from "@/src/section/header/v1/Header";
import PageHeader from "@/src/common/pageHeader/v3";
import RoadMap from "@/src/section/roadMap/v6";
import CTA from "@/src/section/cta/v1";
import Footer from "@/src/section/footer/v3";
import MetamaskModal from "@/src/common/modal/metamaskModal/MetamaskModal";
import Popup from "@/src/section/popup";
import ConnectWallet from "@/src/common/ConnectWallet";

export default function Roadmap() {
  const { walletModalvisibility, metamaskModal, isPopup, popupHandle } =
    useModal();

  return (
    <>
      {isPopup && <Popup popupHandle={popupHandle} />}
      {metamaskModal && <MetamaskModal />}
      {walletModalvisibility && <ConnectWallet />}
      <Header />
      <PageHeader />
      <RoadMap />
      <CTA />
      <Footer />
    </>
  );
}
