import DefaultLayout from "../../layout/DefaultLayout";
import CardOne from "../../components/CardOne";

import axios from "axios";
import { useEffect, useState } from "react";
const Projects = () => {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.github.com/search/repositories?q=language:python+stars:>=100&sort=stars&order=desc"
      )
      .then((response) => {
        setRepositories(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {repositories.map((repository) => (
          <div key={repository.id}>
            <CardOne repository={repository} />
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Projects;
