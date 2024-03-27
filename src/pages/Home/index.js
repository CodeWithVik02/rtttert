import React from "react";

import VideoBanner from "../../components/Video-Banner";
import Banner from "../../components/Banner";
import Features from "../../components/Features";
function Home({isLogged, isMobile}) {
  return (
    <>
      <Banner isLogged={isLogged}/>
      <Features/>
      <VideoBanner isMobile={isMobile}/>
    </>
  );
}


export default Home;
