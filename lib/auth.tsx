import md5 from 'crypto-js/md5';
import sha3 from 'crypto-js/sha3';
import { jwtVerify } from 'jose';

import { logDebug } from '@/lib/helpers';
import { apps_auth_login, apps_auth_refresh } from "@/lib/urls";
import { getCookie } from './cookies';

const LS_NAME = 'authName';
const LS_ICON = 'authIcon';

const SESS_LAST_CHECK = 'lastCheck';
const CHECK_INTERVAL = 1000 * 60; // 1 min

export const COOKIE_NAME = '_SESSION_JWT';
const COOKIE_EXPIRE = 3 * 24 * 60 * 60 * 1000; // 3 days


export const encryptPassword = (password: string) => {
  const encPass = sha3(md5(password), { outputLength: 384 }).toString();
  logDebug(encPass)
  return encPass
};

export interface AuthData {
  profile: AuthDataProfile
  token: string
}

export interface AuthDataProfile {
  name: string
  icon: string
  allowed?: string[]
}

export interface JWTPayload {
  id: string
  auth: string
  exp: number
  allowed?: string[]
}

export const clearAuthStorage = () => {
  localStorage.removeItem(LS_ICON);
  localStorage.removeItem(LS_NAME);
  sessionStorage.removeItem(SESS_LAST_CHECK);

  document.cookie = COOKIE_NAME + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export const saveAuthResponse = (data: AuthData) => {
  localStorage.setItem(LS_ICON, data.profile.icon);
  localStorage.setItem(LS_NAME, data.profile.name);
  sessionStorage.setItem(SESS_LAST_CHECK, JSON.stringify(Date.now()));

  const d = new Date();
  d.setTime(d.getTime() + COOKIE_EXPIRE);
  const expires = "expires=" + d.toUTCString();
  document.cookie = COOKIE_NAME + "=" + data.token + ";" + expires + ";path=/";
}

// call this function when you want to authenticate the user
export const login = async (username: string, password: string) => {
  if (username === '' || password === '') {
    return false;
  }

  const hash = encryptPassword(password);
  const response = await fetch(apps_auth_login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: hash }),
  });

  const rsp_json = await response.json();
  if (!rsp_json) {
    throw new Error(`Response status: ${response.status}`);
  }

  if (rsp_json.success === true && rsp_json.data) {
    saveAuthResponse(rsp_json.data);
    return true;
  } else if (rsp_json.error && rsp_json.error.code === 7) {
    throw new Error("Invalid username or password");
  }

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return false;
};

export const validateJWT = async (jwt: string): Promise<[ boolean, string[] ]> => {
  if (jwt === '') {
    return [ false, [] ];
  }

  const secret_txt = process.env.AUTH_TOKEN || process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const secret = new TextEncoder().encode(secret_txt)

  try {
    const { payload } = await jwtVerify<JWTPayload>(jwt, secret)
    return [ true, payload.allowed || [] ];
  } catch (e) {
    console.error(e);
    return [ false, [] ];
  }
}

export const getProfileData = async (): Promise<AuthDataProfile | null> => {
  const jwt = getCookie(COOKIE_NAME);
  if (!jwt) { // no jwt no need care
    return null;
  }

  const [ validJWT, allowed ] = await validateJWT(jwt);
  if (!validJWT) {
    clearAuthStorage();
    return null;
  }

  // if this session have gotten before check if it's time to refresh
  const t = sessionStorage.getItem(SESS_LAST_CHECK);
  if (t) {
    const lastCheck = parseInt(t);
    const time_diff = Date.now() - lastCheck;
    console.log("Time diff: ", time_diff);
    if (time_diff > CHECK_INTERVAL) {
      console.log("Refreshing token");
      refreshToken(jwt);
    }

    const data: AuthDataProfile = {
      name: localStorage.getItem(LS_NAME) || '',
      icon: localStorage.getItem(LS_ICON) || '',
      allowed: allowed,
    }
    return (data.name && data.icon) ? data : null;
  }

  console.log("Refreshing token");

  // refresh token
  try {
    const data = await refreshToken(jwt);
    if (!data) {
      clearAuthStorage();
      return null;
    }
    const rsp = await validateJWT(jwt);
    data.allowed = validJWT ? rsp[ 1 ] : allowed;
    return data;
  }
  catch (e) {
    console.error(e);
  }

  return null;
}

export const refreshToken = async (jwt: string): Promise<AuthDataProfile | null> => {
  if (jwt === '') {
    return null;
  }

  const response = await fetch(apps_auth_refresh, {
    method: "POST",
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
    saveAuthResponse(rsp_json.data);
    return rsp_json.data.profile;
  } else if (rsp_json.error && rsp_json.error.code === 7) {
    throw new Error("Invalid username or password");
  }

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return null;
};
