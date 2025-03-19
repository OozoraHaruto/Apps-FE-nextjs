import { apps_portfolio_certifications } from "@/lib/urls";

export declare interface PortfolioCertification {
  name: string;
  image: string;
  date: string;
}

export const getCerts = async (): Promise<readonly PortfolioCertification[] | null> => {
  const response = await fetch(apps_portfolio_certifications, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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