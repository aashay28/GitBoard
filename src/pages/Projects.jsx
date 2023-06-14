import { useCallback, useContext, useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import CardOne from '../components/CardOne';
import Spinner from '../helpers/Spinner';
import { languageOptions, sortDirection } from '../helpers/Constant';
import DropdownSelect from '../components/DropdownSelect';
import { fetchApi } from '../helpers/fetchApi';
import ContextRepository from '../context/ContextRepository';
import { useQueryParam, StringParam } from 'use-query-params';
import SearchBar from '../components/SearchBar';

const Projects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [direction, setDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useQueryParam('searchTerm', StringParam);

  const { repositories, setRepositories } = useContext(ContextRepository);

  const getRepoDetails = useCallback(
    async (searchTerm) => {
      setIsLoading(true);
      setRepositories(
        (await fetchApi(`search/repositories?q=${searchTerm}`)).items
      );
      setIsLoading(false);
    },
    [setRepositories]
  );

  useEffect(() => {
    if (searchTerm) {
      getRepoDetails(searchTerm);
    } else {
      setSearchTerm(`language:javascript+stars:<=500&sort=stars&order=desc`);
    }
  }, [getRepoDetails, searchTerm, setSearchTerm]);

  const setSearchTermAndDirection = (direction) => {
    setDirection(direction);
    setSearchTerm(
      `language:${language}+stars:<=500&sort=stars&order=${direction}`
    );
  };

  const setSearchTermAndLanguage = (language) => {
    setLanguage(language);
    setSearchTerm(
      `language:${language}+stars:<=500&sort=stars&order=${direction}`
    );
  };

  return (
    <DefaultLayout>
      <div className='flex gap-8 mb-4 rounded-sm border border-stroke bg-white py-5 px-5 justify-end dark:border-strokedark dark:bg-boxdark'>
        <SearchBar />
      </div>
      <div className='flex gap-8 mb-4 rounded-sm border border-stroke bg-white py-5 px-5 justify-end dark:border-strokedark dark:bg-boxdark'>
        {!filterLoading && (
          <>
            <div>
              <DropdownSelect
                setData={setSearchTermAndDirection}
                data={direction}
                options={sortDirection}
                label={'Direction'}
              />
            </div>
            <div>
              <DropdownSelect
                setData={setSearchTermAndLanguage}
                data={language}
                options={languageOptions}
                label={'Language'}
              />
            </div>
            <div>
              <button
                type='button'
                className='border border-primary p-2 text-center font-medium text-primary focus:ring-1 focus:ring-blue-400 rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 '
                onClick={() => {
                  setFilterLoading(true);
                  setTimeout(() => {
                    setLanguage('javascript');
                    setDirection('desc');
                    setFilterLoading(false);
                  }, 10);
                }}
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
      {!isLoading ? (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
          {repositories?.map((repository) => (
            <div key={repository.id}>
              <CardOne repository={repository} />
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </DefaultLayout>
  );
};

export default Projects;
