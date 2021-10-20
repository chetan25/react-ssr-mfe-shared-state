import About from "./components/About";

const initialRoute = "/about";
export default () => [
  {
    path: `${initialRoute}`,
    component: About,
    // exact: true
  },
];
