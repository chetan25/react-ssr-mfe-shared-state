import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import useCounter from "../hooks/useCounter";
import useClickOutside from "../hooks/useClickOutside";
import { Link as RouterLink } from "react-router-dom";
import { useGlobalStore } from "../hooks/global-state";

const CounterWithHook = () => {
  // hook ref
  const ref = useRef(null);
  const callBack = (_: Event) => {
    console.log("clicked");
  };
  useClickOutside(ref, callBack);

  // hook
  const [countVal, updateCountVal] = useCounter(10);

  const handleCountClick = () => {
    if (Math.random() > 0.5) {
      updateCountVal(countVal + 1);
    } else {
      updateCountVal(countVal - 1);
    }
  };

  return (
    <>
      <h2 ref={ref}>Welcome to Overview Page</h2>
      <h4>Counter with Hook</h4>
      <p>
        Current count is {countVal} (incerement if random value above 0.5, else
        decrement
      </p>
      <Button variant="contained" color="primary" onClick={handleCountClick}>
        Update Count
      </Button>
    </>
  );
};

const Overview = () => {
  const [globalState] = useGlobalStore();

  const getRoute = (name: string) => {
    // @ts-ignore
    const route = globalState.appRoutes.about.routes[name];
    return route;
  };

  return (
    <div>
      <CounterWithHook />
      <div>
        <h4> To navigate to About(separate mfe)</h4>
        <RouterLink to={getRoute("about")}>About(separate mfe)</RouterLink>
      </div>
    </div>
  );
};

export default Overview;
