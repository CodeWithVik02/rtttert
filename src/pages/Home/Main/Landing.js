import React from "react";

import Hero from "../components/hero";
import LandingLayout from "../components/layout";

export default function Landing({userData , isMobile , isLogged}) {
  return (
    <LandingLayout children={<Hero
        title="SupliffyX Menage and Leading Team Platform"
        subtitle="This platform is only for the leading team of SupliffyX where upcoming projects are presented"
        ctaText="Create your account now"
        ctaLink="/signup"
        userData={userData}
     />} isMobile={isMobile} isLogged={isLogged} />
      
    
  );
}
