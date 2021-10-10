  
import React, {Suspense} from 'react';
import { Switch, Route,  BrowserRouter as Router, Redirect  } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import LoginPage from './pages/login';
import ContainerApp from './container';
import { useGlobalSharedContextValue } from './global-context';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'mrk'
});

// @ts-ignore
window['React'] = React;

const ShellApp = () => {
  const globalState = useGlobalSharedContextValue();
  console.log(globalState.user);
  
  const test = async () => {
    console.log('3433434');
    // @ts-ignore
    // import(/* webpackIgnore: true */ 'http://127.0.0.1:8080/main.js').then(thing => {
    //   console.log(thing);
    //   const fn = thing.myThing;
    //   console.log(thing.myThing());
    // })
    // const th = await import(/* webpackIgnore: true */ 'http://127.0.0.1:8080/main.js');
    // // @ts-ignore
    // console.log(th.default())
  }

  test();
  return (
    <Suspense fallback='loading....'>
       <StylesProvider generateClassName={generateClassName}>
           <Router>
              <Switch>
                  <Route exact path='/login' component={LoginPage} />
                  <Route 
                      path='/'
                      render={({ location }) =>
                        globalState?.user ? (
                          <ContainerApp/>
                        ) : (
                          <Redirect
                            to={{
                              pathname: "/login",
                              state: { from: location }
                            }}
                          />
                        )
                      }
                    />
                  
              </Switch>
           </Router>
       </StylesProvider>
    </Suspense>
  );
};

export default ShellApp;