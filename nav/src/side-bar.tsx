// it is important to set global var before any imports
// @ts-ignore
// __webpack_public_path__ = 'http://localhost:3002/';

import React from "react";
import { Link  as RouterLink} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    container: {
        height: '100%'
    },
    menuList: {
        display: 'grid',
        gridGap: '1rem'
    }
}));

const SideBar = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.container}>
            <MenuList className={classes.menuList}>
                <MenuItem>
                    <RouterLink to="/home">
                        Home
                    </RouterLink>
                </MenuItem>
                <MenuItem>
                    <RouterLink to="/about">
                      About
                    </RouterLink>
                </MenuItem>
                <MenuItem>
                    <RouterLink to="/dashboard">
                       Dashboard
                    </RouterLink>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}

export default SideBar;