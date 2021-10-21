// since we are runnign through webpack we can use es6
import "babel-polyfill";
import express from "express";
import renderApp from "./helpers/renderer";
import createServerStore from "./helpers/store-server";
import Routes from "./client/routes";
import cors from "cors";
import { matchRoutes } from "react-router-config";
const bodyParser = require("body-parser");

const app = express();

// expose public for access
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const name = req.body.name;
  return res.send("Received a POST HTTP method");
});

app.get("*", (req, res) => {
  // creating store, so we have a handle on store and we can detect data loading.
  const store = createServerStore();
  const components = matchRoutes(Routes, req.path);
  // loadData will return the underlyig promise
  const pendingPromises = components.map(({ route }) => {
    // if(route.loadData) {
    //     return route.loadData(store);
    // }
    // return null;
  });

  Promise.all(pendingPromises).then((success) => {
    const html = renderApp(req, store);

    res.send(html);
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
