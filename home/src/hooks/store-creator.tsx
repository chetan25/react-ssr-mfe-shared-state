import React, { useReducer, Dispatch, createContext, useContext } from 'react';

export interface StoreeType<T> {
    children: React.ReactNode,
    reducer?: (state: T, action: Record<string, any>) => T, 
    initialState?: T
}

type StoreReducer<ReducerState> = (state: ReducerState, action: Record<string, string>) => ReducerState;

const makeGlobalStore = <ReducerState,>(
    reducer: StoreReducer<ReducerState>,
    initalState: ReducerState
) => {
    const GlobalCoContext = createContext<ReducerState| undefined>(undefined);
    const GlobalContextDispatch = createContext<Dispatch<Record<string, any>>>(() => {});
    
  
    const StoreProvider = ({
        children
    }: StoreeType<number>) => {
        const [store, dispatch] = useReducer(reducer, initalState);
    
        return <GlobalContextDispatch.Provider value={dispatch}>
            <GlobalCoContext.Provider value={store}>
                {children}
            </GlobalCoContext.Provider>
        </GlobalContextDispatch.Provider>
    }
    
   const useGlobalStateStore = () => {
        return useContext(GlobalCoContext)
    }
    
    const useGlobalStoreDispatch = () => {
        return useContext(GlobalContextDispatch)
    }

    return {
        StoreProvider,
        useGlobalStateStore,
        useGlobalStoreDispatch
    }
}

export default makeGlobalStore;