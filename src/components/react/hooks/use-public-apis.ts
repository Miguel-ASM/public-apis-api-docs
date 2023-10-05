import searchApis from "../../../services/search-apis";
import { useState } from "react";
import type { SearchApisResponse, SearchApisInput } from "../../../types";

const initialStateApiResponse = {
  total_hits: undefined,
  page_size: undefined,
  results: [],
};

export default function usePublicApis(): {
  apiSearchResponse: SearchApisResponse;
  loading: boolean;
  search: ({ query }: SearchApisInput) => Promise<void>;
  paginate: (page: number) => Promise<void>;
  isSearching: boolean;
  isPaginating: boolean;
} {
  const [apiSearchResponse, setApiSearchResponse] =
    useState<SearchApisResponse>(initialStateApiResponse);

  const [query, setQuery] = useState<string | undefined>();
  const [loadingStatus, setLoadingStatus] = useState<
    "loaded" | "loading_pagination" | "loading_search"
  >("loaded");
  const search = async ({ query }: SearchApisInput) => {
    setLoadingStatus("loading_search");
    setQuery(query);
    searchApis({ query })
      .then((data) => {
        setApiSearchResponse(data);
      })
      .finally(() => {
        setLoadingStatus("loaded");
      });
  };
  const paginate = async (page: number) => {
    setLoadingStatus("loading_pagination");
    searchApis({ query, page })
      .then((data) => {
        setApiSearchResponse(data);
      })
      .finally(() => {
        setLoadingStatus("loaded");
      });
  };
  const loading = loadingStatus !== "loaded";
  const isPaginating = loadingStatus === "loading_pagination";
  const isSearching = loadingStatus === "loading_search";
  return {
    apiSearchResponse,
    search,
    paginate,
    loading,
    isPaginating,
    isSearching,
  };
}
