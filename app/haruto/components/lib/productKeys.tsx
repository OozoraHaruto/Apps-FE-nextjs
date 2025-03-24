import { cookies } from 'next/headers';

import { COOKIE_NAME } from '@/lib/auth';
import { apps_home_product_keys } from "@/lib/urls";

declare interface HomeProductKey {
  item: string;
  productKey: string;
  platform: string;
}

export const getProductKeys = async (): Promise<readonly [ HomeProductKey[], HomeProductKey[] ] | [ null, null ]> => {
  const jwt = (await cookies()).get(COOKIE_NAME)?.value
  if (!jwt) { // no jwt no need care
    return [ null, null ];
  }

  const response = await fetch(apps_home_product_keys, {
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
    const data: HomeProductKey[] = rsp_json.data
    const windows: HomeProductKey[] = []
    const mac: HomeProductKey[] = []


    data.forEach(keyData => {
      switch (keyData.platform) {
        case "ウインドーズ":
          windows.push(keyData)
        case "マック":
          mac.push(keyData)
      }
    });

    return [ windows, mac ];
  }

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return [ null, null ];
};