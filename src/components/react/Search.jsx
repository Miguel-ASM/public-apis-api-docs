import { useState } from "react"

import './Search.css'

export default function Search({ searchExamples = [] }) {
  const [results, setResults] = useState([])

  const doPerformSearch = async (value) => {
    const url = new URL('https://public-apis-api.onrender.com/api/search')
    url.searchParams.append('query', value)
    const response = await fetch(url).then(r => r.json())
    setResults(response?.results || [])
  }

  const submitSearch = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const query = formData.get('query')
    if (!query) return
    await doPerformSearch(formData.get('query'))
    e.target.reset()
  }


  return <section className="w-full flex flex-col results-center">
    <h2
      id="search-section"
      className="text-3xl font-bold tracking-tight text-gray-900 mb-4"
    >
      Search
    </h2>
    <form
      className="w-full flex gap-x-4"
      onSubmit={submitSearch}
    >
      <div className="grow">
        <input
          name="query"
          className="border-indigo-600 border-2 rounded-lg w-full h-10 px-3"
          placeholder="Search what kind of api you need"
          id="search"
          type="text"
        />
        <>
          For example &nbsp;
          {
            searchExamples.map((item, index) => (
              <>
                <a
                  className="text-indigo-600 hover:opacity-60"
                  href={`/?query=${item}`}
                >
                  {item}
                </a>
                {index < searchExamples.length - 1 && <>,&nbsp;</>}
              </>
            ))
          }
        </>
      </div>
      <div>
        <button
          className="h-10 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
    <ul className="pt-12 w-full cards-container">
      {
        results.map((result) => (
          <li>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rounded-lg shadow-lg h-[200px] flex flex-col justify-between bg-indigo-100">
                <div className="px-6 py-4">
                  <h3 className="font-bold text-xl mb-2">{result.name}</h3>
                  <p className="text-gray-700 text-base">{result.description}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {result.category}
                  </span>
                </div>
              </div>
            </a>
          </li>
        ))
      }
    </ul>
  </section>
}




