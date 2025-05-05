/* eslint-disable react/no-unescaped-entities */
import { FiPlus, FiMinus } from "react-icons/fi";

import SectionTitle from "@/src/common/sectionTitle";
import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionBody,
  IconWrapper,
  OpenIcon,
  CloseIcon,
} from "@/src/common/accordion/Accordion";
import faqBgThumb from "@/src/assets/images/bg/faq_bg_wattermark.png";
import data from "@/src/assets/data/faq";
import FAQStyleWrapper from "./Faq.style";

const FAQ = () => {
  return (
    <FAQStyleWrapper className="bithu_faq_sect" id="faq">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <SectionTitle
              title="FREQUENTLY ASKED QUESTIONS"
              subtitle="QUESTIONS & ANSWERS"
              className="section_title"
            />

            <div className="bithu_title_text">
              <span>Don't get your answer?</span>
              <span>
                Fell free to leave a message,<a href="# ">Ask Here!</a>
              </span>
            </div>
          </div>

          <div className="col-md-6">
            <div className="bithu_faq_content">
              <div className="bithu_faq_questions">
                <Accordion className="faq_questions">
                  {data?.map((item, i) => (
                    <AccordionItem key={i}>
                      <AccordionTitle>
                        <h5>{item.title}</h5>
                        <IconWrapper>
                          <OpenIcon>
                            <FiMinus />
                          </OpenIcon>
                          <CloseIcon>
                            <FiPlus />
                          </CloseIcon>
                        </IconWrapper>
                      </AccordionTitle>
                      <AccordionBody>
                        <p>{item.text}</p>
                      </AccordionBody>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
        <div className="faq_bg_wattermark">
          <img src={faqBgThumb.src} alt="bithu nft faq" />
        </div>
      </div>
    </FAQStyleWrapper>
  );
};

export default FAQ;
