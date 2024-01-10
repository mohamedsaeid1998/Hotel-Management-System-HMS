/** @format */

import axios from "axios";

const baseUrl = axios.create({
  baseURL: `http://upskilling-egypt.com:3000`,
});
const requestHeader = {
  Authorization: `${localStorage.getItem("authToken")}`,
};
export { requestHeader };
export default baseUrl;
