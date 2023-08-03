import React, { useState, useEffect } from "react";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  // Similar ao componentDidMount, pois não recebe nenhum parâmetro inicial
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/gabr1elpachec0/repos');
      const data = await response.json();
      setRepositories(data);
    }

    fetchData();
  }, []);

  // Similar ao componentDidUpdate, muda toda vez que o repositories atualiza
  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `Você tem ${filtered.length} favorito(s)`;

  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      // Se repo.id === id retorna repo e favorite. Senão retorna repo
      // Se repo.favorite for true, muda para false e vice-versa. !repo.favorite possui essa lógica
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    });

    setRepositories(newRepositories);
  }

  return (
    <ul>
      { repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}> 
            Favoritar
          </button>
        </li> 
      ))}
    </ul>
  )
}
