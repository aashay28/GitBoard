import DefaultLayout from "../../layout/DefaultLayout";
import CardOne from "../../components/CardOne";
import Spinner from "../../helpers/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { languageOptions, sortDirection } from "../../helpers/Constant";
const Projects = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [filterLoading, setFilterLoading] = useState(false)

  const initialState = {
    language: 'python',
    direction: 'desc',
    sortBy: "",
  }
  const [filterData, setFilterData] = useState({ ...initialState });

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(
        `https://api.github.com/search/repositories?q=language:${filterData?.language}+stars:>=100&sort=stars&order=${filterData?.direction}`
      )
      .then((response) => {
        setRepositories(response.data.items);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
  }, [filterData]);

  return (
    <DefaultLayout >
      <div className="flex gap-8 mb-4 rounded-sm border border-stroke bg-white py-5 px-5 justify-end">
        {!filterLoading && <>
          <div>
            <select onChange={(e) => { setFilterData({ ...filterData, direction: e.target.value }) }} className="block py-2.5 px-0 w-50 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              {sortDirection.map((language, index) => {
                return <option key={index} value={language.value}>{language.label}</option>

              })}
            </select>
          </div>
          <div>
            <select onChange={(e) => { setFilterData({ ...filterData, language: e.target.value }) }} className="block py-2.5 px-0 w-50 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              {languageOptions.map((language, index) => {
                return <option key={index} value={language.value}>{language.label}</option>

              })}
            </select>
          </div>
          <div>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                setFilterLoading(true)
                setTimeout(() => {
                  setFilterData({
                    language: 'python',
                    direction: 'desc',
                    sortBy: "",
                  })
                  setFilterLoading(false)
                }, 10)
              }}
            >Clear Filters</button>
          </div></>}
      </div>
      {
        !isLoading ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {repositories.map((repository) => (
            <div key={repository.id}>
              <CardOne repository={repository} />
            </div>
          ))}
        </div> : <Spinner />
      }
    </DefaultLayout >
  );
};

export default Projects;
