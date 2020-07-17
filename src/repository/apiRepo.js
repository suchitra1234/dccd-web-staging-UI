import axios from "axios";
import { API_ROOT } from "../config/api-config";
//import { APP_CONTEXT } from "../config/api-config";
//import { LOGIN_ROOT, TOKEN_ROOT } from "../config/api-config";

const PREFIX_LOGIN = "Bearer ";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
/*axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // uses windows localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("access_tabs");
        window.location.href = LOGIN_ROOT + "/login";
      } else if (error.response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("access_tabs");
        window.location.href = APP_CONTEXT + "/unauth";
      }
    }
    return Promise.reject(error);
  }
);*/

class ApiRepo {
  serviceCall = (httpMethod, path, inputParams, header) => {
    let url = "";
    if (
      path === "/oauth/token" ||
      path === "/oauth/revoke-token" ||
      path === "/v1/init?filter=rft"
    ) {
//      url = TOKEN_ROOT + path;
    } else {
      url = API_ROOT + path;
    }

    // setting access token
    let headerToSet;
    if (header === undefined) {
      if (localStorage.getItem("token") !== null) {
        headerToSet = {
          headers: {
            Authorization: PREFIX_LOGIN + localStorage.getItem("token"),
          },
        };
      }
    } else {
      if (localStorage.getItem("token") !== null) {
        headerToSet = {
          headers: {
            ...header,
            Authorization: PREFIX_LOGIN + localStorage.getItem("token"),
          },
        };
      } else {
        headerToSet = { headers: header };
      }
    }

    switch (httpMethod) {
      case "get":
        return axios.get(url, headerToSet);
      case "post":
        return axios.post(url, inputParams, headerToSet);
      case "put":
        return axios.put(url, inputParams, headerToSet);
      case "delete":
        return axios.delete(url, headerToSet);
      default:
        // eslint-disable-next-line no-throw-literal
        throw "Unsupported http method";
    }
  };
}

export let apiRepo = new ApiRepo();
