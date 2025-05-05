import Button from "@/src/common/button";
import phoneIcon from "@/src/assets/images/icon/call-outgoing.svg";
import msgIcon from "@/src/assets/images/icon/sms-notification.svg";
import ContactStyleWrapper from "./Contact.style";

const Contact = () => {
  return (
    <ContactStyleWrapper>
      <div className="container">
        <div className="section_tag_line">
          <h4 className="text-uppercase">SAY HELLO !</h4>
          <h2 className="text-uppercase">
            We’d Love To <br />
            Hear From You{" "}
          </h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="left_content">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form_box">
                  <label htmlFor="name">YOUR Name *</label>
                  <input
                    type="text"
                    placeholder="e.g.  Roe Smith"
                    name="name"
                  />
                </div>

                <div className="form_box">
                  <label htmlFor="mail">Email Address *</label>
                  <input
                    type="mail"
                    placeholder="e.g.  example@gmail.com"
                    name="mail"
                  />
                </div>

                <div className="form_box">
                  <label htmlFor="phnNo">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g.  +1 365 256 2556"
                    name="phnNo"
                  />
                </div>

                <div className="form_box">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    name="message"
                    placeholder="Type your Message"
                  ></textarea>
                </div>

                <Button size="lg" variant="mint">
                  Submit Now
                </Button>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className="right_content">
              <h4 className="uppercase widget_title">Contact Info</h4>

              <div className="contact_address_info">
                <span>
                  <img src={msgIcon.src} alt="icon" className="img-fluid" />
                </span>
                <div className="contact_info_text">
                  <h5>Mail us</h5>
                  <p>Info: info@luckyelephant.io</p>
                  <p>Brand Support: theluckyclubshop.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContactStyleWrapper>
  );
};

export default Contact;
