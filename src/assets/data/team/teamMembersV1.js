import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import avatarThumb1 from "@/public/assets/images/Team/Team_Img_One.png";
import avatarThumb2 from "@/public/assets/images/Team/Team_Img_Two.png";
import avatarThumb3 from "@/public/assets/images/Team/Team_Img_Three.png";
import avatarThumb4 from "@/public/assets/images/Team/Team_Img_Four.png";
import avatarThumb5 from "@/src/assets/images/team/crew_avatar5.png";
import avatarThumb6 from "@/src/assets/images/team/crew_avatar6.png";
import avatarThumb7 from "@/src/assets/images/team/crew_avatar7.png";
import avatarThumb8 from "@/src/assets/images/team/crew_avatar8.png";

const data = [
  {
    avatar: avatarThumb1,
    name: "D.C",
    designation: "Founder & Dev",
    socialLinks: [
      {
        icon: <FaLinkedinIn />,
        url: "https://www.linkedin.com/in/neozdistrict/",
      },
      {
        icon: <FaXTwitter />,
        url: "https://twitter.com/stackbreaker",
      },
      {
        icon: <FaInstagram />,
        url: "https://www.instagram.com/billionairehunters/",
      },
    ],
  },
  {
    avatar: avatarThumb2,
    name: "Nathan",
    designation: "2D/3D Artist",
    
  },
  {
    avatar: avatarThumb3,
    name: "Sule Man",
    designation: "Metaverse Dev",
    socialLinks: [
      {
        
        url: "#",
      },
      {
        icon: <FaInstagram />,
        url: "https://www.instagram.com/suleimanprogrammer/",
      },
      {
        
        url: "#",
      },
    ],
  },
  {
    avatar: avatarThumb4,
    name: "Ramish",
    designation: "3D Animator",
    socialLinks: [
      {
        
        url: "#",
      },
      {
        icon: <FaInstagram />,
        url: "https://www.instagram.com/ramishfaraz.007/",
      },
      {
        
        url: "#",
      },
    ],
  },
  // {
  //   avatar: avatarThumb5,
  //   name: "Moneo Doa",
  //   designation: "UI Designer",
  //   socialLinks: [
  //     {
  //       icon: <FaLinkedinIn />,
  //       url: "#",
  //     },
  //     {
  //       icon: <FaXTwitter />,
  //       url: "#",
  //     },
  //     {
  //       icon: <FaInstagram />,
  //       url: "#",
  //     },
  //   ],
  // },
  // {
  //   avatar: avatarThumb6,
  //   name: "Tamsan Doe",
  //   designation: "Software Engineer",
  //   socialLinks: [
  //     {
  //       icon: <FaLinkedinIn />,
  //       url: "#",
  //     },
  //     {
  //       icon: <FaXTwitter />,
  //       url: "#",
  //     },
  //     {
  //       icon: <FaInstagram />,
  //       url: "#",
  //     },
  //   ],
  // },
  // {
  //   avatar: avatarThumb7,
  //   name: "Sony Jina",
  //   designation: "Blockchain Dev",
  //   socialLinks: [
  //     {
  //       icon: <FaLinkedinIn />,
  //       url: "#",
  //     },
  //     {
  //       icon: <FaXTwitter />,
  //       url: "#",
  //     },
  //     {
  //       icon: <FaInstagram />,
  //       url: "#",
  //     },
  //   ],
  // },
  // {
  //   avatar: avatarThumb8,
  //   name: "Natala Elon",
  //   designation: "SEO Engineer",
  //   socialLinks: [
  //     {
  //       icon: <FaLinkedinIn />,
  //       url: "#",
  //     },
  //     {
  //       icon: <FaXTwitter />,
  //       url: "#",
  //     },
  //     {
  //       icon: <FaInstagram />,
  //       url: "#",
  //     },
  //   ],
  // },
];

export default data;
