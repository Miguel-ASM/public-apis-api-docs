import { useState } from "react";
import searchApis from "../../services/search-apis";

import "./Search.css";

export default function Search({ searchExamples = [] }) {
  const [results, setResults] = useState([]);
  const [submitEnabled, setsubmitEnabled] = useState(false);

  const doPerformSearch = (value) => {
    searchApis({ query: value }).then(({ results }) => {
      setResults(results || []);
    });
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("query");
    if (!query) return;
    await doPerformSearch(formData.get("query"));
    e.target.reset();
  };

  const onSearchInputChange = (e) => {
    setsubmitEnabled(!!e.target.value);
  };

  return (
    <section className="results-center flex w-full flex-col">
      <h2
        id="search-section"
        className="mb-4 text-3xl font-bold tracking-tight text-gray-900"
      >
        Search
      </h2>
      <form
        className="flex w-full flex-col gap-x-4 gap-y-4 sm:flex-row"
        onSubmit={submitSearch}
      >
        <div className="grow">
          <input
            onChange={onSearchInputChange}
            formNoValidate
            title="search"
            name="query"
            className="h-10 w-full rounded-lg border-2 border-indigo-600 px-3"
            placeholder="Search what kind of api you need"
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
            Search
          </button>
        </div>
      </form>
      <ul className="cards-container w-full pt-12">
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
    </section>
  );
}
