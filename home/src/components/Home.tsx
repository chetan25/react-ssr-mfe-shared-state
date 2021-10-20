import React from "react";
import Counter from './counter';
import { StoreProvider } from '../hooks/global-state';
import MaterialLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  console.log(history, 'home');
  return (
    <StoreProvider> 
        <MaterialLink component={Link} to="/home/overview" color="inherit">
           Overview
      </MaterialLink>{' '}
       <Counter/>
    </StoreProvider>
  );
};

export default Home;
