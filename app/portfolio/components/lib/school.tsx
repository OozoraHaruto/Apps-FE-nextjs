import { apps_portfolio_schools } from "@/lib/urls";

export declare interface PortfolioSchool {
  name: string;
  grade: string;
  logo: string;
  from: string;
  to: string;
}

export const getSchools = async (): Promise<readonly PortfolioSchool[] | null> => {
  const response = await fetch(apps_portfolio_schools, {
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