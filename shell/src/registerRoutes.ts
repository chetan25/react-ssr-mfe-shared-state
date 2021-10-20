import React, {useEffect} from 'react';
import { useGlobalSharedContextUpdate, useGlobalSharedContextValue } from './global-context';

const RegisterRoutes = () => {
    const setGlobalState = useGlobalSharedContextUpdate();
    const globalState = useGlobalSharedContextValue();

    useEffect(() => {
        // configure routes for remotes
        const homeRoutePath = globalState.remoteJs.home;

        // @ts-ignore
        import(/* webpackIgnore: true */ `${homeRoutePath}/homeAppRoutes.js`)
        .then(() => {
            setGlobalState({
                ...globalState,
                appRoutes: {
                    ...globalState.appRoutes,
                    // @ts-ignore
                    home: window['homeAppRoutes']
                }
            });
        });
    }, [])
    

    return null;
}

export default RegisterRoutes;