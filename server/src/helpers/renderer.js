import React from 'react';
import { renderToString } from 'react-dom/server';
import Routes from '../client/routes';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

export default (req, store) => {
    console.log(session, 'session');
    const session = {
        "remoteJs": {
            "nav": "http://localhost:3002",
            "home": "http://localhost:3003",
            "about": "http://localhost:3005"
        }
    };
    
    // this is generated html
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter context={{}} location={req.path}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );
    // const content = renderToString(
    //     <div>loading...</div>
    // );
    // //  window.INITIAL_STATE = ${serialize(store.getState())}
    // // <script src="http://localhost:5000/remoteEntry.js"></script>
   console.log(serialize(session), 'se')
    const html = `
        <html>
           <head>
               <link rel="stylesheet" type="text/css" href="styles.css" />
               <base href="/">
           </head>
           <body>
                <script>
                    window.INITIAL_STATE = ${serialize(session)}
                </script>
                <div id="root">
                   ${content}
                </div>
                <script src="bundle.js"></script>
                <script src="http://localhost:3002/remoteEntry.js"></script>
                <script src="http://localhost:3003/remoteEntry.js"></script>
                <script src="http://localhost:3005/remoteEntry.js"></script>
                <script src="http://localhost:3001/bundle.js"></script>
           </body>
        </html>
    `;

    return html;
}