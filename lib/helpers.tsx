import { isDebug } from "./constants";

export const getSearchParams = (key: string) => {
  const params = new URLSearchParams(document.location.search);
  return params.get(key);
}

/**
 * WARN: only used for debugging suspense pages
 * @param ms {number} used to sleep the in milliseconds
 * @returns Promise
 */
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const logDebug = (message?: any, ...optionalParams: any[]) => {
  if (isDebug) {
    console.log(message, ...optionalParams)
  }
}