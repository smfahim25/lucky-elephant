import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import openseaIcon from "@/src/assets/images/icon/opensea.svg";
import mediumIcon from "@/src/assets/images/icon/med.svg";

const data = [
  {
    thumb: openseaIcon,
    url: "https://opensea.io/collection/official-lucky-elephant-club-jungleverse",
  },
  {
    icon: <FaXTwitter />,
    url: "https://twitter.com/LuckyEllyClub",
  },
  // {
  //   icon: <FaLinkedinIn />,
  //   url: "#",
  // },
  {
    icon: <FaFacebook />,
    url: "https://www.youtube.com/@luckyelephantclub",
  },
  {
    icon: <FaInstagram />,
    url: "https://instagram.com/luckyellyclub/",
  },
  // {
  //   icon: <FaTelegramPlane />,
  //   url: "#",
  // },
  // {
  //   thumb: mediumIcon,
  //   url: "#",
  // },
];

export default data;
