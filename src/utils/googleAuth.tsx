import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth, database } from "../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export type Context = {
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export async function HandleGoogleLogin(context: Context) {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    context.setUser(user);

    // Verifique se o usuário já existe na coleção 'users'
    const userDocRef = doc(database, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      // Se o usuário não existe, crie um novo documento com 'admin' definido como 'false'
      await setDoc(userDocRef, {userName: user.displayName});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
