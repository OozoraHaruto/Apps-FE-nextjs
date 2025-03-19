import { apps_portfolio_skills } from "@/lib/urls";

export declare interface PortfolioSkill {
  name: string;
  proficiency: number;
}

export const getSkills = async (): Promise<readonly PortfolioSkill[] | null> => {
  const response = await fetch(apps_portfolio_skills, {
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