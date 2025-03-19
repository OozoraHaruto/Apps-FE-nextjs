"use server"

import { unstable_cache } from 'next/cache';

import { apps_portfolio_projects } from "@/lib/urls";

export declare interface PortfolioProjects {
  name: string;
  description: string;
  image: string;
  lastUpdate: string;
  languages: string[];
  links: PortfolioProjectsLink[];
}

export declare interface PortfolioProjectsLink {
  name: string;
  url: string;
}

export const getProjects = async (): Promise<readonly PortfolioProjects[] | null> => {
  const response = await fetch(apps_portfolio_projects, {
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

export const getProjectsWithCache = unstable_cache(
  async () => {
    return await getProjects()
  },
  [ 'portfolio_projects' ],
  { revalidate: 3600, tags: [ 'portfolio_projects' ] }
)