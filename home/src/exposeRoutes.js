const initialRoute = "/home";

export const homeRoutes = {
  home: `${initialRoute}`,
  overview: `${initialRoute}/overview`,
};

window["home"] = {
  app: "home",
  routes: homeRoutes,
};
