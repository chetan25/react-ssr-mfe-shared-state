---
title: Simple SSR React App.
excerpt: Building a simple SSR react app to learn the SSR basics.
Tools: ['SSR', 'Express', 'React', 'Redux', 'ReactDOM' 'Webpack']
---

### SSR APP
Simple app to practice SSR with React.

It contains: 
- API Server(Data Layer) - to serve our API data, like auth, list of user.
- Rendering Server(View Layer) - takes data and produces html. Since we use React, this would be using some react logic.
- Having a separate Rendering server, we have separation of concerns and also gives flexibility to replace the rendering server with any framework. It also provide scalability.

#### Workflow
- To render component from server side we are using the `renderToString` function of `ReactDOM`. 
- Which will render bunch of components and produce a string out of all the resulting html.
- Since node does not understand the JSX syntax we need to set up some tooling.
- We will use webpack + babel to solve this.
- We will run webpack on our server entry code and then run that.
- Server side code by default will only ship HTML and to use JS , we need to setup React an let it handle the events.
- To do this we will generate two bundle, one for BE and one for client.

*** Note ***
Make sure the HTML generated from Server is same as Client


#### Render flow
- App rendered by server into some element. This is just a skeleton, minus the handlers.
- This rendered app is sent to user browser and browser renders the HTML and loads the client side bundle.
- Client side bundle boots up.
- We then render the react app a second time into same element.
- When we render the React app on client side, React compares the new html with what already exists in that element. This process is called hydration.
- React takes over the existing rendered app, binds event handlers, etc


#### Routing 
- Express will pass all route request to React router to manage.
- Express will always respond with 'index.html' that will boot react and than React router will decide what to load.
- BrowserRouter looks at the URL in browser address bar and then renders the route. 
- BrowserRouter won't work in server side.
- We would use the StaticRouter in the Server.
- StaticRouter is used for SSR.
- 

##### Server Side Data Challenges
- Redux needs different configuration for server and client.
- Needs some way to detect when the initial data load action creator are completed on server. In client side we don't care as the action creator would finish and our app would re-render.
- Need state hydration on the browser.
- Auth needs to be handled in server, normally we do it in browser, since we have cookie based authentication.

### Data loading in Server
- Will attach a function to all components that will describe the data that component needs.
- We will figure out what component would be rendered based on the URL.(using `react-router-config`). We will need to define our routes as array of objects.
- Than we will call that method on each component to load data for that component.
- We need to pass store to the load function, since the app is not rendered and Provider is not setup.
- We also call dispatch manually to follow the normal process of redux.
- Wait for request to finish.
- Than render the app with all the data.
- This approach is similar to NextJs server side approach.

### State Hydration in Browser
- After rendering HTML in server, we will dump all our state data into html template.
- Then in Client side store creation, we will use that as second argument.

**Important**
If you are using es6 features like async in server side react code, it would assume that there is "regeneratorRuntime" defined in working environment for babel. To make it work we have to import babel polyfill in root of index.  

#### Local development
- `npm run dev:build-server` to compile the server code
- `npm run dev:server` to run the server
- `npm run dev:build-client` for the client bundle
- Or run `npm run dev` to run the above commands in parallel.