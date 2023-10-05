import { useState } from "react";
import usePublicApis from "./hooks/use-public-apis";
import { prettyPrintJson } from "pretty-print-json";
import "pretty-print-json/css/pretty-print-json.css";

export default function ApiSearch({ searchExamples = [] }) {
  const { apiSearchResponse, search } = usePublicApis();

  const [submitEnabled, setsubmitEnabled] = useState(false);

  const showResponse = apiSearchResponse.page_size !== undefined;

  const apiResponsePrettyJson = showResponse
    ? prettyPrintJson.toHtml(apiSearchResponse)
    : undefined;

  const submitSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("query");
    if (!query) return;
    await search({ query });
    e.target.reset();
  };

  return (
    <section id="search-api-section" className="flex w-full flex-col">
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
        API endpoint
      </h2>
      <form
        id="apiForm"
        className="mb-4 flex w-full flex-col gap-x-4 gap-y-4 sm:flex-row sm:items-stretch"
        onSubmit={submitSearch}
      >
        <div className="flex w-full grow items-stretch overflow-hidden rounded-lg border-2 border-indigo-600">
          <span className="flex items-center bg-gray-300 px-3 font-semibold">
            GET
          </span>
          <div className="flex flex-col px-3 md:flex-row">
            <span className="inline-flex items-center">/api/search</span>
            <span className="inline-flex items-center">
              <label>
                ?query=
                <input
                  required
                  name="query"
                  className="w-30 border-2 border-indigo-600"
                  type="text"
                />
              </label>
            </span>
            <span className="inline-flex items-center">
              <label>
                &page=
                <input
                  name="page"
                  className="w-10 border-2 border-indigo-600"
                  placeholder="1"
                  defaultValue=""
                  type="text"
                />
              </label>
            </span>
          </div>
        </div>
        <div>
          <button
            className="h-full w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
      <div className="w-full rounded-lg border-2 border-indigo-600 p-3">
        <h3 className="mb-4 text-xl font-bold tracking-tight text-gray-900">
          RESPONSE:
        </h3>
        {showResponse && (
          <pre
            dangerouslySetInnerHTML={{ __html: apiResponsePrettyJson }}
            className="json-container h-96 overflow-scroll"
          ></pre>
        )}
      </div>
    </section>
  );
}
