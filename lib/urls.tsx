export const apps_base_url: string = 'https://api.harutoapps.org/';
// export const apps_base_url: string = 'http://localhost:8000/';

// auth
const apps_auth_base: string = apps_base_url + 'auth/';
export const apps_auth_login: string = apps_auth_base + 'login';
export const apps_auth_register: string = apps_auth_base + 'register';
export const apps_auth_refresh: string = apps_auth_base + 'refresh';
export const apps_auth_profile: string = apps_auth_base + 'profile';

// portfolio
const apps_portfolio_base: string = apps_base_url + 'portfolio/';
export const apps_portfolio_certifications: string = apps_portfolio_base + 'certifications';
export const apps_portfolio_languages: string = apps_portfolio_base + 'languages';
export const apps_portfolio_projects: string = apps_portfolio_base + 'projects';
export const apps_portfolio_schools: string = apps_portfolio_base + 'schools';
export const apps_portfolio_skills: string = apps_portfolio_base + 'skills';
export const apps_portfolio_work: string = apps_portfolio_base + 'work';

// portfolio
const apps_home_base: string = apps_base_url + 'home/';
export const apps_home_apps: string = apps_home_base + 'apps';
export const apps_home_apps_official: string = apps_home_base + 'appsOfficial';
export const apps_home_product_keys: string = apps_home_base + 'productKeys';

// recipea
const apps_recipea: string = apps_base_url + 'recipea/';
export const apps_recipea_recipe: string = apps_recipea + 'recipe';