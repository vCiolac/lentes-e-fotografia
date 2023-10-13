import { useContext } from 'react';
import FetchAlbums from '../../hooks/fetchAlbums';
import Header from '../../components/Header/Header';
import { formatAlbumName } from '../../hooks/handleAlbumName';
import LoadingSpinner from '../../components/Loading/Loading';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import GoogleIcon from '../../assets/google.svg';

function Home() {
  const { albums, loading } = FetchAlbums();
  const { albumCovers } = useContext(Context);

  return (
    <div>
      <div className='h-full relative'>
        <Header />
      </div>
      <div className="container mx-auto">
        {loading ? (
          <LoadingSpinner msg='Carregando...' />
        ) : (
          <div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 justify-items-center mx-10">
              {albums.map((albumName) => (
                <li key={albumName} className="bg-white p-2 rounded shadow w-full relative group">
                  {/* <li key={albumName} className="bg-white p-2 rounded shadow w-[22rem] md:w-96 relative group"> */}
                  <div className="relative">
                    <div className="w-full h-[16.3rem] relative">
                      {/* <div className="w-full h-60 relative"> */}
                      <img
                        src={albumCovers[albumName]}
                        alt={albumName}
                        className={`w-full h-full object-cover rounded shadow group-hover:opacity-80 transition duration-500 ease-in-out`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t rounded from-gray-900 via-transparent to-transparent" />
                    </div>
                    <Link to={`/eventos/${albumName}`}>
                      <span className="absolute bottom-0 left-0 right-0 p-2 font-bold text-center text-white group-active:text-red-300 font-open-sans">
                        {formatAlbumName(albumName)}
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <footer className={`bg-[#3091A8] h-10 w-full ${loading ? 'absolute' : 'relative'} bottom-0 flex items-center justify-end`}>
        <Link to="/login" className="">
          <img src={GoogleIcon} alt="Google Icon" width="20" className='mr-2' />
        </Link>
      </footer>
    </div>
  );
}

export default Home;
