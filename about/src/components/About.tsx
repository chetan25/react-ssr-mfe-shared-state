import React from "react";
import { StoreProvider } from "../hooks/global-state";
import SectionA from "./SectionA";

const About = () => {
  return (
    <StoreProvider>
      <SectionA />
    </StoreProvider>
  );
};

export default About;
