import axios from "axios";

export function getGoogleSheet(url) {
  return axios.get(url);
}
