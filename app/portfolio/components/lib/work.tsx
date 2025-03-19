import { apps_portfolio_work } from "@/lib/urls";

export declare interface PortfolioWork {
  company: string;
  title: string;
  summary: string;
  details: { [ id: string ]: string[] };
  logo: string;
  scope: string[];
  programming: string[];
  from: string;
  to: string;
}

export const getWork = async (): Promise<readonly PortfolioWork[] | null> => {
  const response = await fetch(apps_portfolio_work, {
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