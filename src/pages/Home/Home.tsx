import React from 'react';
import { Link } from 'react-router-dom';
import FetchAlbums from '../../hooks/fetchAlbums';

function Home() {
  const { albums, loading } = FetchAlbums(); 
  
  return (
    <div>
      <h1>Álbuns Disponíveis</h1>
      {loading ? (
        <p>Carregando álbuns...</p>
      ) : (
        <ul>
          {albums.map((albumName) => (
            <li key={albumName}>
              <Link to={`/eventos/${albumName}`}>{albumName}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
