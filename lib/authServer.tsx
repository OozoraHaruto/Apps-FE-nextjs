import { cookies } from 'next/headers'

import { AuthDataProfile, COOKIE_NAME, validateJWT } from './auth'
import { apps_auth_profile } from "./urls";

export const getProfile = async (): Promise<AuthDataProfile | null> => {
  const jwt = (await cookies()).get(COOKIE_NAME)?.value
  if (!jwt) { // no jwt no need care
    return null;
  }

  const validJWT = await validateJWT(jwt);
  if (!validJWT) {
    return null;
  }

  const response = await fetch(apps_auth_profile, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
  });

  const rsp_json = await response.json();
  if (!rsp_json) {
    throw new Error(`Response status: ${response.status}`);
  }

  if (rsp_json.success === true && rsp_json.data) {
    return rsp_json.data;
  }

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return null;
};