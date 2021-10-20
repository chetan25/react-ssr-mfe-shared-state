import React from "react";
import ReactDOM from "react-dom";
import ShellApp from "./app";
import GlobalContextProvider from './global-context';
import RegisterRoutes from './registerRoutes';

// @ts-ignore
const initialState =  window.INITIAL_STATE;

ReactDOM.render(
    <GlobalContextProvider>
        <RegisterRoutes />
        <ShellApp />
    </GlobalContextProvider>,
    document.getElementById("shell")
);
