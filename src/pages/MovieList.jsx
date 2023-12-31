import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovieList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/person/popular?language=en-US&page=1',
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('data >>', data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ height: '80vh' }}>
      //data가 없다면 표시할 div
      {data &&
        data.results.map((person, index) => (
          <div key={index}>
            <p>Name: {person.name}</p>
            <img
              src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
              alt={person.name}
            />
          </div>
        ))}
    </div>
  );
}
