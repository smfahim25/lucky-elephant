import PageHeaderStyleWrapper from "./PageHeader.style"; // Keep the styles for the container

// Import the transparent PNG title
import titleImage from "@/src/assets/images/bg/breadcumb-bg.png";

const PageHeader = () => {
  return (
    <PageHeaderStyleWrapper>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12"> {/* Updated to take full width */}
            <div className="breadcrumb_area">
              {/* Remove the Home Link and breadcrumb text */}
              <div className="breadcrumb_menu">
                {/* Add the title image */}
                <img
                  className="title_image"
                  src={titleImage.src}
                  alt="LUCKY MARKETPLACE"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageHeaderStyleWrapper>
  );
};

export default PageHeader;

