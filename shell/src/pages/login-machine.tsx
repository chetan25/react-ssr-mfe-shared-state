import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// import { useHistory } from "react-router-dom";
import {createLoginMachine} from '../state-machines/login-machine';
import { useMachine} from '@xstate/react';
import {
    Redirect,
  } from "react-router-dom"

import { useGlobalSharedContextUpdate, useGlobalSharedContextValue } from '../global-context';

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
    const setGlobalState = useGlobalSharedContextUpdate();
        const globalState = useGlobalSharedContextValue();
    // const history = useHistory();

    const updateGlobalState = (context: any) => {
        console.log(context.value);
        setGlobalState({
            ...globalState,
            user: {
                name: context.value
            },
        })
    };

    // create a new instance for the email Input State machine
    const loginMachine = createLoginMachine<string>('name', 'idle', '');
    const [state, send] = useMachine(loginMachine, {
        // services: {
        //     //@ts-ignore
        //     updateGlobalState: (context: any) => updateGlobalState(context)
        // }
        actions: {
            updateGlobalState: updateGlobalState
        }
    });
   
    
    console.log(state.value);
    console.log(state.context);
    // const {
    //     name, setName,
    //     error, setError,
    //     handleSubmit
    // } = useLogin();
    
    const handleFocus = () => {
        send('ON_FOCUS');
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setName(event.currentTarget.value);
        send({
            type: 'INPUT_CHANGED',
            value: event.currentTarget.value
        })
    }

    const handleFormSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        send({
            type: 'ON_SUBMIT'
        })
        // if(name.length <= 0) {
        //     setError(true);
        //     return;
        // }
        // handleSubmit('/login', () => {
        //     history.push('/home');
        // })
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
                // error={error}
                id="outlined-name"
                label="Name"
                value={state.context.value}
                onFocus={handleFocus}
                onChange={handleNameChange}
            />
            <Button variant="contained" onClick={handleFormSubmit}>Start</Button>
            {
                state.matches('onSubmit.submitting') ? <div>Submitting....</div> : null
            }
            {
                state.matches('onSubmit.success') ?  <Redirect to="/home"/> : null
            }
        </form>
    )
}

export default LoginPage;