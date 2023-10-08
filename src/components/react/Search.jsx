import { useState } from "react";
import usePublicApis from "./hooks/use-public-apis";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

import "./Search.css";

export default function Search({ searchExamples = [] }) {
  const { t } = useTranslation();
  const [submitEnabled, setsubmitEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiSearchResponse, search, paginate, isSearching, isPaginating } =
    usePublicApis();
  const { results, page_size, total_hits } = apiSearchResponse;

  const pageCount =
    total_hits !== undefined ? Math.ceil(total_hits / page_size) : 0;

  const submitSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("query");
    if (!query) return;
    await search({ query });
    setCurrentPage(1);
    e.target.reset();
  };

  const onSearchInputChange = (e) => {
    setsubmitEnabled(!!e.target.value);
  };

  const onPageChange = ({ selected }) => {
    paginate(selected + 1);
    setCurrentPage(selected + 1);
  };

  return (
    <section id="search-section" className="flex w-full flex-col">
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
        {t("search.h2")}
      </h2>
      <form
        className="flex w-full flex-col gap-x-4 gap-y-4 sm:flex-row"
        onSubmit={submitSearch}
      >
        <div className="grow">
          <input
            onChange={onSearchInputChange}
            formNoValidate
            title={t("search.search_input_title")}
            name="query"
            className="h-10 w-full rounded-lg border-2 border-indigo-600 px-3"
            placeholder={t("search.search_input_placeholder")}
            id="search"
            type="text"
          />
        </div>

        <div>
          <button
            disabled={!submitEnabled}
            className="h-10 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
            type="submit"
          >
            {t("search.search_submit_button")}
          </button>
        </div>
      </form>
      <div className="relative">
        {isPaginating && (
          <div className="absolute flex h-full w-full items-center justify-center bg-gray-100 opacity-50">
            <div className="h-[100px] w-[100px] animate-spin rounded-full border-[10px] border-indigo-100 border-t-indigo-500" />
          </div>
        )}
        <ul className="cards-container w-full pb-6 pt-12">
          {results.map((result) => (
            <li>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                <div className="flex h-[200px] flex-col justify-between rounded-lg bg-indigo-100 shadow-lg">
                  <div className="px-6 py-4">
                    <h3 className="mb-2 text-xl font-bold">{result.name}</h3>
                    <p className="text-base text-gray-700">
                      {result.description}
                    </p>
                  </div>
                  <div className="px-6 pb-2 pt-4">
                    <span className="mb-2 mr-2  inline-block rounded-full bg-white px-3 py-1 text-sm font-semibold">
                      {result.category}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {!isSearching && (
        <ReactPaginate
          containerClassName="w-full flex items-center justify-center px-20 gap-x-20"
          pageLinkClassName="p-1 h-8 min-w-[2rem] flex item-center justify-center rounded-full"
          activeLinkClassName="bg-indigo-500 text-white"
          forcePage={currentPage - 1}
          onPageChange={onPageChange}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          breakLabel="..."
          nextLabel=">"
          renderOnZeroPageCount={null}
        />
      )}
    </section>
  );
}
