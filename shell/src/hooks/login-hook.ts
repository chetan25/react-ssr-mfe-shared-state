import {useState} from 'react';
import { useGlobalSharedContextUpdate, useGlobalSharedContextValue } from '../global-context';

const useLogin = () => {
    const setGlobalState = useGlobalSharedContextUpdate();
    const globalState = useGlobalSharedContextValue();

    const [name, setName] = useState<string>('');
    const [error, setError] = useState(false);

    const handleSubmit = (
        url: string,
        cb: () => void
    ) => {
        fetch(url, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        }).then(res => {
           console.log(res);
           if(res.status == 200) {
            setGlobalState({
                ...globalState,
                user: {
                    name
                },
            })
            cb();
           }
        });
    }

    return {
        name, setName,
        error, setError,
        handleSubmit
    }
}

export default useLogin;