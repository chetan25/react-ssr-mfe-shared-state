import Home from "./components/Home";
import Overview from "./components/Overview";
import { homeRoutes } from "./exposeRoutes";

// const initialRoute = "/home";

// export const homeRoutes = {
//   home: `${initialRoute}`,
//   overview: `${initialRoute}/overview`,
// };

export default () => [
  {
    name: "overview",
    path: homeRoutes["overview"],
    component: Overview,
  },
  {
    name: "home",
    path: homeRoutes["home"],
    component: Home,
    // exact: true
  },
];
