import DefaultLayout from '../layout/DefaultLayout';
import CardOne from '../components/CardOne';
import Spinner from '../helpers/Spinner';
import { useContext, useEffect, useState } from 'react';
import { languageOptions, sortDirection } from '../helpers/Constant';
import DropdownSelect from '../components/DropdownSelect';
import { fetchApi } from '../helpers/fetchApi';
import ContextRepositery from '../context/ContextRepositery';
const Projects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [direction, setDirection] = useState('desc');

  const { repositories, setRepositories } = useContext(ContextRepositery);
  const getRepoDetails = async () => {
    setRepositories(
      (
        await fetchApi(
          `search/repositories?q=language:${language}+stars:<=500&sort=stars&order=${direction}`
        )
      ).items
    );
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    getRepoDetails();
  }, [language, direction]);

  return (
    <DefaultLayout>
      <div className='flex gap-8 mb-4 rounded-sm border border-stroke bg-white py-5 px-5 justify-end dark:border-strokedark dark:bg-boxdark'>
        {!filterLoading && (
          <>
            <div>
              <DropdownSelect
                setData={setDirection}
                data={direction}
                options={sortDirection}
                label={'Direction'}
              />
            </div>
            <div>
              <DropdownSelect
                setData={setLanguage}
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
