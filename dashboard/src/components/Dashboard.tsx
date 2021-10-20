import React from "react";
import { useGlobalStore } from "../hooks/global-state";

const About = () => {
  const [globalState] = useGlobalStore();
  const { appRoutes } = globalState;

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <h4> Available Routes are</h4>
      <ul>
        {Object.keys(appRoutes).map((appName) => {
          const mfeName = appRoutes[appName].app;
          const routes = appRoutes[appName].routes;
          return (
            <li key={mfeName}>
              <h4>App - {mfeName}</h4>
              <ul>
                {Object.keys(routes).map((route: any) => {
                  return (
                    <li key={route}>
                      {route} --- {routes[route]}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default About;
