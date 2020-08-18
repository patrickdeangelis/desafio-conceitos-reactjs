import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(({ data }) => setRepositories(data));
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("/repositories", {
        title: `Desafio ${Date.now()}`,
        url: "http://gitlab.com/",
        techs: ["Node.js", "React"],
      });

      const repository = response.data;

      setRepositories([...repositories, repository]);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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
