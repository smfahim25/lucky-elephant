/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/src/common/button";
import BannerV1Wrapper from "./Banner.style";

// Images
import mintLiveDownArrow from "@/src/assets/images/nft/mint_live_down_arrow.svg";
import mintLiveText from "@/src/assets/images/nft/mint_soon_text.png";
import homeImageBG from "@/src/assets/images/nft/home_img_bg.png";
import elephant2D from "/public/assets/images/elephants.png";
import teaser3D from "/public/assets/images/Teaser.png";
import teaser2D from "/public/assets/images/Teaser2.png";

// Import Metaplex libraries to create a local, read-only Umi instance.
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { createNoopSigner, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { fetchCandyMachine, safeFetchCandyGuard, AccountVersion } from "@metaplex-foundation/mpl-candy-machine";

// Total supply constant (fallback/default)
const TOTAL_SUPPLY = 7777;

const Banner = () => {
  const router = useRouter();

  // Create a local, read-only Umi instance.
  // We use a dummy/noop signer (wrapped with signerIdentity) since we only need to read on-chain data.
  const umi = createUmi("https://api.devnet.solana.com")
    .use(mplCandyMachine())
    .use(signerIdentity(createNoopSigner(publicKey("11111111111111111111111111111111"))));

  // State to hold on-chain data for display
  const [mintedNFTs, setMintedNFTs] = useState(0);
  const [totalSupplyState, setTotalSupplyState] = useState(TOTAL_SUPPLY);
  const [mintPrice, setMintPrice] = useState(0.10); // default public mint price of 0.10 SOL
  const [collectionName, setCollectionName] = useState("LIL ELLY DEGENS");

  // For image slider
  const [currentImage, setCurrentImage] = useState(teaser3D);
  const images = [teaser3D, teaser2D, elephant2D];

  // Rotate images every 5 seconds
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  // Inline function to fetch candy machine & guard data (for display only)
  useEffect(() => {
    const fetchData = async () => {
      const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID;
      if (!candyMachineId) {
        console.error("Candy Machine ID not provided");
        return;
      }
      try {
        // Use the "publicKey" function from "@metaplex-foundation/umi"
        const cm = await fetchCandyMachine(umi, publicKey(candyMachineId));
        if (cm && cm.data) {
          setTotalSupplyState(Number(cm.data.itemsAvailable));
          setMintedNFTs(Number(cm.itemsRedeemed));
        }
        // Try fetching candy guard to update mint price if available
        try {
          const guard = await safeFetchCandyGuard(umi, cm.mintAuthority);
          if (guard && guard.groups) {
            // Look for the "public" guard group – adjust the label if needed
            const publicGroup = guard.groups.find((group) => group.label === "public");
            if (publicGroup && publicGroup.guards.solPayment.__option === "Some") {
              const solPayment =
                Number(publicGroup.guards.solPayment.value.lamports.basisPoints) /
                10 ** Number(publicGroup.guards.solPayment.value.lamports.decimals);
              setMintPrice(solPayment);
            }
          }
        } catch (err) {
          console.error("Error fetching candy guard, using default mint price", err);
          // Default mintPrice of 0.10 SOL remains
        }
      } catch (err) {
        console.error("Error fetching candy machine data", err);
      }
    };
    fetchData();
  }, [umi]);

  return (
    <BannerV1Wrapper id="home">
      <div className="container">
        <div className="row">
          {/* Left Section */}
          <div className="col-lg-6">
            <div className="bithu_v1_baner_left">
              <div className="header_main_content">
                <p className="header-content">{collectionName}</p>
                <p className="header-content">SOL NFT Collection By LEC</p>
              </div>
              <h3>
                <span className="count">{mintedNFTs}</span> / {totalSupplyState} Minted
              </h3>
              <div className="banner_buttons">
                <Button size="lg" variant="mint" onClick={() => router.push("/mint2d")}>
                  Mint Coming Soon
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() =>
                    window.open("https://heymint.xyz/lilellydegens", "_blank")
                  }
                >
                  Whitelist Now
                </Button>
              </div>
              <div className="coin-info">
                <span>
                  LIMITED OG SPOTS = 1 FREE MINT = JOIN DISCORD NOW 
                </span>
                <span>
                  Public Max per wallet: 10 NFTs. Price: {mintPrice} SOL + fees
                </span>
                <span>
                  {mintedNFTs >= totalSupplyState ? "Sold Out" : "Mint is Live"}
                </span>
              </div>
            </div>
          </div>
          {/* Right Section with Image Slider */}
          <div className="col-lg-6">
            <div className="bithu_v1_baner_right">
              <div className="bithu_v1_baner_right_img_sect">
                <div className="mint_live_circle_sect">
                  <div className="mint_live_circle">
                    <span>
                      <img src={mintLiveDownArrow.src} alt="Arrow" />
                    </span>
                    <span className="mint_live_text rotated-style">
                      <img src={mintLiveText.src} alt="Mint Soon" />
                    </span>
                  </div>
                </div>
                <div className="bithu_v1_baner_right_img_bg">
                  <img src={homeImageBG.src} alt="Background" />
                </div>
                <div className="bithu_v1_baner_right_img">
                  <img src={currentImage.src} alt="Character" width={"100%"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerV1Wrapper>
  );
};

export default Banner;
