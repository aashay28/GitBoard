import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import Spinner from '../../helpers/Spinner';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Projects = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.github.com/search/repositories?q=language:${language}+stars:>=100&sort=stars&order=desc`
      )
      .then((response) => {
        setRepositories(response.data.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [language]);

  return (
    <DefaultLayout setLanguage={setLanguage} language={language}>
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
