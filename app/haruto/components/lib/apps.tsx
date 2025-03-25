import { cookies } from 'next/headers';

import { WAVariant } from "@/app/components/webawesome";
import { COOKIE_NAME } from '@/lib/auth';
import { apps_home_apps, apps_home_apps_official } from "@/lib/urls";

export declare interface HomeApp {
  name: string;
  image: string;
  links: HomeAppLink[];
  hiddenLinks?: HomeAppLink[];
}

export declare interface HomeAppLink {
  name: string;
  url: string;
  color: WAVariant | "";
}

export const getApps = async (): Promise<readonly HomeApp[] | null> => {
  const jwt = (await cookies()).get(COOKIE_NAME)?.value
  if (!jwt) { // no jwt no need care
    return null;
  }

  const response = await fetch(apps_home_apps, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
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

export const getAppsOfficial = async (): Promise<readonly HomeApp[] | null> => {
  const jwt = (await cookies()).get(COOKIE_NAME)?.value
  if (!jwt) { // no jwt no need care
    return null;
  }

  const response = await fetch(apps_home_apps_official, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
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