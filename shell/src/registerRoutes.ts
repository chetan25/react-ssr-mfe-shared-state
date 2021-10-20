import React, { useEffect } from "react";
import {
  useGlobalSharedContextUpdate,
  useGlobalSharedContextValue,
} from "./global-context";

const RegisterRoutes = () => {
  const setGlobalState = useGlobalSharedContextUpdate();
  const globalState = useGlobalSharedContextValue();

  useEffect(() => {
    const init = async () => {
      setGlobalState({
        ...globalState,
        appRoutes: {
          home: {},
          about: {},
        },
      });
      // configure routes for remotes
      const homeRoutePath = globalState.remoteJs.home;

      // @ts-ignore
      await import(
        /* webpackIgnore: true */ `${homeRoutePath}/homeAppRoutes.js`
      ).then(() => {
        console.log("downloaded routes for home");
      });

      const aboutRoutePath = globalState.remoteJs.about;
      // @ts-ignore
      await import(
        /* webpackIgnore: true */ `${aboutRoutePath}/aboutAppRoutes.js`
      ).then(() => {
        console.log("downloaded routes for about");
      });

      const dashboardRoutePath = globalState.remoteJs.dashboard;
      // @ts-ignore
      await import(
        /* webpackIgnore: true */ `${dashboardRoutePath}/dashboardAppRoutes.js`
      ).then(() => {
        console.log("downloaded routes for dashboard");
      });

      setGlobalState({
        ...globalState,
        appRoutes: {
          ...globalState.appRoutes,
          // @ts-ignore
          home: window["homeAppRoutes"],
          // @ts-ignore
          about: window["aboutAppRoutes"],
          // @ts-ignore
          dashboard: window["dashboardAppRoutes"],
        },
      });
    };

    init();
  }, []);

  return null;
};

export default RegisterRoutes;
