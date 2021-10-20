// it is important to set global var before any imports
// @ts-ignore
// __webpack_public_path__ = 'http://localhost:3002/';

import React, { useContext, Dispatch } from "react";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import SharedContext, { SharedContextType } from "global-state";

const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
  },
  menuList: {
    display: "grid",
    gridGap: "1rem",
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const [globalState] = useContext(SharedContext) as [
    SharedContextType,
    Dispatch<SharedContextType>
  ];

  const getRoutes = (parentRoute: string, subRoute: string) => {
    // @ts-ignore
    const route = globalState.appRoutes[parentRoute].routes[subRoute];
    return route;
  };

  return (
    <Paper className={classes.container}>
      <MenuList className={classes.menuList}>
        <MenuItem>
          <RouterLink to={getRoutes("home", "home")}>Home</RouterLink>
        </MenuItem>
        <MenuItem>
          <RouterLink to={getRoutes("home", "overview")}>Overview</RouterLink>
        </MenuItem>
        <MenuItem>
          <RouterLink to={getRoutes("about", "about")}>About</RouterLink>
        </MenuItem>
        <MenuItem>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default SideBar;
