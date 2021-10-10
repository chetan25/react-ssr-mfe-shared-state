import React from "react";
import Counter from './components/counter';
import { StoreProvider } from './hooks/global-state';

const Home = () => {
  return (
    <StoreProvider> 
       <Counter/>
    </StoreProvider>
  );
};

export default Home;
