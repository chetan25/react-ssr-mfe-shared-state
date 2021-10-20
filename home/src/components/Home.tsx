import React from "react";
import Counter from "./counter";
import { StoreProvider } from "../hooks/global-state";
// import { useHistory } from "react-router-dom";
import { useGlobalStore } from "../hooks/global-state";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const [globalState] = useGlobalStore();

  const getRoute = (name: string) => {
    // @ts-ignore
    const route = globalState.appRoutes.home.routes[name];
    return route;
  };

  return (
    <StoreProvider>
      <h2>
        Welcome user {globalState?.user?.name} to Home App(default route is Home
        Counter)
      </h2>
      <section>
        <h4>To switch to OverView click the link</h4>
        <RouterLink to={getRoute("overview")}>Overview(Under Home)</RouterLink>
      </section>
      <Counter />
    </StoreProvider>
  );
};

export default Home;
