import React from "react";
import ReactDOM from "react-dom";
import ShellApp from "./app";
import GlobalContextProvider from "./global-context";
import RegisterRoutes from "./registerRoutes";
import ErrorBoundary from "./components/ErrorBoundary";

// @ts-ignore
const initialState = window.INITIAL_STATE;

ReactDOM.render(
  <GlobalContextProvider>
    <RegisterRoutes />
    <ErrorBoundary appName="shellApp">
      <ShellApp />
    </ErrorBoundary>
  </GlobalContextProvider>,
  document.getElementById("shell")
);
