import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useLogin from '../hooks/login-hook';

const useStyles = makeStyles(() => ({
    login: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',

        "& > button, div": {
          marginTop: '2rem'
        }
    }
}));


const LoginPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const {
        name, setName,
        error, setError,
        handleSubmit
    } = useLogin();
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setName(event.currentTarget.value);
    }

    const handleFormSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        if(name.length <= 0) {
            setError(true);
            return;
        }
        handleSubmit('/login', () => {
            history.push('/home');
        })
    }

    return (
        <form className={classes.login}>
            <Typography
                variant="h4"
                color="inherit"
                noWrap
            >
                Enter Name to Start
            </Typography>
            <TextField
                error={error}
                id="outlined-name"
                label="Name"
                value={name}
                onChange={handleNameChange}
            />
            <Button variant="contained" onClick={handleFormSubmit}>Start</Button>
        </form>
    )
}

export default LoginPage;