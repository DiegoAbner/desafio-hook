import React, { useState, useEffect } from 'react';
import Button from './components/Button/Button';

const FetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Button onClick={fetchData}>Fetch Characters</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="character-list">
        {data && data.map((character) => (
          <div key={character.id} className="character">
            <h3>{character.name}</h3>
            <img src={character.image} alt={character.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchData;