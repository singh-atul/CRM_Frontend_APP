
// import { createRoot } from "react-dom/client";
// import ReactDOM from 'react-dom';

// import App from "./App";
// import { Auth0Provider } from '@auth0/auth0-react';
// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// ReactDOM.render(
//   <Auth0Provider
//     domain={domain}
//     clientId={clientId}
//     redirectUri={window.location.origin}>
//     <App />
//   </Auth0Provider>,
//   document.getElementById('root')
// );

import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <App />
);



