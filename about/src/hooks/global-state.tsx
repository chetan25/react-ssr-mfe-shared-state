import React, { useReducer, Dispatch, createContext, useContext } from "react";
import SharedContext, { SharedContextType } from "global-state";

export interface HomeGlobalState {
  user: {
    name: string;
  } | null;
}

export const AboutGlobalContext = createContext<HomeGlobalState>({
  user: null,
});

export const AboutGlobalContextDispatch = createContext<
  Dispatch<Record<string, any>>
>(() => {});

export interface StoreeType<T> {
  children: React.ReactNode;
  reducer?: (state: T, action: Record<string, any>) => T;
  initialState?: T;
}

//   NOTE - No need to Wrap one context inside another one, the update will cause re-triggers

export const StoreProvider = ({
  children,
}: // reducer = defautReducer,
// initialState = 0
StoreeType<HomeGlobalState>) => {
  const [globalState, updateGlobalUser] = useContext(SharedContext) as [
    SharedContextType,
    Dispatch<SharedContextType>
  ];
  const initialState = {
    user: globalState.user,
  };

  const [store, dispatch] = useReducer(
    (state: HomeGlobalState, action: Record<string, string>) => {
      switch (action.type) {
        case "updateUser":
          const newName = action.payload;
          updateGlobalUser({
            ...globalState,
            user: {
              name: newName,
            },
          });

          return {
            user: {
              name: newName,
            },
          };
        default:
          return state;
      }
    },
    initialState
  );

  return (
    <AboutGlobalContextDispatch.Provider value={dispatch}>
      <AboutGlobalContext.Provider value={store}>
        {children}
      </AboutGlobalContext.Provider>
    </AboutGlobalContextDispatch.Provider>
  );
};

export const useGlobalStore = () => {
  return useContext(AboutGlobalContext);
};

export const useGlobalStoreDispatch = () => {
  return useContext(AboutGlobalContextDispatch);
};
