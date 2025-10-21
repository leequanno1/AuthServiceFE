import axios from "axios";
import {getAccessTokenFromCookie} from "./cookie-service";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;



export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${ getAccessTokenFromCookie()|| ""}`,
  },
});