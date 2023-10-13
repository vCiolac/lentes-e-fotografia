import { useContext } from 'react';
import { Link } from 'react-router-dom';
import FetchAlbums from '../../hooks/fetchAlbums';
import Header from '../../components/Header/Header';
import { formatAlbumName } from '../../hooks/handleAlbumName';
import LoadingSpinner from '../../components/Loading/Loading';
import Footer from '../../components/Footer/Footer';
import { Context } from '../../context/Context';

function Home() {
  const { albums, loading } = FetchAlbums();
  const { albumCovers } = useContext(Context);

  return (
    <div className='min-h-screen relative'>
      <Header />
      <div className="container mx-auto">
        {loading ? (
          <LoadingSpinner msg='Carregando...' />
        ) : (
          <div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 justify-items-center mx-10">
              {albums.map((albumName) => (
                <li key={albumName} className="bg-white p-2 rounded shadow w-[22rem] md:w-96 relative group">
                  <div className="relative">
                    <div className="w-full h-60 relative">
                      <img
                        src={albumCovers[albumName]}
                        alt={albumName}
                        className="w-full h-full object-cover rounded shadow group-hover:opacity-50 transition duration-500 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t rounded from-gray-900 via-transparent to-transparent" />
                    </div>
                    <Link to={`/eventos/${albumName}`}>
                      <span className="absolute bottom-0 left-0 right-0 p-2 font-bold text-center text-white group-hover:text-gray-300 font-open-sans">
                        {formatAlbumName(albumName)}
                      </span>
                    </Link>
                  </div>

                </li>
              ))}
            </ul>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
