import type { IResponseResult } from "./type";
import axios from "axios";

const ERR_OK = 0;

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export function get<T = any>(url: string, params?: any) {
  return axios
    .get<IResponseResult<T>>(url, {
      params,
    })
    .then((res) => {
      const serverData = res.data;
      if (serverData.code === ERR_OK) {
        return serverData.result;
      }
    })
    .catch((e: string) => {
      console.log(e);
    });
}
