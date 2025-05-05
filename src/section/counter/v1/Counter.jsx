import { useState, useEffect } from "react";
import Counter from "@/src/common/counter";
import bgShape1 from "@/src/assets/images/icon/square_shape_1.png";
import bgShape2 from "@/src/assets/images/icon/square_shape_2.png";
import CoinInfoCounterWrapper from "./Counter.style";

const MAX_SUPPLY = 8888;

const CoinInfoCounter = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalOwners, setTotalOwners] = useState(0);
  const [mintProgress, setMintProgress] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

  // Function to fetch ETH price from a reliable API (CoinGecko)
  const fetchEthPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      setEthPrice(data.ethereum.usd); // Set ETH price in USD
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    }
  };

  // Function to fetch other data (items, owners, progress)
  const fetchData = async () => {
    try {
      const [itemsRes, ownersRes, mintRes] = await Promise.all([
        fetch("/api/totalItems"),
        fetch("/api/totalOwners"),
        fetch("/api/mintProgress"),
      ]);

      const itemsData = await itemsRes.json();
      const ownersData = await ownersRes.json();
      const mintData = await mintRes.json();

      setTotalItems(itemsData.totalItems);
      setTotalOwners(ownersData.totalOwners);
      setMintProgress(mintData.mintProgress);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch all data on component mount and set intervals
  useEffect(() => {
    fetchEthPrice(); // Fetch ETH price immediately
    fetchData(); // Fetch NFT-related data

    // Poll for updates every minute
    const ethPriceInterval = setInterval(fetchEthPrice, 60000); // 60 seconds
    const dataInterval = setInterval(fetchData, 300000); // 5 minutes

    return () => {
      clearInterval(ethPriceInterval);
      clearInterval(dataInterval);
    };
  }, []);

  return (
    <CoinInfoCounterWrapper>
      <div className="container">
        <ul>
          <li>
            <h3 className="header-content">
              <Counter end={totalItems} decimal="." decimals="0" />
            </h3>
            <h4>3D Lucky Ellys</h4>
          </li>
          <li>
            <h3 className="header-content">
              <Counter end={totalOwners} decimal="." decimals="0" />
            </h3>
            <h4>Owners (Unique)</h4>
          </li>
          <li>
            <h3 className="header-content">
              <Counter end={mintProgress} decimal="." decimals="2" />
              {"%"} {/* Append % symbol */}
            </h3>
            <h4>Minted</h4>
          </li>
          <li>
            <h3 className="header-content">
              <Counter end={ethPrice} decimal="." decimals="2" prefix="$" />
            </h3>
            <h4>Current ETH Price (USD)</h4>
          </li>
        </ul>
      </div>
      <img
        src={bgShape2.src}
        className="bg-shape shape-left shape-top"
        alt="bg shape"
      />
      <img
        src={bgShape1.src}
        className="bg-shape shape-left shape-bottom"
        alt="bg shape"
      />
      <img
        src={bgShape2.src}
        className="bg-shape shape-right shape-top"
        alt="bg shape"
      />
      <img
        src={bgShape1.src}
        className="bg-shape shape-right shape-bottom"
        alt="bg shape"
      />
    </CoinInfoCounterWrapper>
  );
};

export default CoinInfoCounter;
