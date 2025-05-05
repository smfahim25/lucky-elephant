import Head from "next/head";
import GlobalStyles from "@/src/assets/styles/GlobalStyles";
import favIcon from "@/app/favIcon.ico";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        {/* meta tag*/}
        <meta charSet="utf-8" />
        <title>
          {" "}
          Lucky Elephant Club | NFT Minting, DAO Governance, & Rewards
        </title>
        <meta name="description" content="" />
        <link rel="shortcut icon" type="image/x-icon" href={favIcon.src} />
        {/* responsive tag */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>

      {/* global styles */}
      <GlobalStyles />
      <main>{children}</main>
    </>
  );
};

export default Layout;
