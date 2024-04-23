import  { useContext } from 'react';
import { HandleGoogleLogin } from '../../utils/googleAuth';
import { Context } from '../../context/Context';
import ImageUploader from '../../components/UploadImages/imageUploader';

function Login() {
  const { user, setUser } = useContext(Context);

  const googleLogin = async () => {
    await HandleGoogleLogin({
      setUser,
    });
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

  if (user && !user.uid === import.meta.env.VITE_REACT_APP_ADMIN_UID) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="p-4 border rounded shadow mb-4">
          <h1 className="text-2xl font-semibold mb-4 text-center">Você não tem permissão para acessar esta página</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-4 border rounded shadow mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <button
          onClick={googleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Login com Google
        </button>
      </div>
    </div>
  );
}

export default Login;
