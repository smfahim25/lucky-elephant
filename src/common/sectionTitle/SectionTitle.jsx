import sectionTitleShape from "@/src/assets/images/icon/title_shapes.svg";
import sectionTitleShape2 from "@/src/assets/images/icon/title_shapes2.svg";

import SectionTitleWrapper from "./SectionTitle.style";

const SectionTitle = ({ title, subtitle, isCenter,className, ...props }) => {
  return (
    <SectionTitleWrapper {...props}>
      {subtitle && (
        <h2>
          {isCenter ? <img src={sectionTitleShape2.src} alt="" /> : ""}
          {subtitle}{" "}
          <img src={sectionTitleShape.src} alt="bithu nft section title shape" />{" "}
        </h2>
      )}
      {title && <h3 className={className&&className}>{title}</h3>}
    </SectionTitleWrapper>
  );
};

export default SectionTitle;
