import { useEffect } from "react";
import {
  useGlobalSharedContextUpdate,
  useGlobalSharedContextValue,
} from "./global-context";

const RegisterRoutes = () => {
  const setGlobalState = useGlobalSharedContextUpdate();
  const globalState = useGlobalSharedContextValue();

  useEffect(() => {
    const init = async () => {
      console.log(globalState, "RegisterRoutes");
      // configure routes for remotes
      const availableRemotes = Object.keys(globalState.remoteJs).filter(
        (remote) => remote !== "nav" // since nav have no routes
      );
      // loop and register routes
      const allRoutes = {};
      const promises = availableRemotes.map(async (route) => {
        const path = globalState.remoteJs[route];
        // @ts-ignore
        return await import(/* webpackIgnore: true */ `${path}/routes.js`).then(
          () => {
            console.log(`downloaded routes for ${route}`);
            // @ts-ignore
            allRoutes[route] = window[route];
          }
        );
      });
      await Promise.all(promises);

      setGlobalState({
        ...globalState,
        appRoutes: allRoutes,
      });

      // const homeRoutePath = globalState.remoteJs.home;
      // // @ts-ignore
      // await import(/* webpackIgnore: true */ `${homeRoutePath}/routes.js`).then(
      //   () => {
      //     console.log("downloaded routes for home");
      //   }
      // );

      // const aboutRoutePath = globalState.remoteJs.about;
      // // @ts-ignore
      // await import(
      //   /* webpackIgnore: true */ `${aboutRoutePath}/routes.js`
      // ).then(() => {
      //   console.log("downloaded routes for about");
      // });

      // const dashboardRoutePath = globalState.remoteJs.dashboard;
      // // @ts-ignore
      // await import(
      //   /* webpackIgnore: true */ `${dashboardRoutePath}/routes.js`
      // ).then(() => {
      //   console.log("downloaded routes for dashboard");
      // });

      // setGlobalState({
      //   ...globalState,
      //   appRoutes: {
      //     ...globalState.appRoutes,
      //     // @ts-ignore
      //     home: window["homeAppRoutes"],
      //     // @ts-ignore
      //     about: window["aboutAppRoutes"],
      //     // @ts-ignore
      //     dashboard: window["dashboardAppRoutes"],
      //   },
      // });
    };

    if (Object.keys(globalState.appRoutes.home).length <= 0) {
      init();
    }
  }, []);

  return null;
};

export default RegisterRoutes;
