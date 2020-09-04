import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {setRepositories(response.data)});
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      "url": "teste.com",
      "title": `Novo Projeto ${Date.now()}`,
      "techs": "react, node"
    })

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repositorie => repositorie.id !== id));
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repositorie =>
        (<li key={repositorie.id}>
          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>)
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
