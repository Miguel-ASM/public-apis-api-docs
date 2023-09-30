import searchApis from "../../../services/search-apis";
import { useState } from "react";
import type { SearchApisResponse, SearchApisInput } from "../../../types";

const initialState = {
  total_hits: undefined,
  page_size: undefined,
  results: [],
};

export default function usePublicApis(): {
  apiSearchResponse: SearchApisResponse;
  search: ({ query, page }: SearchApisInput) => Promise<void>;
} {
  const [apiSearchResponse, setApiSearchResponse] =
    useState<SearchApisResponse>(initialState);

  const search = async ({ query, page }: SearchApisInput) => {
    searchApis({ query, page }).then((data) => setApiSearchResponse(data));
  };
  return { apiSearchResponse, search };
}
