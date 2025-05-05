/* eslint-disable @next/next/no-img-element */
import Counter from "@/src/common/counter";
import bgShape1 from "@/src/assets/images/icon/square_shape_1.png";
import bgShape2 from "@/src/assets/images/icon/square_shape_2.png";

import CoinInfoCounterWrapper from "./Counter.style";
import coinInfoCounterData from "@/src/assets/data/coinInfoCounter.json";

const GovernanceBanner = () => {
  const { info } = coinInfoCounterData;

  return (
    <CoinInfoCounterWrapper>
      <div className="banner_content">
        <p className="headings_text">GOVERNANCE</p>
        <input
          type="text"
          placeholder="Search Proposals"
          className="input_text"
          onChange={(e) => {
            console.log("e");
          }}
        />
      </div>
      <img
        src={bgShape2.src}
        className="bg-shape shape-left shape-top"
        alt="bithu bg shape"
      />
      <img
        src={bgShape1.src}
        className="bg-shape shape-left shape-bottom"
        alt="bithu bg shape"
      />
      <img
        src={bgShape2.src}
        className="bg-shape shape-right shape-top"
        alt="bithu bg shape"
      />
      <img
        src={bgShape1.src}
        className="bg-shape shape-right shape-bottom"
        alt="bithu bg shape"
      />
    </CoinInfoCounterWrapper>
  );
};

export default GovernanceBanner;
