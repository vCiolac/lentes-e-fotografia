import { database } from '../services/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const saveUserData = async () => {
  try {
    const docRef = await addDoc(collection(database, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const readUserData = async () => {
  const querySnapshot = await getDocs(collection(database, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
}

export { saveUserData, readUserData };