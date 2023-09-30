import type { SearchApisInput, SearchApisResponse } from "../types";

const searchApis = async ({
  query,
  page = "1",
}: SearchApisInput): Promise<SearchApisResponse> => {
  const url = new URL("https://public-apis-api.onrender.com/api/search");
  url.searchParams.append("query", query);
  url.searchParams.append("page", page);
  return await fetch(url).then((r) => r.json());
};
export default searchApis;
