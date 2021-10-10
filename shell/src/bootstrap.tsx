import React from "react";
import ReactDOM from "react-dom";
import ShellApp from "./app";
import GlobalContextProvider from './global-context';

// @ts-ignore
const initialState =  window.INITIAL_STATE;

ReactDOM.render(
    <GlobalContextProvider><ShellApp /></GlobalContextProvider>,
    document.getElementById("shell")
);
