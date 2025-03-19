import { apps_portfolio_languages } from "@/lib/urls";

export declare interface PortfolioLanguage {
  name: string;
  listen: number;
  speak: number;
  write: number;
}

export const getLanguages = async (): Promise<readonly PortfolioLanguage[] | null> => {
  const response = await fetch(apps_portfolio_languages, {
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