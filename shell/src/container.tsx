import React, { lazy } from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ErrorBoundary from "./components/ErrorBoundary";

const SideBar = lazy(() => import("nav/SideBar"));
const PageHeader = lazy(() => import("nav/PageHeader"));
const HomeApp = lazy(() => import("home/HomeApp"));
const AboutApp = lazy(() => import("about/AboutApp"));
const DashboardApp = lazy(() => import("dashboard/DashboardApp"));

const useStyles = makeStyles(() => ({
  container: {
    display: "grid",
    gridTemplateAreas: `
            "header header header"
            "nav content content"
         `,
    gridTemplateColumns: "200px 1fr 200px",
    gridTemplateRows: "auto 1fr auto",
    gridGap: "10px",
    height: "95vh",
  },
  header: {
    gridArea: "header",
    height: "3rem",
  },
  nav: {
    gridArea: "nav",
    marginLeft: "0.5rem",
  },
  main: {
    gridArea: "content",
    padding: "1rem",
    border: "1px solid rgb(0 0 0 / 14%)",
  },
}));

const ContainerApp = () => {
  //   const localHistory = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ErrorBoundary appName="navPageHeader">
          <PageHeader />
        </ErrorBoundary>
      </div>
      <nav className={classes.nav}>
        <SideBar />
      </nav>
      <main className={classes.main}>
        <Route exact path="/about">
          <ErrorBoundary appName="aboutApp">
            <AboutApp />
          </ErrorBoundary>
        </Route>
        <Route path="/home">
          <ErrorBoundary appName="homeApp">
            <HomeApp />
          </ErrorBoundary>
        </Route>
        <Route path="/dashboard">
          <ErrorBoundary appName="dashboardApp">
            <DashboardApp />
          </ErrorBoundary>
        </Route>
      </main>
    </div>
  );
};

export default ContainerApp;
