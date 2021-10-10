import React from "react";
import { StoreProvider } from './hooks/global-state';
import SectionA from './components/SectionA';

const About = () => {
  return (
    <StoreProvider> 
       <p>NO need to Wrap one conetxt insod eonother one, the update will cause re-triggers</p>
       <SectionA/>
    </StoreProvider>
  );
};

export default About;
