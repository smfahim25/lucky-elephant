import styled from "styled-components";

const GovernanceCard = styled.section`
  .governance_main_div {
    display: flex;
    align-items: start;
    gap: 20px;
    width: 100%;
    max-width: 1350px;
    margin-inline: auto;
    padding: 50px;
  }

  .governance_banner_left_section {
    margin-top: 30px;
    width: 100%;
  }
  .card_heading {
    font-family: "inter";
    display: flex;
    align-items: center;
    line-height: normal;
    p {
      font-family: "inter";
      font-size: 20px;
    }
  }
  .governanc_content_left_hash_card ul {
    /* flex-direction: ; */
    margin-top: 7px;
  }
  .governanc_content_left_hash_card ul li {
    width: 100%;
    margin-top: 20px;
  }
  .progress-line .progress-done.bg-red {
    background-color: rgba(243, 19, 19, 0.4);
  }

  .Green_status {
    color: #33efb0;
    border: 3px solid red;
  }
  .White_status {
    color: #fff;
  }
  .red_status {
    color: #f31313;
  }

  /*--- Progress bar style ---*/
  .progress-line {
    border-radius: 0px;
    position: relative;
    height: 8px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .progress-line .progress-done {
    border-radius: 0px;
    height: 100%;
    width: 0%;
    opacity: 0;
    background-color: red;
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }

  .total_rised_progress_bg .progress-line {
    height: 15px !important;
  }
  /*--- progress style ---*/
  .total_rised_progress_sect .progress-line {
    height: 15px;
    margin: 10px 0 18px 0;
  }
  .governanc_content_left_hash_card_stutas h4 span.white {
    color: #ffffff;
  }
  .governanc_content_left_hash_card_stutas .stutas_upcoming {
    height: 9px;
    width: 9px;
    background: rgba(255, 255, 255, 0.3);
    margin-left: 6px;
    border-radius: 50%;
  }

  .governanc_content_left_hash_card_stutas .stutas_active {
    height: 9px;
    width: 9px;
    background: #33efb0;
    margin-left: 6px;
    border-radius: 50%;
  }
  .governanc_content_left_hash_card_stutas h4 {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 158%;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0px;
  }

  .governanc_content_left_hash_card_stutas h4 span {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
  }
  .governanc_content_left_hash_card_stutas .stutas_upcoming {
    height: 9px;
    width: 9px;
    background: rgba(255, 255, 255, 0.3);
    margin-left: 6px;
    border-radius: 50%;
  }
  .progress-line .progress-done {
    border-radius: 0px;
    height: 100%;
    width: 0%;
    opacity: 0;
    background-color: red;
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }
  .progress-line .progress-done.bg-theme {
    background-color: #a3ff12;
  }

  .progress-line .progress-done.bg-green {
    background-color: #33efb0;
  }

  .progress-line .progress-done.bg-red {
    background-color: rgba(243, 19, 19, 0.4);
  }

  .progress-line .progress-done.bg-gray {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .tokenomics_section {
    background: #090a1a;
    padding-top: 0px;
    padding-bottom: 105px;
  }

  .tokenomics_section_custom {
    padding-top: 59px;
  }

  .tokenomics_contents_left_custom {
    margin-left: 130px;
  }

  .leaderboard-table-list tr td {
    background: rgba(30, 31, 53, 0.8);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
  }

  .leaderboard-table-list tr.dark td {
    background: rgba(30, 31, 53, 0.5);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
  }

  .TokenomicsTable .leaderboard-table-list tr th:nth-child(1),
  .TokenomicsTable .leaderboard-table-list tr td:nth-child(1),
  .TokenomicsTable .leaderboard-table-list tr th:nth-child(4),
  .TokenomicsTable .leaderboard-table-list tr td:nth-child(4) {
    width: 18%;
  }

  .TokenomicsTable .leaderboard-table-list tr th:nth-child(3),
  .TokenomicsTable .leaderboard-table-list tr td:nth-child(3) {
    width: 24%;
  }

  .tokenomics_contents {
    margin-top: 48px;
  }

  .tokenomics_contents_left {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-line-pack: start;
    align-content: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tokenomics_contents_left h3 {
    font-family: Russo One;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 40px;
    color: #ffffff;
    margin-bottom: 0px;
  }

  .tokenomics_list_sect {
    margin-top: 28px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }

  .tokenomics_list_sect ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-right: 127px;
  }

  .tokenomics_list_sect ul li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    margin-bottom: 43px;
  }

  .tokenomics_list_text h4 {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0px;
  }

  .tokenomics_list_text h5 {
    font-family: Russo One;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 0px;
  }

  .tokenomics_list_text h5 span.counter {
    height: 12px;
    width: 12px;
    min-width: 12px;
    margin-right: 0px;
    margin-top: 0px;
  }

  .tokenomics_list_sect ul li span {
    height: 12px;
    width: 12px;
    min-width: 12px;
    margin-right: 19px;
    margin-top: 8px;
  }

  .tokenomics_list_sect ul li span.farming_pool {
    background: #a3ff12;
  }

  .tokenomics_list_sect ul li span.staking {
    background: #841183;
  }

  .tokenomics_list_sect ul li span.ecosystem {
    background: #0b58fe;
  }

  .tokenomics_list_sect ul li span.advisors {
    background: #01cc9b;
  }

  .tokenomics_list_sect ul li span.private_Sale {
    background: #6d4afe;
  }

  .tokenomics_list_sect ul li span.liquidity {
    background: #14a0c0;
  }

  .tokenomics_list_sect ul li span.marketing {
    background: #3bcbff;
  }

  .tokenomics_list_sect ul li span.advisors {
    background: #f82552;
  }

  .tokenomics_contents_right .tokenomics_contents_right_img {
    background: rgba(30, 31, 53, 0.8);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    max-width: 570px;
    width: 100%;
    height: 500px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 50px;
  }

  /*--- governance page style ---*/
  /*--- Governance ---*/
  .governance_breadcrumbs_scetion {
    padding-bottom: 60px;
  }

  .governance_breadcrumbs_scetion .governance_breadcrumbs_content {
    position: relative;
  }

  .gamfi-breadcrumbs-section.governance_breadcrumbs_scetion
    .breadcrumbs-form
    form {
    margin-right: 0px;
  }

  .governanc_content_section {
    background: #090a1a;
    padding-bottom: 140px;
    position: relative;
    z-index: 3;
    padding-top: 66px;
  }

  .governanc_content_section .container {
    position: relative;
    z-index: 1;
  }

  .governanc_content_right_card {
    background: rgba(30, 31, 53, 0.8);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    padding: 30px;
    padding-top: 39px;
    max-width: 370px;
    margin: auto;
    margin-bottom: 30px;
  }

  .governanc_content_right_card h2 {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 0px;
  }

  .governanc_content_right_card h2 span {
    margin-left: 5px;
  }

  .governanc_content_right_card ul {
    margin-top: 16px;
    margin-bottom: 20px;
  }

  .governanc_content_right_card ul li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
  }

  .governanc_content_right_card ul li span {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 50px;
    color: rgba(255, 255, 255, 0.7);
  }

  .governanc_content_right_card ul li strong {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 50px;
    text-align: right;
    color: #ffffff;
  }

  .governanc_content_right_card_btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .governanc_content_right_card_btns button {
    height: 60px;
    width: 100%;
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
    border: none;
    outline: none;
  }

  .governanc_content_right_card_btns button.claim_rewords_btn {
    margin-bottom: 30px;
    background: #6d4afe;
  }

  .governanc_content_right_card_btns button.make_proposal_btn {
    background: rgba(255, 255, 255, 0.1);
  }

  .governanc_content_left_cards_sections {
    margin-bottom: 40px;
  }

  .governanc_content_left_hash_card {
    min-height: 195px;
    width: 100%;
    background: rgba(30, 31, 53, 0.7);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    /* margin-top: 30px; */
    padding: 28px 30px;
  }

  .governanc_content_left_hash_card h2 {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 158%;
    color: #ffffff;
    margin-bottom: 24px;
  }

  .governanc_content_left_hash_card h2 a:hover {
    color: #ffffff;
  }

  .governanc_content_left_hash_card h2 span {
    margin-right: 8px;
  }

  .governanc_content_left_hash_card h3 {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 158%;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 8px;
  }

  .governanc_content_left_hash_card h3 span {
    margin-left: 5px;
  }

  .governanc_content_left_hash_card_stutas {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }

  .governanc_content_left_hash_card_stutas h4 {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 158%;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0px;
  }

  .governanc_content_left_hash_card_stutas h4 span {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
  }

  .governanc_content_left_hash_card_stutas h4 span.white {
    color: #ffffff;
  }

  .governanc_content_left_hash_card_stutas h4 span.green {
    color: #33efb0;
  }

  .governanc_content_left_hash_card_stutas h4 span.red {
    color: #f31313;
  }

  .governanc_content_left_hash_card_stutas .stutas_upcoming {
    height: 9px;
    width: 9px;
    background: rgba(255, 255, 255, 0.3);
    margin-left: 6px;
    border-radius: 50%;
  }

  .governanc_content_left_hash_card_stutas .stutas_active {
    height: 9px;
    width: 9px;
    background: #33efb0;
    margin-left: 6px;
    border-radius: 50%;
  }

  .stutas_live {
    margin-left: 6px;
    position: relative;
  }

  .stutas_live .video__icon {
    position: absolute;
    width: 9px;
    height: 9px;
    right: -8px;
    top: -8px;
  }

  .stutas_live .video__icon p {
    color: #000;
    text-align: center;
  }

  .stutas_live .video__icon .circle--outer {
    border: 1px solid #33efb0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin: 0 auto 5px;
    position: relative;
    opacity: 0.8;
    -webkit-animation: circle 2s ease-in-out infinite;
    animation: circle 2s ease-in-out infinite;
  }

  .stutas_live .video__icon .circle--inner {
    background: #33efb0;
    left: 3px;
    top: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    opacity: 0.8;
  }

  .stutas_live .video__icon .circle--inner::after {
    content: "";
    display: block;
    border: 1px solid #33efb0;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    top: -2px;
    left: -2px;
    position: absolute;
    opacity: 0.8;
    -webkit-animation: circle 2s ease-in-out 0.2s infinite;
    animation: circle 2s ease-in-out 0.2s infinite;
  }
  .power_banner {
    background-color: #1e1f35b3;
    padding: 30px;
    margin-top: 30px;
    width: 100%;
    max-width: 400px;
  }
  .power_data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p:nth-child(2) {
      font-family: "Bakbak One";
      font-weight: 800;
    }
  }
  .Power_Banner_Buttons {
    button:nth-child(1) {
      background-color: #6d4afe;
      width: 100%;
      padding-block: 20px;
      font-weight: 800;
      color: white;
      border: none;
      margin-top: 20px;
    }
    button:nth-child(2) {
      background-color: #ffffff1a;
      width: 100%;
      padding-block: 20px;
      font-weight: 800;
      color: white;
      border: none;
      margin-top: 30px;
    }
  }
  .powers_section_heading {
    display: flex;
    align-items: center;
    gap: 10px;
    p {
      font-size: 16px;
      font-family: "Bakbak One";
      font-weight: 800;
    }
  }
  .power_data {
    p {
      margin-block: 10px;
      margin-top: 20px;
    }
    p:nth-child(1) {
      color: #ffffffb3;
      font-family: "Bakbak One";
      font-size: 13px;
    }
  }
  .proposals_searchBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #222231;
    padding-inline: 30px;
    margin-bottom: 30px;
    p {
      padding-block: 20px;
    }
  }
  .proposals_dropdown {
    display: flex;
    align-items: center;
    gap: 10px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding-left: 20px;
    cursor: pointer;
    position: relative;
    img {
      width: 23px;
      height: 23px;
    }
  }

  @-webkit-keyframes circle {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    to {
      -webkit-transform: scale(1.5);
      transform: scale(1.5);
      opacity: 0;
    }
  }

  @keyframes circle {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    to {
      -webkit-transform: scale(1.5);
      transform: scale(1.5);
      opacity: 0;
    }
  }

  .governanc_content_left_hash_card_stutas .stutas_failed {
    height: 9px;
    width: 9px;
    background: #f31313;
    margin-left: 6px;
    border-radius: 50%;
  }

  .governanc_content_left_hash_card ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-top: 27px;
  }

  .governanc_content_left_hash_card ul li {
    width: 30.5%;
  }

  .governanc_content_left_hash_card ul li .progress_bg {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
  }

  .governanc_content_left_hash_card ul li .progress_bg .progress_bar.for {
    height: 100%;
    background: #33efb0;
  }

  .governanc_content_left_hash_card ul li .progress_bg .progress_bar.against {
    height: 100%;
    background: rgba(243, 19, 19, 0.4);
  }

  .governanc_content_left_hash_card ul li .progress_bg .progress_bar.abstain {
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
  }

  .governanc_content_left_hash_card ul li .progress_bg .progress_bar {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }

  .governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress0 {
    width: 0%;
    -webkit-animation-name: progress0;
    animation-name: progress0;
  }

  .governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress1 {
    width: 1%;
    -webkit-animation-name: progress1;
    animation-name: progress1;
  }

  .governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress2 {
    width: 2%;
    -webkit-animation-name: progress2;
    animation-name: progress2;
  }

  .governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress3 {
    width: 3%;
    -webkit-animation-name: progress3;
    animation-name: progress3;
  }

  .governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress8 {
    width: 8%;
    -webkit-animation-name: progress8;
    animation-name: progress8;
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress14 {
    width: 14%;
    -webkit-animation-name: progress14;
    animation-name: progress14;
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress15 {
    width: 15%;
    -webkit-animation-name: progress15;
    animation-name: progress15;
  }

  @-webkit-keyframes progress0 {
    0% {
      width: 0%;
    }
    100% {
      width: 0%;
    }
  }

  @keyframes progress0 {
    0% {
      width: 0%;
    }
    100% {
      width: 0%;
    }
  }

  @-webkit-keyframes progress1 {
    0% {
      width: 0%;
    }
    100% {
      width: 1%;
    }
  }

  @keyframes progress1 {
    0% {
      width: 0%;
    }
    100% {
      width: 1%;
    }
  }

  @-webkit-keyframes progress2 {
    0% {
      width: 0%;
    }
    100% {
      width: 2%;
    }
  }

  @keyframes progress2 {
    0% {
      width: 0%;
    }
    100% {
      width: 2%;
    }
  }

  @-webkit-keyframes progress3 {
    0% {
      width: 0%;
    }
    100% {
      width: 3%;
    }
  }

  @keyframes progress3 {
    0% {
      width: 0%;
    }
    100% {
      width: 3%;
    }
  }

  @-webkit-keyframes progress8 {
    0% {
      width: 0%;
    }
    100% {
      width: 8%;
    }
  }

  @keyframes progress8 {
    0% {
      width: 0%;
    }
    100% {
      width: 8%;
    }
  }

  @-webkit-keyframes progress14 {
    0% {
      width: 0%;
    }
    100% {
      width: 14%;
    }
  }

  @keyframes progress14 {
    0% {
      width: 0%;
    }
    100% {
      width: 14%;
    }
  }

  @-webkit-keyframes progress15 {
    0% {
      width: 0%;
    }
    100% {
      width: 15%;
    }
  }

  @keyframes progress15 {
    0% {
      width: 0%;
    }
    100% {
      width: 15%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress19 {
    width: 19%;
    -webkit-animation-name: progress19;
    animation-name: progress19;
  }

  @-webkit-keyframes progress19 {
    0% {
      width: 0%;
    }
    100% {
      width: 19%;
    }
  }

  @keyframes progress19 {
    0% {
      width: 0%;
    }
    100% {
      width: 19%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress26 {
    width: 26%;
    -webkit-animation-name: progress26;
    animation-name: progress26;
  }

  @-webkit-keyframes progress26 {
    0% {
      width: 0%;
    }
    100% {
      width: 26%;
    }
  }

  @keyframes progress26 {
    0% {
      width: 0%;
    }
    100% {
      width: 26%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress38 {
    width: 38%;
    -webkit-animation-name: progress38;
    animation-name: progress38;
  }

  @-webkit-keyframes progress38 {
    0% {
      width: 0%;
    }
    100% {
      width: 38%;
    }
  }

  @keyframes progress38 {
    0% {
      width: 0%;
    }
    100% {
      width: 38%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress43 {
    width: 43%;
    -webkit-animation-name: progress43;
    animation-name: progress43;
  }

  @-webkit-keyframes progress43 {
    0% {
      width: 0%;
    }
    100% {
      width: 43%;
    }
  }

  @keyframes progress43 {
    0% {
      width: 0%;
    }
    100% {
      width: 43%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress72 {
    width: 72%;
    -webkit-animation-name: progress72;
    animation-name: progress72;
  }

  @-webkit-keyframes progress72 {
    0% {
      width: 0%;
    }
    100% {
      width: 72%;
    }
  }

  @keyframes progress72 {
    0% {
      width: 0%;
    }
    100% {
      width: 72%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress83 {
    width: 83%;
    -webkit-animation-name: progress83;
    animation-name: progress83;
  }

  @-webkit-keyframes progress83 {
    0% {
      width: 0%;
    }
    100% {
      width: 83%;
    }
  }

  @keyframes progress83 {
    0% {
      width: 0%;
    }
    100% {
      width: 83%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress85 {
    width: 85%;
    -webkit-animation-name: progress85;
    animation-name: progress85;
  }

  @-webkit-keyframes progress85 {
    0% {
      width: 0%;
    }
    100% {
      width: 85%;
    }
  }

  @keyframes progress85 {
    0% {
      width: 0%;
    }
    100% {
      width: 85%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress92 {
    width: 92%;
    -webkit-animation-name: progress92;
    animation-name: progress92;
  }

  @-webkit-keyframes progress92 {
    0% {
      width: 0%;
    }
    100% {
      width: 92%;
    }
  }

  @keyframes progress92 {
    0% {
      width: 0%;
    }
    100% {
      width: 92%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress95 {
    width: 95%;
    -webkit-animation-name: progress95;
    animation-name: progress95;
  }

  @-webkit-keyframes progress95 {
    0% {
      width: 0%;
    }
    100% {
      width: 95%;
    }
  }

  @keyframes progress95 {
    0% {
      width: 0%;
    }
    100% {
      width: 95%;
    }
  }

  .governanc_content_left_hash_card
    ul
    li
    .progress_bg
    .progress_bar.progress99 {
    width: 99%;
    -webkit-animation-name: progress99;
    animation-name: progress99;
  }

  @-webkit-keyframes progress99 {
    0% {
      width: 0%;
    }
    100% {
      width: 99%;
    }
  }

  @keyframes progress99 {
    0% {
      width: 0%;
    }
    100% {
      width: 99%;
    }
  }

  .governanc_content_left_hash_card ul li h5 {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0px;
    margin-top: 7px;
  }

  .governancdetaile_content_left {
    padding-right: 20px;
  }

  .governanc_details_back_btn {
    margin-bottom: 35px;
  }

  .governanc_details_back_btn a {
    background: none;
    outline: none;
    border: none;
    padding: 0px;
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
  }

  .governanc_details_back_btn a span {
    font-family: "Inter", sans-serif;
    margin-right: 10px;
    font-size: 18px;
  }

  .governanc_details_heading h2 {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 158%;
    margin-bottom: 0px;
    color: #ffffff;
  }

  .governanc_details_heading h3 {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    margin-bottom: 0px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    margin-right: 18px;
  }

  .governanc_details_heading h3::before {
    content: url("../images/icons/user-octagon.svg");
    margin-right: 10px;
  }

  .governanc_details_heading h3 span {
    color: rgba(255, 255, 255, 0.7);
    margin-right: 5px;
  }

  .governanc_details_heading h4 {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    margin-bottom: 0px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }

  .governanc_details_heading h4::before {
    content: "";
    height: 9px;
    width: 9px;
    border-radius: 50%;
    background: #33efb0;
    margin-right: 10px;
  }

  .governanc_details_heading h4 span {
    color: #33efb0;
    margin-right: 5px;
  }

  .governanc_details_heading p {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    max-width: 693px;
    width: 100%;
  }

  .governanc_details_heading p a {
    color: rgba(51, 239, 176, 0.7);
    word-break: break-all;
  }

  .governanc_details_subtitle {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    margin-bottom: 23px;
    /* margin-top: 30px; */
  }

  .cast_your_vote_card {
    background: rgba(30, 31, 53, 0.8);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    margin-bottom: 20px;
  }

  .cast_your_vote_card h3 {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 16px;
    text-transform: uppercase;
    color: #ffffff;
    padding: 30px;
    margin-bottom: 0px;
  }
  .progress-line .progress-done {
    border-radius: 0px;
    height: 100%;
    width: 0%;
    opacity: 0;
    background-color: red;
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }
  .cast_your_vote_radio {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .cast_your_vote_radio li {
    width: 50%;
    background: rgba(255, 255, 255, 0.05);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    height: 60px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    padding: 0px 30px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  .cast_your_vote_radio .radio_container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 158%;
    color: #ffffff;
    margin-bottom: 0px;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }

  .cast_your_vote_radio .radio_container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .cast_your_vote_radio .checkmark {
    position: absolute;
    top: 18px;
    left: 0;
    height: 24px;
    width: 24px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .cast_your_vote_radio .radio_container input:checked ~ .checkmark {
    background: #33efb0;
  }

  .stutas_live .video__icon .circle--inner::after {
    content: "";
    display: block;
    border: 1px solid #33efb0;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    top: -2px;
    left: -2px;
    position: absolute;
    opacity: 0.8;
    -webkit-animation: circle 2s ease-in-out 0.2s infinite;
    animation: circle 2s ease-in-out 0.2s infinite;
  }
  .dropdown_data {
    position: absolute;
    background-color: #222231;
    width: 176px;
    z-index: 5;
    top:60px;
    left: 0px;
    right: 0px;
  }
  .dropdown_selectable_titles{
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-inline: 23px;
  }

  @-webkit-keyframes circle {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    to {
      -webkit-transform: scale(1.5);
      transform: scale(1.5);
      opacity: 0;
    }
  }
  @media screen and (max-width: 1100px) {
    .governance_main_div {
      display: flex;
      flex-direction: column;
    }
    .power_banner {
      width: 100%;
      max-width: 100%;
    }

  }

  /*--- Governance ---*/
.governance_breadcrumbs_scetion{
    padding-bottom: 60px;
    .governance_breadcrumbs_content{
        position: relative;
    }
}

.gamfi-breadcrumbs-section.governance_breadcrumbs_scetion {
    .breadcrumbs-form form{
        margin-right: 0px;
    }
}

.governanc_content_section{
    background: $bgColor;
    padding-bottom: 140px;
    position: relative;
    z-index: 3;
    padding-top: 66px;
    .container{
        position: relative;
        z-index: 1;
    }
}

.governanc_content_right_card {
    background: rgba($color: $bgColor2, $alpha: 0.8);
    backdrop-filter: blur(5px);
    padding: 30px;
    padding-top: 39px;
    max-width: 370px;
    margin: auto;
    margin-bottom: 30px;
    h2 {
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        text-transform: uppercase;
        color: $white;
        margin-bottom: 0px;
        span{
            margin-left: 5px;
        }
    }
}

.governanc_content_right_card ul{
    margin-top: 16px;
    margin-bottom: 20px;
    li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    li span {
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 50px;
        color: rgba($color: $white, $alpha: 0.7);
    }
    li strong {
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 50px;
        text-align: right;
        color: $white;
    }
}

.governanc_content_right_card_btns{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    button {
        height: 60px;
        width: 100%;
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        text-transform: uppercase;
        color: $white;
        border: none;
        outline: none;
    }
}

.governanc_content_right_card_btns{
    button.claim_rewords_btn{
        margin-bottom: 30px;
        background: $themeColorBlue;
    }
    button.make_proposal_btn{
        background: rgba($color: $white, $alpha: 0.1);
    }
}

.governanc_content_left_cards_sections{
    margin-bottom: 40px;
}

.governanc_content_left_hash_card {
    min-height: 195px;
    width: 100%;
    background: rgba(30, 31, 53, 0.7);
    backdrop-filter: blur(5px);
    margin-top: 30px;
    padding: 28px 30px;
    h2 {
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 158%;
        color: $white;
        margin-bottom: 24px; 
        a:hover{
            color: $white;
        }
        span{
            margin-right: 8px;
        }
    }
    h3 {
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 158%;
        text-transform: uppercase;
        color: rgba($color: $white, $alpha: 0.7);
        margin-bottom: 8px;
        span{
            margin-left: 5px;
        }
    }
}

.governanc_content_left_hash_card_stutas{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    h4 {
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 158%;
        text-transform: uppercase;
        color: rgba($color: $white, $alpha: 0.7);
        margin-bottom: 0px;
    }
    h4 span {
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        text-transform: uppercase;
        &.white{
            color: $white;
        }
        &.green{
            color: #33EFB0;
        }
        &.red{
            color: #F31313;
        }
    }
}


.governanc_content_left_hash_card_stutas {
    .stutas_upcoming{
        height: 9px;
        width: 9px;
        background: rgba($color: $white, $alpha: 0.3);
        margin-left: 6px;
        border-radius: 50%;
    }
    .stutas_active{
        height: 9px;
        width: 9px;
        background: #33EFB0;
        margin-left: 6px;
        border-radius: 50%;
    }
    
}

.stutas_live{
    margin-left: 6px;
    position: relative;
    .video__icon {
        position: absolute;
        width: 9px;
        height: 9px;
        right: -8px;
        top: -8px;
        p{
            color: #000;
            text-align: center;
        }
        .circle--outer {
            border: 1px solid #33EFB0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin: 0 auto 5px;
            position: relative;
            opacity: .8;
            -webkit-animation: circle 2s ease-in-out infinite;
            animation: circle 2s ease-in-out infinite;
        }
        .circle--inner {
            background: #33EFB0;
            left: 3px;
            top: 3px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            position: absolute;
            opacity: .8;
            &::after{
                content: '';
                display: block;
                border: 1px solid #33EFB0;
                border-radius: 50%;
                width: 14px;
                height: 14px;
                top: -2px;
                left: -2px;
                position: absolute;
                opacity: .8;
                animation: circle 2s ease-in-out .2s infinite;
            }
        }
    }
}

@-webkit-keyframes circle {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.5);
        opacity: 0;
    }
}

@keyframes circle {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.5);
        opacity: 0;
    }
}

.governanc_content_left_hash_card_stutas .stutas_failed{
    height: 9px;
    width: 9px;
    background: #F31313;
    margin-left: 6px;
    border-radius: 50%;
}

.governanc_content_left_hash_card ul{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 27px;
    li{
        width: 30.5%; 
    }
    li .progress_bg{
        width: 100%;
        height: 8px;
        background: rgba($color: $white, $alpha: 0.1);
    }
    li .progress_bg .progress_bar.for{
        height: 100%;
        background: #33EFB0;
    }
    li .progress_bg .progress_bar.against{
        height: 100%;
        background: rgba(243, 19, 19, 0.4);
    }
    li .progress_bg .progress_bar.abstain{
        height: 100%;
        background: rgba($color: $white, $alpha: 0.3);
    }
    li .progress_bg .progress_bar{
        animation-duration: 2s;
    }
    li .progress_bg .progress_bar.progress0{
        width: 0%;
        animation-name: progress0;
    }
    li .progress_bg .progress_bar.progress1{
        width: 1%;
        animation-name: progress1;
    }
    li .progress_bg .progress_bar.progress2{
        width: 2%;
        animation-name: progress2;
    }
    li .progress_bg .progress_bar.progress3{
        width: 3%;
        animation-name: progress3;
    }
    li .progress_bg .progress_bar.progress8{
        width: 8%;
        animation-name: progress8;
    }
    li .progress_bg .progress_bar.progress14{
        width: 14%;
        animation-name: progress14;
    }
    li .progress_bg .progress_bar.progress15{
        width: 15%;
        animation-name: progress15;
    }
}

@keyframes progress0 {
    0% {
        width: 0%;
    }

    100% {
        width: 0%;
    }
}

@keyframes progress1 {
    0% {
        width: 0%;
    }

    100% {
        width: 1%;
    }
}

@keyframes progress2 {
    0% {
        width: 0%;
    }

    100% {
        width: 2%;
    }
}

@keyframes progress3 {
    0% {
        width: 0%;
    }

    100% {
        width: 3%;
    }
}

@keyframes progress8 {
    0% {
        width: 0%;
    }

    100% {
        width: 8%;
    }
}

@keyframes progress14 {
    0% {
        width: 0%;
    }

    100% {
        width: 14%;
    }
}

@keyframes progress15 {
    0% {
        width: 0%;
    }

    100% {
        width: 15%;
    }
}

.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress19{
    width: 19%;
    animation-name: progress19;
}
@keyframes progress19 {
    0% {
        width: 0%;
    }

    100% {
        width: 19%;
    }
}


.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress26{
    width: 26%;
    animation-name: progress26;
}
@keyframes progress26 {
    0% {
        width: 0%;
    }

    100% {
        width: 26%;
    }
}

.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress38{
    width: 38%;
    animation-name: progress38;
}
@keyframes progress38 {
    0% {
        width: 0%;
    }

    100% {
        width: 38%;
    }
}


.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress43{
    width: 43%;
    animation-name: progress43;
}
@keyframes progress43 {
    0% {
        width: 0%;
    }

    100% {
        width: 43%;
    }
}

.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress72{
    width: 72%;
    animation-name: progress72;
}
@keyframes progress72 {
    0% {
        width: 0%;
    }

    100% {
        width: 72%;
    }
}


.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress83{
    width: 83%;
    animation-name: progress83;
}
@keyframes progress83 {
    0% {
        width: 0%;
    }

    100% {
        width: 83%;
    }
}


.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress85{
    width: 85%;
    animation-name: progress85;
}
@keyframes progress85 {
    0% {
        width: 0%;
    }

    100% {
        width: 85%;
    }
}


.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress92{
    width: 92%;
    animation-name: progress92;
}
@keyframes progress92 {
    0% {
        width: 0%;
    }

    100% {
        width: 92%;
    }
}

.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress95{
    width: 95%;
    animation-name: progress95;
}
@keyframes progress95 {
    0% {
        width: 0%;
    }

    100% {
        width: 95%;
    }
}


.governanc_content_left_hash_card ul li .progress_bg .progress_bar.progress99{
    width: 99%;
    animation-name: progress99;
}
@keyframes progress99 {
    0% {
        width: 0%;
    }

    100% {
        width: 99%;
    }
}


.governanc_content_left_hash_card ul{
    li h5 {
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        text-transform: uppercase;
        color: rgba($color: $white, $alpha: 0.7);
        margin-bottom: 0px;
        margin-top: 7px;
    }
} 

.governancdetaile_content_left{
    padding-right: 20px;
}
.governanc_details_back_btn{
    margin-bottom: 35px;
    a {
        background: none;
        outline: none;
        border: none;
        padding: 0px;
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-transform: uppercase;
        color: rgba($color: $white, $alpha: 0.7);
        span{
            font-family: $interFont;
            margin-right: 10px;
            font-size: 18px;
        }
    }
}

.governanc_details_heading{
    h2 {
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        line-height: 158%;
        margin-bottom: 0px;
        color: $white;
    }
    h3 {
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: $white;
        margin-bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-right: 18px;
        &::before{
            content: url("../images/icons/user-octagon.svg");
            margin-right: 10px;
        }
        span {
            color: rgba($color: $white, $alpha: 0.7);
            margin-right: 5px;
        }
    }
    h4 {
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: $white;
        margin-bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        &::before{
            content: '';
            height: 9px;
            width: 9px;
            border-radius: 50%;
            background: #33EFB0;
            margin-right: 10px;
        }
        span {
            color: #33EFB0;
            margin-right: 5px;
        }
    }
    p{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        max-width: 693px;
        width: 100%;
        a{
            color: rgba(51, 239, 176, 0.7);
            word-break: break-all;
        }
    }
} 

.governanc_details_subtitle{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 23px;
    margin-top: 30px;
}

.cast_your_vote_card {
    background: rgba($color: $bgColor2, $alpha: 0.8);
    backdrop-filter: blur(5px);
    margin-bottom: 20px;
    h3 {
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 16px;
        text-transform: uppercase;
        color: $white;
        padding: 30px;
        margin-bottom: 0px;
    }
}

.cast_your_vote_radio{
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
        width: 50%;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(5px);
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0px 30px;
        border-right: 1px solid rgba($color: $white, $alpha: 0.1);
        cursor: pointer;
    }
}

.cast_your_vote_radio .radio_container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    font-family: $russoOneFont;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 158%;
    color: $white;
    margin-bottom: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.cast_your_vote_radio .radio_container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
.cast_your_vote_radio .checkmark {
    position: absolute;
    //top: 18;
    top: 18px;
    left: 0;
    height: 24px;
    width: 24px;
    background: rgba($color: $white, $alpha: 0.1);
    border-radius: 50%;
}
.cast_your_vote_radio .radio_container input:checked ~ .checkmark {
    background: #33EFB0;
}
.cast_your_vote_radio .checkmark:after {
    content: "";
    position: absolute;
    display: none;
}
.cast_your_vote_radio .radio_container input:checked ~ .checkmark:after {
    display: block;
}
.cast_your_vote_radio .radio_container .checkmark:after {
    left: 9.5px;
    top: 6px;
    width: 5px;
    height: 10px;
    border: solid #000000;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

.cast_your_vote_card button {
    background: $themeColorBlue;
    height: 60px;
    width: 170px;
    font-family: $russoOneFont;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    text-transform: uppercase;
    color: $white;
    border: none;
    outline: none;
    margin: 30px;
}


.governanc_details_text{
    padding-top: 45px;
    h4 {
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        color: $white;
        margin-bottom: 21px;
    }
    p {
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        color: rgba($color: $white, $alpha: 0.7);
        margin-bottom: 21px;
    }
}
.governce_vote_table ul{
    li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 67px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }
    li h2 {
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        color: $white;
        margin-bottom: 0px;
    }
    li h3 {
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        text-align: right;
        color: $white;
        margin-bottom: 0px;
    }
    li h4 {
        margin-bottom: 0px;
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        color: $white;
        width: 240px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        &::after{
            content: url("../images/icons/governance_copy.svg");
            margin-left: 7px;
            margin-top: 4px;
        }
        span{
            margin-right: 9px;
        }
    }
    li h5 {
        margin-bottom: 0px;
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        color: $white;
        text-align: left;
        max-width: 150px;
        width: 100%;
    }
    li h6 {
        margin-bottom: 0px;
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        color: $white;
        width: 87px;
        text-align: right;
    }
} 


.governance_vote_modal_content{
    border-radius: 0px;
}

.governance_vote_modal_form {
    h4 {
        margin-bottom: 0px;
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 36px;
        color: rgba($color: $white, $alpha: 0.7);
    }
    h3 {
        margin-bottom: 0px;
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 36px;
        color: $white;
    }
}

.governance_vote_modal_form form{
    margin-top: 24px;
    span {
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: rgba($color: $white, $alpha: 0.7);
    }
    input {
        border: 2px solid rgba(255, 255, 255, 0.12);
        width: 100%;
        height: 60px;
        outline: none;
        background: transparent;
        font-family: $interFont;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: $white;
        margin-top: 15px;
        padding: 0px 21px;
    }
    button {
        width: 100%;
        height: 60px;
        border: none;
        outline: none;
        background: $themeColorBlue;
        font-family: $russoOneFont;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        text-transform: uppercase;
        color: $white;
        margin-top: 30px;
        margin-bottom: 30px;
    }
}


.current_results_progress_content{
    margin-top: 30px;
    p {
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        text-transform: uppercase;
        color: rgba($color: $white, $alpha: 0.7);
        margin-bottom: 10px;
    }
    .current_results_progress_bg{
        height: 8px;
        background: rgba($color: $white, $alpha: 0.1);
        width: 100%;
    }
    .current_results_progress_bar{
        height: 100%;
        animation-name: progress_bar;
    }
    .current_results_progress_bar.for{
        width: 85%;
        background: #33EFB0;
    }
    .current_results_progress_bar.against{
        width: 3%;
        background: rgba(243, 19, 19, 0.4);
    }
    .current_results_progress_bar.abstain{
        width: 12%;
        background: rgba($color: $white, $alpha: 0.3);
    }
}

/*
@keyframes progress_bar {
    0% {
        width: 0%;
    }

    100% {
        width: 50%
    }
}
*/

.governanc_content_right_card ul{
    li p {
        margin-bottom: 0px;
        font-family: $interFont;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 50px;
        text-align: right;
        color: $white;
        span{
            margin-right: 10px;
        }
        a{
            color: #33EFB0;
            img{
                margin-left: 8px;
            }
        }
    }
} 
`;

export default GovernanceCard;
