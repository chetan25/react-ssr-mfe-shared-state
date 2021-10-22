import React, { Suspense } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./pages/login";
// import LoginPage from './pages/login-machine';
import ContainerApp from "./container";
import { useGlobalSharedContextValue } from "./global-context";

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: "mrk",
});

const ShellApp = () => {
  const globalState = useGlobalSharedContextValue();
  console.log(globalState, "globalState");

  return (
    <ErrorBoundary appName="shellApp">
      <Suspense fallback="loading....">
        <StylesProvider generateClassName={generateClassName}>
          <Router>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route
                path="/"
                render={({ location }) =>
                  globalState?.user ? (
                    <ContainerApp />
                  ) : (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: location },
                      }}
                    />
                  )
                }
              />
            </Switch>
          </Router>
        </StylesProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default ShellApp;
