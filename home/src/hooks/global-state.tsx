import React, { useReducer, Dispatch, createContext, useContext } from "react";
import SharedContext, { SharedContextType } from "global-state";

export interface HomeGlobalState {
  // user: {
  //     name: string;
  // } | null;
  count: number;
}

export const GlobalContext = createContext<HomeGlobalState>({
  // user: null,
  count: 0,
});

export const GlobalContextDispatch = createContext<
  Dispatch<Record<string, any>>
>(() => {});

export interface StoreeType<T> {
  children: React.ReactNode;
  reducer?: (state: T, action: Record<string, any>) => T;
  initialState?: T;
}

export const StoreProvider = ({
  children,
}: // reducer = defautReducer,
// initialState = 0
StoreeType<HomeGlobalState>) => {
  // NO need to Wrap one conetxt insod eonother one, the update will cause re-triggers

  // const [globalUser, updateGlobalUser] = useContext(SharedContext) as [SharedContextType, Dispatch<SharedContextType>];
  const initialState = {
    // user: globalUser.user,
    count: 0,
  };

  const [store, dispatch] = useReducer(
    (state: HomeGlobalState, action: Record<string, string>) => {
      switch (action.type) {
        case "increment":
          return {
            ...state,
            count: state.count + 1,
          };
        case "decrement":
          return {
            ...state,
            count: state.count - 1,
          };
        //  case 'updateUser':
        //     // updateGlobalUser()
        default:
          return state;
      }
    },
    initialState
  );

  return (
    <GlobalContextDispatch.Provider value={dispatch}>
      <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
    </GlobalContextDispatch.Provider>
  );
};

export const useGlobalCountStore = () => {
  return useContext(GlobalContext);
};

export const useGlobalCountStoreDispatch = () => {
  return useContext(GlobalContextDispatch);
};

export const useGlobalStore = (): [
  SharedContextType,
  Dispatch<SharedContextType>
] => {
  const [globalState, updateGlobalState] = useContext(SharedContext) as [
    SharedContextType,
    Dispatch<SharedContextType>
  ];

  return [globalState, updateGlobalState];
};
