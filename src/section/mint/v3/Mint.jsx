
import CountdDown from "@/src/common/countDown";
import Counter from "@/src/common/counter";
import Button from "@/src/common/button";
import MintStyleWrapper from "./Mint.style";

import checkIcon from "@/src/assets/images/icon/mint-right-text-icon.svg";
import data from "@/src/assets/data/mintItems";

const Mint = () => {

  return (
    <MintStyleWrapper>
      <div className="container">
        <div className="mint_header">
          <div className="row align-items-end mint_header_row">
            <div className="col-md-4">
              <h4 className="text-uppercase counter_title">
                Public Mint end in
              </h4>
              <CountdDown date={Date.now() + 1675076996} />
            </div>
            <div className="col-md-4 text-center">
              <div className="mint_counter">
                <Counter end={9999} duration={5555} />
                <span> / 5555</span>
              </div>
            </div>
            <div className="col-md-4">
              <h4 className="sale_status text-right">
                WHITELIST : SOLDOUT
                <span>
                  <img src={checkIcon.src} alt="icon" />
                </span>
              </h4>
            </div>
          </div>
        </div>

        <div className="mint_items">
          <div className="row mint_items_row">
            {data?.map((item, idx) => (
              <div key={idx} className="col-md-4">
                <div className="mint_item_card">
                  <span className="mint_offer_tag"> {item.featuredText} </span>
                  <div className="mint_thumb">
                    <img src={item.thumb.src} alt="mint thumb" />
                  </div>

                  <div className="item_content">
                    <h4>{item.title}</h4>
                    <span className="access_text">{item.accessText}</span>
                    <span>Unti Price: {item.unitPrice}</span>
                    <span>Total: {item.totalPrice}</span>
                  </div>

                  <Button size="lg" variant="mint">
                    {item.btnText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MintStyleWrapper>
  );
};

export default Mint;
