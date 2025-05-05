"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyleTwo = createGlobalStyle` 

/* ::-moz-selection {
    background: #2D65F8;
    text-shadow: none;
    color: #ffffff;
}
::selection {
    background: #2D65F8;
    text-shadow: none;
    color: #ffffff;
}  */

@font-face {
  font-family: "Sprite";
  /* font-weight: 600; */
  src: url(../fonts/PlaywriteCU-ExtraLight.ttf) format("truetype");
}

html,
body {
    font-size: 16px; 
    font-weight: 500;
    line-height: 1.6;
    margin: 0; /* Add this to remove default margins */
    padding: 0; /* Add this to remove default padding */
    height: 100%; /* Make sure body takes full height */
    width: 100%; /* Make sure body takes full width */
    background-image: url('/back.png');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100vh;
}
.font{
    font-family: "Sprite";
}

img {
    max-width: 100%;
    height: auto;
}

p {
    margin: 0px;
    line-height: 1.8;  
}


h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0px;
    line-height: 1.35;
    font-family: 'Bakbak One', cursive;
   
}

a {
    text-decoration: none !important;
    outline: none;
    transition: all .4s;
}


ul, ol {
    list-style: outside none none;
    margin: 0px;
    padding: 0px;
}

html,
body, p, a{
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
} 

@media (min-width: 1400px){
    .container{
        max-width: 1200px;
        padding: 0px 20px;
    }
} 

`;

export default GlobalStyleTwo;
