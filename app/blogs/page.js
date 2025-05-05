"use client";
import { useModal } from "@/src/utils/ModalContext";
import Header from "@/src/section/header/pageMenu/header";
import PageHeader from "@/src/common/pageHeader/v1";
import BlogList from "@/src/section/blog/blogList/BlogList";
//import CTA from "@/src/section/cta/v1";
import Footer from "@/src/section/footer/v1";
import Popup from "@/src/section/popup"; 
import MetamaskModal from "@/src/common/modal/metamaskModal/MetamaskModal";
import MintNowModal from "@/src/common/modal/mintNowModal";
import ConnectWallet from "@/src/common/ConnectWallet";

export default function Blogs() {
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
      <PageHeader />
      <BlogList />
      <Footer />
    </>
  );
}
