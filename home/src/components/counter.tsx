import React, { useRef } from 'react';
// import SharedContext, {SharedContextType} from 'global-state';
// import { CounterContext } from '../Home';
import { useGlobalCountStore, useGlobalCountStoreDispatch, useGlobalStore } from '../hooks/global-state';
import Button from '@material-ui/core/Button';
import useCounter from '../hooks/useCounter';
import useClickOutside from '../hooks/useClickOutside';
import {
    CounterGlobalStoreProvider,
    useGlobalCounterStore as useGlobalCounterStore2,
    useGlobalCounterDispatch
} from '../hooks/counter-store';


// type UseCounterType = ReturnType<typeof useCounter>;

const CounterWithGlobalStoreProviderWrapper = ({children}: {children: React.ReactNode}) => {
     return <CounterGlobalStoreProvider>
        {children}
     </CounterGlobalStoreProvider>
}

const CounterWithGlobalStoreProvider = () => {
    const countVal = useGlobalCounterStore2();
    const dispatch = useGlobalCounterDispatch();

   return (
       <>
            <p>Current count is {countVal}</p>
            <Button variant="contained" color="primary" onClick={() => {
                dispatch({type: 'increment'})
            }}>
                Update Count
            </Button>
       </>
   )
}

const CounterWithHook = () => {
    // hook ref
    const ref = useRef(null);
    const callBack = (_: Event) => {
         console.log('clicked')
    }
    useClickOutside(ref, callBack);
 
     // hook
    const [countVal, updateCountVal ] = useCounter(10);

    const handleCountClick = () => {
        if (Math.random() > 0.5) {
            updateCountVal(countVal + 1);
        } else {
            updateCountVal(countVal - 1);
        }
    }

    return (
      <>
        <h3 ref={ref}>Counter with Hook</h3>
        <p>Current count is {countVal} (incerement if random value above 0.5, else decrement</p>
        <Button variant="contained" color="primary" onClick={handleCountClick}>
            Update Count
        </Button>
      </>
    )
}

const Counter = () => {
    // const [globalState] = useContext(SharedContext) as [SharedContextType, Dispatch<SharedContextType>];
    
    // const [count, setCount] = useContext(CounterContext) as [number, Dispatch<number>];
    // const [count, dispatch] = useGlobalCounterStore();

    const {count} = useGlobalCountStore();
    const [globalUser] = useGlobalStore();
    const dispatch = useGlobalCountStoreDispatch()
    
     return (
         <div>
             <h2>Welcome user {globalUser?.user?.name} to play Counter</h2>
             <div>
                <h3>Counter with Shared Context</h3>
                <p>Current count is {count}</p>
                <Button variant="contained" color="primary" onClick={() => dispatch({type: 'increment'})}>
                   Increment COunt
                </Button>
             </div>
             <div>
                <CounterWithHook />
             </div>
             <div>
                <CounterWithGlobalStoreProviderWrapper>
                    <CounterWithGlobalStoreProvider />
                </CounterWithGlobalStoreProviderWrapper>
             </div>
         </div>
     )
}

export default Counter;
