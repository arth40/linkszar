export interface PortfolioLink {
  title: string;
  url: string;
}

export interface Portfolio {
  about: string;
  links: PortfolioLink[];
}

export interface PublicPortfolio extends Portfolio {
  handle: string;
  name: string;
}
