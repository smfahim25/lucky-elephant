import { useModal } from "@/src/utils/ModalContext";
import GlobalStyles from "@/src/assets/styles/GlobalStyles";
import Layout from "@/src/common/layout";
import Header from "@/src/section/header/v2";
import Banner from "@/src/section/banner/v5";
import About from "@/src/section/about/v5";
import RoadMap from "@/src/section/roadMap/v5";
import FAQ from "@/src/section/faq/v5";
import Team from "@/src/section/team/v5";
import Mint from "@/src/section/mint/v1";
import MetamaskModal from "@/src/common/modal/metamaskModal/MetamaskModal";
import MintNowModal from "@/src/common/modal/mintNowModal";
import WalletModal from "@/src/common/modal/walletModal/WalletModal";
import StyleWrapper from "./StyleWrapper";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const HomeSlider = () => {
  const { visibility, walletModalvisibility, metamaskModal } = useModal();

  return (
    <>
      {metamaskModal && <MetamaskModal />}
      {visibility && <MintNowModal />}
      {walletModalvisibility && <WalletModal />}
      <Header />

      <StyleWrapper>
        <Tabs>
          <TabList>
            <Tab>
              <span>01.</span> Home
            </Tab>
            <Tab>
              <span>02.</span> About
            </Tab>
            <Tab>
              <span>03.</span> Roadmap
            </Tab>
            <Tab>
              <span>04.</span> Team
            </Tab>
            <Tab>
              <span>05.</span> FAQ
            </Tab>
            <Tab>
              <span>06.</span> Mint
            </Tab>
          </TabList>

          <TabPanel>
            <Banner />
          </TabPanel>
          <TabPanel>
            <About />
          </TabPanel>
          <TabPanel>
            <RoadMap />
          </TabPanel>
          <TabPanel>
            <Team />
          </TabPanel>
          <TabPanel>
            <FAQ />
          </TabPanel>
          <TabPanel>
            <Mint />
          </TabPanel>
        </Tabs>
      </StyleWrapper>
    </>
  );
};

export default HomeSlider;
