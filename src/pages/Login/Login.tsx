import React, { Fragment, useContext, useEffect, useState } from 'react';
import { HandleGoogleLogin } from '../../utils/googleAuth';
import { Context } from '../../context/Context';
import ImageUploader from '../../components/UploadImages/imageUploader';
import { database } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

function Login() {
  const { user, setUser } = useContext(Context);
  const [canEdit, setEditor] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user && user.uid) {
        const userDocRef = doc(database, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setEditor(userData.admin || false);
        }
      }
    };

    checkAdminStatus();
  }, [user]);

  const googleLogin = async () => {
    await HandleGoogleLogin({
      setUser,
    });
  };


  return (
    <Fragment>
      {user &&
        <Fragment>
          <div className='user'>
            {user.photoURL && <img src={user.photoURL} alt="Avatar" />}
            <strong>{user.displayName}</strong>
            <small>{user.email}</small>
            {canEdit &&
              <Fragment>
                {canEdit && <ImageUploader />}
              </Fragment>
            }
          </div>
        </Fragment>
      }
      <div>
        <h1>Login</h1>
        <button onClick={googleLogin}>Login</button>
      </div>
    </Fragment>
  );
}

export default Login;
