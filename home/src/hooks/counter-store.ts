import makeGlobalStore from './store-creator';


const counterReducer = (state: number, action: Record<string, string>) => {
    switch(action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;   
        default:
            return state;   
    }
}

const {
    StoreProvider: CounterGlobalStoreProvider,
    useGlobalStateStore: useGlobalCounterStore,
    useGlobalStoreDispatch: useGlobalCounterDispatch
} = makeGlobalStore<number>(counterReducer, 100);

export {
    CounterGlobalStoreProvider,
    useGlobalCounterStore,
    useGlobalCounterDispatch
}