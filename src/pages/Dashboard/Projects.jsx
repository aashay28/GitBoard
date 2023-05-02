import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import Spinner from '../../helpers/Spinner';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { languageOptions, sortDirection } from '../../helpers/Constant';
import DropdownSelect from '../../components/DropdownSelect';
const Projects = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [language, setLanguage] = useState('python');
  const [direction, setDirection] = useState('desc');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.github.com/search/repositories?q=language:${language}+stars:>=100&sort=stars&order=${direction}`
      )
      .then((response) => {
        setRepositories(response.data.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [language, direction]);

  return (
    <DefaultLayout>
      <div className='flex gap-8 mb-4 rounded-sm border border-stroke bg-white py-5 px-5 justify-end'>
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
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                onClick={() => {
                  setFilterLoading(true);
                  setTimeout(() => {
                    setLanguage('python');
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
          {repositories.map((repository) => (
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
