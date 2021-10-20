import { Dispatch, useContext } from "react";
import SharedContext, { SharedContextType } from "global-state";

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
