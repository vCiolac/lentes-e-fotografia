import React from 'react';
import { Link } from 'react-router-dom';
import FetchAlbums from '../../hooks/fetchAlbums';
import Header from '../../components/Header/Header';

function Home() {
  const { albums, loading } = FetchAlbums(); 
  
  return (
    <div className='min-h-screen'>
      <Header /> 
      <div className="container mx-auto py-8">
      {loading ? (
        <p>Carregando álbuns...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((albumName) => (
            <li key={albumName} className="bg-white p-4 rounded shadow">
              <img src={`src/assets/EventCard.svg`} alt={albumName} className="w-full rounded shadow" />
              <Link to={`/eventos/${albumName}`}>{albumName}</Link>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default Home;
