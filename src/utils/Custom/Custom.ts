/** @format */

import axios from "axios";

const baseUrl = axios.create({
  baseURL: `http://upskilling-egypt.com:3000`,
});
const requestHeaders = `${localStorage.getItem("authToken")}`;

export { requestHeaders };
export default baseUrl;
