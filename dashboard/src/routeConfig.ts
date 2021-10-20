import Dashboard from "./components/Dashboard";

const initialRoute = "/dashboard";
export default () => [
  {
    path: `${initialRoute}`,
    component: Dashboard,
    // exact: true
  },
];
