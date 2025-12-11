export interface Portfolio {
  name: string;
  about: string;
  links?: Array<PortfolioLinks>;
}

export interface PortfolioLinks {
  url: string;
  details: string;
}
