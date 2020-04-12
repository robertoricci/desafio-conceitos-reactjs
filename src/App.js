import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("repositories", {
        title: `GoStack-${Date.now()}`,
        url: "https://github.com/robertoricci/desafio-conceitos-reactjs",
        techs: "['Node.js', 'React Native', 'ReactJS','Mondo Db']",
      });

      const repository = response.data;

      setRepositories([...repositories, repository]);
    } catch (err) {
      alert("Erro ao adicionar repositório, tente novamente");
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (err) {
      alert("Erro ao deletar repositório, tente novamente");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <h3>{repository.title}</h3>
            <h4>{repository.techs}</h4>
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
