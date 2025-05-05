import styled from "styled-components";

const NavWrapper = styled.nav`
  z-index: 999;
  &.bithu_header_home{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 1px;
    /* height: 90px; */
    transition: all 0.3s;
    /* border: 3px solid red;  */
    padding-block: 25px;
  }
  &.bithu_header {
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 1px;
    /* height: 90px; */
    transition: all 0.3s;
    /* border: 3px solid red;  */
    padding-block: 25px;

    &.sticky {
      position: fixed;
      top: 0;
      width: 100%;
      background: rgba(27, 34, 38, 0.8);
      backdrop-filter: blur(15px);
      z-index: 998;
      margin-top: 0px;
      transition: all 0.2s;
    }
  }
  .logo-text {
    color: #ffe600;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.08em;
  }
  .bithu_menu_sect {
    /* height: 90px; */
    padding-inline: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin-top: 20px; */
  }
  .staking_btn {
    background-color: transparent;
    border: none;
  }
  .bithu_menu_left_sect {
    /* display: flex; */
    align-items: center;
    font-size: 18px;
    min-width: 300px;
    font-family: "Sprite";
    font-weight: 700;

    .main_logo {
      img {
        width: 100%;
        max-width: 80px;
        /* */
      }
    }
    .logo-img {
      /* width: 100%;
      display: flex;
      align-items: center; */
      /* font-size: ; */
    }
  }

  .bithu_menu_right_sect {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .bithu_menu_list {
    padding-inline: 10px;
    display: flex;
    font-size: 14px;
    width: 100%;
    gap: 10px;
    max-width: 700px;
    margin-right: 10px;
    ul {
      width: 100%;
      display: flex;
      font-family: "Bakbak One";
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 0;
      gap: 20px;

      li {
        position: relative;
        cursor: pointer;
        button {
          font-family: "Bakbak One";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          text-align: center;
          text-transform: uppercase;
          color: #ffffff;
          background-color: transparent;
        }
        &:hover {
          button {
            color: #00ffa3;
          }
        }
        a {
          font-family: "Bakbak One";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          text-transform: uppercase;
          color: #ffffff;
        }

        &:hover {
          a {
            color: #00ffa3;
          }
        }

        /* submenu */
        &.submenu {
          .sub_menu_sect {
            // background: transparent;
            background: #171f25;
            // border-top: 50px solid transparent;
            position: absolute;
            top: calc(100% + 20px);
            left: -20px;
            width: 400px;
            visibility: hidden;
            opacity: 0;
            z-index: -100;
            transition: all 0.5s;
            transform: translateY(20px);

            .sub_menu_list {
              padding: 15px 20px;
              // background: #171f25;
              flex-wrap: wrap;
              li {
                width: 100%;
                a {
                  font-family: "Bakbak One";
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 40px;
                  color: rgba(255, 255, 255, 0.8);
                  text-transform: capitalize;
                }

                &:hover {
                  a {
                    color: #00ffa3;
                  }
                }
              }
            }
          }

          &:hover {
            .sub_menu_sect {
              transform: translateY(0px);
              visibility: visible;
              opacity: 1;
              z-index: 99;
            }
          }
        }
      }
    }
  }

  .bithu_menu_btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    /* min-width: 284px; */
    button {
      color: #ffffff;
      text-transform: uppercase;
      font-family: "Bakbak One";
      font-weight: 400;
      font-size: 16px;
    }

    .menu_btn {
      display: none;
      border: none;
      background: transparent;
      cursor: pointer;
      svg {
        font-size: 40px;
      }
    }

    .join_btn {
      height: 50px;
      width: 114px;
      background-color: transparent;
    }

    .connect_btn {
      height: 50px;
      min-width: 150px;
      border: none;
      margin-left: 20px;
      background: rgba(255, 255, 255, 0.2);

      svg {
        font-size: 20px;
      }
    }
  }
  @media screen and (max-width: 1310px) {
    .bithu_menu_list {
      display: none;
      visibility: hidden;
      opacity: 0;
    }
    .bithu_menu_btns {
      .menu_btn {
        display: block;
        margin-right: 10px;
      }
    }
  }
  @media screen and (max-width: 1100px) {
    .bithu_menu_list {
      padding-inline: 10px;
      display: none;
      gap: 5px;
    }

    .bithu_menu_btns {
      .connect_btn {
        margin-left: 10px;
      }
    }
  }
  @media (max-width: 991px) {
    .bithu_menu_right_sect {
      justify-content: end;
    }
    .bithu_menu_btns {
      justify-content: end;
    }

    .bithu_menu_btns {
      .join_btn {
        display: none;
      }
      .menu_btn{
        margin-right: 0px;
      }
    }
  }

  @media (max-width: 667px) {
    .bithu_menu_btns {
      .connect_btn {
        display: none;
      }

      .menu_btn {
        svg {
          font-size: 30px;
        }
      }
    }
  }

  @media (max-width: 540px) {
    .bithu_menu_left_sect {
      /* width: 180px; */
      .logo {
        img {
          width: 100px;
        }
      }
    }

    .bithu_menu_right_sect {
      /* width: 50%; */
      .bithu_menu_right_sect {
        /* width: 50%; */
      }
    }
  }
`;

export default NavWrapper;
