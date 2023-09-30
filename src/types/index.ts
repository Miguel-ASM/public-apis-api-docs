export type SearchApisInput = {
  query: string;
  page?: number;
};

export type SearchApisResponse = {
  total_hits: number | undefined;
  page_size: number | undefined;
  results: ApiResult[];
};

export type ApiResult = {
  name: string;
  category: string;
  url: string;
  description: string;
  cors: Cors;
  auth: Auth;
  https: HTTPS;
  score: number;
};

export enum Auth {
  APIKey = "apiKey",
  No = "No",
  OAuth = "OAuth",
  XMashapeKey = "X-Mashape-Key",
  UserAgent = "User-Agent",
}

export enum Cors {
  Unknown = "Unknown",
  Yes = "Yes",
}

export enum HTTPS {
  No = "No",
  Yes = "Yes",
}
