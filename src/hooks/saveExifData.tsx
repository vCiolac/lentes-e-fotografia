import { collection, addDoc } from 'firebase/firestore';
import { database } from '../services/firebase';

const saveExifData = async (tags: number | undefined, imageName: string, aName: string) => {
  try {
    const exifCollection = collection(database, 'exif_data');
    let data = '';
    let horario = '';
    if (tags){
      const timestamp = new Date(tags * 1000);
      const dia = timestamp.getDate(); // Obtém o dia do mês (1-31)
      const mes = timestamp.getMonth() + 1; // Obtém o mês (0-11), adicione 1 para obter o mês real (1-12)
      const ano = timestamp.getFullYear(); // Obtém o ano com quatro dígitos
      const hora = timestamp.getHours(); // Obtém a hora (0-23)
      const minutos = timestamp.getMinutes(); // Obtém os minutos
      const segundos = timestamp.getSeconds(); // Obtém os segundos
      data = `${dia}/${mes}/${ano}`;
      horario = `${hora}:${minutos}:${segundos}`;
    }

    const albumName = `eventos/${aName}/`;
    // Crie um documento no Firestore para armazenar as informações EXIF associadas ao ID da imagem
    const docRef = await addDoc(exifCollection, {
      imageName,
      albumName,
      data,
      horario,
    });

    console.log(`Informações EXIF salvas com sucesso para a imagem com ID ${imageName}`);
    console.log(`Referência do documento: ${docRef.id}`); // Fix for Problem 1
  } catch (error) {
    console.error('Erro ao salvar informações EXIF: ', error);
  }
};

export { saveExifData };
