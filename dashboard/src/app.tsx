import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import getRoutes from "./routeConfig";

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: "dashboardApp",
});

const DashboardApp = () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Switch>
          {getRoutes().map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                // exact={route.exact}
              >
                <route.component />
              </Route>
            );
          })}
        </Switch>
      </StylesProvider>
    </div>
  );
};

export default DashboardApp;
