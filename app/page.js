"use client";
import Header from "@/src/section/header/v1";
import Banner from "@/src/section/banner/v1";
import Counter from "@/src/section/counter/v1";
import CharacterSlider from "@/src/section/characterSlider/v1";
import HowToMint from "@/src/section/howToMint/v1";
import About from "@/src/section/about/v1";
import RoadMap from "@/src/section/roadMap/v1";
import Team from "@/src/section/team/v1";
import FAQ from "@/src/section/faq/v1";
import Footer from "@/src/section/footer/v1";
import StreetWear from "@/src/section/streetWear";
import Benefits from "@/src/section/Benefits";
import { useEffect, useState } from "react";

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true)
  }, [])
  return (
     isReady ? <>
      <Header />
      <Banner />
      <Counter />
      <CharacterSlider />
      <HowToMint />
      <About />
      <Benefits />
      <StreetWear />
      <RoadMap />
      <Team />
      <FAQ />
      <Footer />
    </> : null
  );
}
