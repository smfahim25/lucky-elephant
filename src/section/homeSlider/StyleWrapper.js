import styled from "styled-components";

const StyleWrapper = styled.div`
  position: relative;
  .section_title {
    h2 {
      display: flex;
    }
  }

  .react-tabs {
    &__tab-list {
      position: fixed;
      z-index: 99;
      bottom: 0;
      width: 100%;
      border-bottom: 0;
      margin: 0;
      padding: 0;
      display: flex !important;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(4px);
    }
    &__tab {
      cursor: pointer;
      width: calc(100% / 6);
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.6s ease;
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 16px;
      text-transform: uppercase;
      color: #ffffff;
      border-radius: 0;
      border: 0;
      border-right: 1px solid rgba(255, 255, 255, 0.15);
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      margin: 0;
      transition: all 0.3s;
      span {
        padding-right: 5px;
      }

      &:focus {
        outline: none;
      }

      &--selected {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(4px);
      }
    }
    &__tab-panel {
      &--selected {
        animation: 0.5s SlideAnimation;
      }
    }
  }

  @keyframes SlideAnimation {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @media only screen and (max-width: 767px) {
    .react-tabs {
      &__tab {
        min-height: 40px;
        font-size: 14px;
        line-height: 16px;
        span {
          padding-right: 5px;
        }
      }
    }
  }

  @media only screen and (max-width: 575px) {
    .react-tabs {
      &__tab {
        span {
          padding-right: 0px;
          display: none;
        }
      }
    }
  }

  @media only screen and (max-width: 375px) {
    .react-tabs {
      &__tab {
        min-height: 40px;
        font-size: 10px;
        line-height: 16px;
        span {
          padding-right: 0px;
          display: none;
        }
      }
    }
  }
`;

export default StyleWrapper;
