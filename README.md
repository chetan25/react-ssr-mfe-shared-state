---
title: Simple SSR React App with Micro Frontends.
excerpt: Building a simple SSR react that loads different micro frontends dynamically.
Tools: ['Express', 'React', 'Redux', 'ReactDOM' 'Webpack']
---

## Mono Repo Structure

#### Server
This is a simple Express server that serves following pupose: 
    - Figures out the remote entry path for different Micro frontends and adds the script tag to load the remoteentry files for them.
    - Loads a simple server side rendered react app that contains the sidebar and the header. And adds empty div with an 'ID' to load the Container app.
    - It also adds the required data to global scope that would be shared. 

#### Container App
- This is the Container App, that would load the other micro front ends.
- It will be the main Remote app that handles the routing and serves the Shell for managing other apps.
- The main bundle for will be loaded directly from the Server.


#### Home App
- To be added soon

#### About App
- To be added soon


## Local development

#### Server
- To run the main server, run `npm run dev`, this will run all the dev scripts require to bootstrap the server(express + react). 
- The app can be accessed at `http://localhost:3000/`

#### Container App
- Run `npm start` to serve the javascripts file for the container app.
- This will start the server at `http://localhost:3001`

## Gotchas

#### Using with uisng css in server
- If you use the style-loader, we would get an error like "document is not defined" 
- Root cause: the plugin style-loader will type CSS into js to generate the style label in js, such as document.createelement ("style"); but the server doesn't have the document api. So it crashed.
- Use mini-css-extract-plugin to pull the CSS code out of the js file. Avoid using document.creatEelement ("style") in js file