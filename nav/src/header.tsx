// it is important to set global var before any imports
// @ts-ignore
// __webpack_public_path__ = 'http://localhost:3002/';

import React, {useContext, Dispatch} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import SharedContext, {SharedContextType} from 'global-state';

const useStyles = makeStyles(() => ({
    container: {
        height: '100%'
    }
}));


const PageHeader = () => {
    const [globalState] = useContext(SharedContext) as [SharedContextType, Dispatch<SharedContextType>];
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.container}>
           <Typography
                variant='subtitle1'
                color="inherit"
                noWrap
                gutterBottom
                align="center"
            >
                {globalState.user.name}
            </Typography>
        </AppBar>
    )
}

export default PageHeader;