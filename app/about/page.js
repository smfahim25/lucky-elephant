"use client";
import { useModal } from "@/src/utils/ModalContext";
import Header from "@/src/section/header/v1/Header";
import PageHeader from "@/src/common/pageHeader/v2";
import About from "@/src/section/about/v1";
import HowToMint from "@/src/section/howToMint/v3";
import Counter from "@/src/section/counter/v1";
import Team from "@/src/section/team/v6";
import CTA from "@/src/section/cta/v1";
import Footer from "@/src/section/footer/v3";
import Popup from "@/src/section/popup";
import WalletModal from "@/src/common/modal/walletModal/WalletModal";
import MetamaskModal from "@/src/common/modal/metamaskModal/MetamaskModal";

export default function AboutPage() {
  const { metamaskModal, walletModalvisibility, isPopup, popupHandle } =
    useModal();

  return (
    <>
      {isPopup && <Popup popupHandle={popupHandle} />}
      {metamaskModal && <MetamaskModal />}
      {walletModalvisibility && <WalletModal />}
      <Header />
      <PageHeader />
      <About />
      <HowToMint />
      <Counter />
      <Team />
      <CTA />
      <Footer />
    </>
  );
}
