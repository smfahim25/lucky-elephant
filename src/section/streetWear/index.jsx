/* eslint-disable react/no-unescaped-entities */
import wear from "@/src/assets/images/wear.png";
import StreetWearStyleWrapper from "./street.style";
import Button from "@/src/common/button";

const StreetWear = () => {
  return (
    <StreetWearStyleWrapper className="">
      <div className="street">
        <div>
          <p className="title">
            STREET <span className="wear">WEAR</span> COLLECTIONS
          </p>

          <div className="title_2">
            <p className="vertical">DONATION</p>
            <div className="content_container">
              <p className="title_3">STAY DRIPPED <br className="break" /> OUT</p>
              <p className="title_4">
              Explore and shop our exclusive collection. 10% of every sale will be donated to wildlife conservation.
              </p>
            </div>
          </div>
          <Button
            className="btn"
            size="lg"
            variant="mint"
            onClick={() => mintModalHandle()}
          >
            {" "}
            Shop Now
          </Button>
        </div>
        <div>
          <img src={wear.src} alt="img" className="img" />
        </div>
      </div>
    </StreetWearStyleWrapper>
  );
};

export default StreetWear;



