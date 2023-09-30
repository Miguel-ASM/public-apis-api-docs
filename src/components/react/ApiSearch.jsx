import { useState } from "react";
import usePublicApis from "./hooks/use-public-apis";
import { prettyPrintJson } from "pretty-print-json";

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
    <section className="flex w-full flex-col items-center">
      <h2
        id="search-api-section"
        className="mb-4 text-3xl font-bold tracking-tight text-gray-900"
      >
        API endpoint
      </h2>
      <form
        id="apiForm"
        className="mb-4 flex w-full gap-x-4"
        onSubmit={submitSearch}
      >
        <div className="flex h-10 w-full grow items-center overflow-hidden rounded-lg border-2 border-indigo-600 pl-0">
          <div className="flex h-full items-center bg-gray-300 pl-3">
            <span className="font-semibold">GET</span>
            &nbsp; &nbsp;
          </div>
          <div className="flex h-full items-center pl-3">
            <span>/api/search?query=</span>
          </div>
          <input
            required
            name="query"
            className="w-30 border-2 border-indigo-600"
            type="text"
          />
          <div className="flex h-full items-center">
            <span>&page=</span>
          </div>
          <input
            name="page"
            className="w-10 border-2 border-indigo-600"
            placeholder="1"
            defaultValue=""
            type="text"
          />
        </div>
        <div>
          <button
            className="h-10 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
            className="json-container max-h-screen overflow-scroll"
          ></pre>
        )}
      </div>
    </section>
  );
}
