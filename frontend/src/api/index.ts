import axios from "axios";

function initializeApiService(baseURL: string) {
  const api = axios.create({
    baseURL,
  });

  return api;
}

export const api = initializeApiService("http://localhost:8080/");
