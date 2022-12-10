import axios from "axios";
import { BASE_URL } from "../Lib";

export const Axios = axios.create({
  withCredentials: true,   // ogtagorcum enq en depqum erp vor ashxatum enq sesiayi het
  baseURL: BASE_URL,
});