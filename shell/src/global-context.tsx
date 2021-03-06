import React, { useContext, Dispatch } from "react";
import SharedContext, { SharedContextType } from "global-state";
import useLocalStorage from "./hooks/useLocal-storage";
// @ts-ignore
const remotes = window.INITIAL_STATE;

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalState, setGlobalState] = useLocalStorage<SharedContextType>(
    "globalData",
    {
      user: null,
      ...remotes,
      appRoutes: {
        home: {},
        about: {},
      },
    }
  );

  return (
    <SharedContext.Provider value={[globalState, setGlobalState]}>
      {children}
    </SharedContext.Provider>
  );
};

export const useGlobalSharedContextValue = () => {
  try {
    const [globalState] = useContext(SharedContext) as [
      SharedContextType,
      Dispatch<SharedContextType>
    ];

    return globalState;
  } catch (error) {
    throw new Error("Use useGlobalContext inside a provider");
  }
};

export const useGlobalSharedContextUpdate = () => {
  try {
    const [, updateGlobalSharedContext] = useContext(SharedContext) as [
      SharedContextType,
      Dispatch<SharedContextType>
    ];

    return updateGlobalSharedContext;
  } catch (error) {
    throw new Error("Use useGlobalContext inside a provider");
  }
};

export default GlobalContextProvider;
