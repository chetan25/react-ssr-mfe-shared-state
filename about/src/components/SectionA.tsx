import React, { useState, useContext, Dispatch} from 'react';
import Button from '@material-ui/core/Button';
// import {useGlobalStore, useGlobalStoreDispatch } from '../hooks/global-state';
import SharedContext, {SharedContextType} from 'global-state';
import TextField from "@material-ui/core/TextField";

const SectionA = () => {
    // const globalState = useGlobalStore();
    // const dispatch = useGlobalStoreDispatch();
    // NO need to Wrap one conetxt insod eonother one, the update will cause re-triggers
    const [globalState, updateGlobalUser] = useContext(SharedContext) as [SharedContextType, Dispatch<SharedContextType>];
    const [name, setName] = useState('');
   
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    return (
       <div>
            <h2>Welocme User {globalState?.user?.name}</h2>
            <p>You can change the global user by typing a new name and submitting</p>
            <form>
                <TextField
                    id="outlined-name"
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                />
                <Button variant="contained" onClick={() => {
                   updateGlobalUser(
                    {
                        ...globalState,
                        user: {
                            name: name
                        }
                    }
                   )
                }}>Update User</Button>
            </form>
       </div>
    )
}

export default SectionA;