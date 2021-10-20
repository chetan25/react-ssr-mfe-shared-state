import React from "react";
// import SharedContext, {SharedContextType} from 'global-state';
// import { CounterContext } from '../Home';
import {
  useGlobalCountStore,
  useGlobalCountStoreDispatch,
} from "../hooks/global-state";
import Button from "@material-ui/core/Button";
import {
  CounterGlobalStoreProvider,
  useGlobalCounterStore as useGlobalCounterStore2,
  useGlobalCounterDispatch,
} from "../hooks/counter-store";

// type UseCounterType = ReturnType<typeof useCounter>;

const CounterWithGlobalStoreProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <CounterGlobalStoreProvider>{children}</CounterGlobalStoreProvider>;
};

const CounterWithGlobalStoreProvider = () => {
  const countVal = useGlobalCounterStore2();
  const dispatch = useGlobalCounterDispatch();

  return (
    <>
      <p>Current count is {countVal}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch({ type: "increment" });
        }}
      >
        Update Count
      </Button>
    </>
  );
};

const Counter = () => {
  // const [globalState] = useContext(SharedContext) as [SharedContextType, Dispatch<SharedContextType>];

  // const [count, setCount] = useContext(CounterContext) as [number, Dispatch<number>];
  // const [count, dispatch] = useGlobalCounterStore();

  const { count } = useGlobalCountStore();
  const dispatch = useGlobalCountStoreDispatch();

  return (
    <div>
      <div>
        <h3>Counter with Shared Context</h3>
        <p>Current count is {count}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: "increment" })}
        >
          Increment COunt
        </Button>
      </div>

      {/* <div>
        <CounterWithGlobalStoreProviderWrapper>
          <CounterWithGlobalStoreProvider />
        </CounterWithGlobalStoreProviderWrapper>
      </div> */}
    </div>
  );
};

export default Counter;
