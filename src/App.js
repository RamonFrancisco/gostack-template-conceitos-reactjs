import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      })
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: 'gostack-template-conceitos-reactjs',
      url: 'https://github.com/RamonFrancisco/gostack-template-conceitos-reactjs',
      techs: ['react', 'javascript']
    }

    const response = await api.post('repositories', repository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(repositoryId) {
    await api.delete(`repositories/${repositoryId}`);
    
    const filterRepositories = repositories.filter(repository => repository.id !== repositoryId)

    setRepositories(filterRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
