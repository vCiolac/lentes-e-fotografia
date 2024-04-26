import { useContext, useState } from 'react';
import { HandleGoogleLogin } from '../../utils/googleAuth';
import { Context } from '../../context/Context';
import ImageUploader from '../../components/UploadImages/imageUploader';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '../../services/firebase';

type Favorites = {
  [index: string]: string;
};

function Login() {
  const { user, setUser, showNotification } = useContext(Context);
  const [favorites, setFavorites] = useState<Favorites[]>([]);

  const googleLogin = async () => {
    await HandleGoogleLogin({
      setUser,
    });
  };

  const fetchFavorites = async () => {
    if (!user) {
      showNotification('Você precisa estar logado para ver suas imagens favoritas');
      return;
    }
    try {
      const favoritesRef = collection(database, "favorites");
      const favoritesQuery = query(favoritesRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(favoritesQuery);

      const favorites = querySnapshot.docs.map(doc => doc.data().images);
      setFavorites(favorites);
    } catch (error) {
      console.error(error);
    }
  };

  if (user && user.uid === import.meta.env.VITE_REACT_APP_ADMIN_UID) {
    return (
      <div className="user p-4 border rounded shadow mb-4">
        {user.photoURL && <img src={user.photoURL} alt="Avatar" className="w-12 h-12 rounded-full mx-auto mb-2" />}
        <div className="text-center">
          <strong className="block text-lg font-semibold">{user.displayName}</strong>
          <small className="block">{user.email}</small>
        </div>
        <ImageUploader />
      </div>
    );
  }

  if (user && Object.keys(user).length !== 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="p-4 border rounded shadow mb-4">
          <h1 className="text-2xl font-semibold mb-4 text-center">Bem-vindo(a)</h1>
          <div className="user p-4 border rounded shadow mb-4">
            {user.photoURL && <img src={user.photoURL} alt="Avatar" className="w-12 h-12 rounded-full mx-auto mb-2" />}
            <div className="text-center">
              <strong className="block text-lg font-semibold">{user.displayName}</strong>
              <small className="block">{user.email}</small>
            </div>
            <button
              onClick={fetchFavorites}
              className="uppercase tracking-wide text-gray-700 text-xs font-bold p-2 mt-2 border-gray-400 border-2"
            >
              Verificar imagens favoritas
            </button>
          </div>
          {favorites.length > 0 && (
            <div className="flex flex-wrap justify-center">
              {favorites.map((favorite) => (
                <li key={String(favorite)} className="bg-white p-2 rounded shadow w-full relative group">
                  <div className="relative">
                    <div className="w-full h-80 relative">
                      <img
                        src={String(favorite)}
                        alt={String(favorite)}
                        className={`w-full h-full object-cover rounded shadow group-hover:opacity-80 transition duration-500 ease-in-out hover:scale-105`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t rounded from-gray-900 via-transparent to-transparent" />
                    </div>
                  </div>
                </li>
              ))}
            </div>
          )}
          <Link to={`/`}>
            <div className="flex justify-center m-4">
              <button className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2 border-gray-400 border-2">
                Voltar para a página inicial
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-4 border rounded shadow mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Bem-vindo(a)</h1>
        <button
          onClick={googleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Login com Google
        </button>
        <Link to={`/`}>
          <div className="flex justify-center m-4">
            <button
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2 border-gray-400 border-2">
              Voltar para a página inicial
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
