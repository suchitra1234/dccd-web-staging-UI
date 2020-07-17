let env;
let backendHost;
//let tokenHost;
//let loginClient;
//let trackingClient;
//const apiVersion = "v1";
//const tokenContext = "/innovel-services/login/api";
//const trackingContext = "";
//env = process.env.REACT_APP_RFT_ENV || "local";

switch (env) {
  case "local":
    backendHost = "http://localhost:3000";
    //tokenHost = "http://localhost:8085";
    //loginClient = "http://localhost:3005";
    //trackingClient = "http://localhost:3000";
    break;
  case "prod":
  case "nonprod":
    backendHost = "";
  //  tokenHost = "";
  //  loginClient = "";
  //  trackingClient = "";
    break;
  default:
    backendHost = "http://localhost:3000";
  //  tokenHost = "http://localhost:8085";
  //  loginClient = "http://localhost:3005";
  //  trackingClient = "http://localhost:3000";
}

export const API_ROOT = backendHost;
//export const TOKEN_ROOT = tokenHost + tokenContext;
//export const LOGIN_ROOT = loginClient;
//export const APP_CONTEXT = "/innovel-services/rft";
//export const TRACKING_ROOT = trackingClient + trackingContext;
