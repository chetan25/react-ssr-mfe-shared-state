---
title: Simple MFE apps with shared state and static routing logic.
excerpt: Build simple MFE that shares global state along with route info within all MFEs.
Tools: ['Express', 'React', 'Redux', 'ReactDOM' 'Webpack', 'XSTate', 'SSR']
---

## Mono Repo Structure

#### Server
This is a simple Express server that serves following purpose: 
    - Figures out the remote entry path for different Micro frontends and adds the script tag to load the remote entry files for them.
    - Loads a simple server side rendered react app that contains the element to render the React App in browser.
    - It also adds some data to window object that would be sanitized and added to global store in FE.
- To un the server navigate to `server` and run `npm run dev`. It will fire up the server at `http://localhost:3000` 

#### Shell App
- This is the Container App, that would load the other micro front ends.
- It is responsible for -
  - Loading all the Micro FE for the App.
  - Registering the SharedContext from the `Shared Library` as a root level context provider.
  - Providing the Shared Context with the shared data.
  - Setting the Router Provider for the App at the root level.
  - Registering all the routes from the Micro FEs and providing them in the shared context data.
- It has the main entry point which is a Login page.
- Login Page is done in 2 ways, one with `hook based` approach and one with `XState`. We can toggle between those implementation in the `aap.tsx` file.  
- To run Shell App, navigate to `shell` and run `npm start`. It fires a server at  `http://localhost:3001`

#### Nav App
- This is a Mico FE that contains the Header and the Sidebar.
- To run Nav App, navigate to `nav` and run `npm start`. It fires the server at  `http://localhost:3002`


#### Home App
- This is another Micro FE, that has the `/home` and the `/home/overview` route implementation.
- It exposes the base Home App in the webpack config.
- It also exposes the routes as a separate entry.
- It has a basic implementation of counter with some hooks concept and some different ways to create a Store and Context Provider.
- To run Home App, navigate to `home` and run `npm start`. It fires the server at  `http://localhost:3003`


#### About App
- This is another Micro FE, that has the `/about` route implementation.
- It exposes the base About App in the webpack config.
- It also exposes the routes as a separate entry.
- To run Home App, navigate to `about` and run `npm start`. It fires the server at  `http://localhost:3005`


#### Dashboard App
- This is another Micro FE, that has the `/dashboard` route implementation.
- It exposes the base Dashboard App in the webpack config.
- It also exposes the routes as a separate entry.
- To run Home App, navigate to `dashboard` and run `npm start`.  It fires the server at  `http://localhost:3006`
  
##### Shared State Library
- This is a simple library that exposes a simple Shared Context.
- This Shared context serves as root level context to share state between different micro apps.

Note - To install the Shared lib in every package, run `npm pack` in the Shared State library and than take that tar file and install it as a normal dep in other sub apps.

## Gotchas

#### Sharing Shared State library
- We have install the Shared Library as a dependency in all the apps, but the trick is to share it as a `shared dep` in the Webpack Module Federation plugin, so that it is register as a singleton instance in all apps, otherwise when each app imports it, they will get a new instance of context from the shared library and that would not help us in sharing state through it. 
- Providing Shared library as singleton instance, every App gets the same instance of the context on importing.

#### Static Routing
- In order to know all the routes available from different Micro FE at runtime/development time, we had to do the routing for Apps using a `router config object` and not as a `Static Router component`. 
- We also create a new file that just contains the routing object with name and the path and we add it to the window object.
- We then expose this file as the separate entry file, in the webpack config.This makes it available for the Shell App to consume it at bootstrap and register the routes from window object to the shared state.
