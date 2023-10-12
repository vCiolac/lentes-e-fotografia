import { useContext, useState } from 'react';
import CompressImg from '../../hooks/CompressImg/CompressImg';
import uploadMetadados from '../../hooks/CompressImg/processExif';
import uploadImages from '../../hooks/CompressImg/uploadImages';
import FetchAlbums from '../../hooks/fetchAlbums';
import Notification from '../Notification/Notification';
import { Context } from '../../context/Context';
import { sanitizeAlbumName } from '../../hooks/handleAlbumName';
import { Link } from 'react-router-dom';

const UploadImageForm = () => {
  const [filesForCompress, setFilesForCompress] = useState<File[]>([]);
  const [albumName, setAlbumName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
  const { message, showNotification } = useContext(Context);

  const { albums } = FetchAlbums();

  const handleAlbumNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumName(e.target.value);
  };

  const handleCreateAlbum = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCreatingAlbum(!isCreatingAlbum);
    setAlbumName('');
  };

  const handleUseExistingAlbum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setIsCreatingAlbum(false);
    setAlbumName(e.target.value)
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setFilesForCompress(filesArray);
      handleMetadados(filesArray);
    }
  };

  const handleMetadados = async (metadados: File[]) => {
    const name = sanitizeAlbumName(albumName);
    await uploadMetadados(metadados, name);
  }

  const handleCompressedFiles = async (compressedFiles: File[]) => {
    if (isCreatingAlbum && albumName === '') {
      return showNotification('Nome do álbum não pode ser vazio!');
    }
    setIsUploading(true);
    try {
      const name = sanitizeAlbumName(albumName);
      await uploadImages(compressedFiles, name);
      setIsUploading(false);
      showNotification('Imagens enviadas com sucesso!');
      setFilesForCompress([]);

    } catch (error: unknown) {
      setIsUploading(false);
      showNotification(`Erro ao enviar imagens: ${(error as Error).message}`);
      setFilesForCompress([]);

    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <form className="grid mb-6 justify-items-center">
        <h3 className="text-2xl font-semibold mb-4 text-center">Adicionar Arquivos</h3>
        <button
          onClick={handleCreateAlbum}
          className="bg-[#3091A8] hover:bg-[#286474] text-white font-semibold py-1 px-4 rounded-full"
        >
          {isCreatingAlbum ? "Usar evento existente" : "Criar novo evento"}
        </button>
        {isCreatingAlbum ? (
          <label className="block mt-4 text-center">
            Nome do evento:
            <input
              type="text"
              value={albumName}
              placeholder="Escreva aqui"
              onChange={handleAlbumNameChange}
              className="bg-transparent border rounded border-gray-400 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </label>
        ) : (
          <label className="block mt-4">
            <select
              value={albumName}
              onChange={handleUseExistingAlbum}
              className="bg-transparent border rounded border-gray-400 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            >
              <option value="">Selecione um evento existente</option>
              {albums.map((album) => (
                <option key={album} value={album}>
                  {album}
                </option>
              ))}
            </select>
          </label>
        )}
      </form>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="cursor-pointer bg-[#6a4d91] hover:bg-[#402c5a] text-white font-semibold py-2 px-4 rounded-full block w-max mx-auto"
      >
        Selecionar Imagens
      </label>
      <button
        onClick={() => setFilesForCompress([])}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full block w-max mx-auto"
      >
        Limpar seleção
      </button>
      {filesForCompress.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Imagens Selecionadas</h3>
          <ul className="list-disc pl-6">
            {filesForCompress.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to={`/`}>
        <div className="flex justify-center">
          <button className="bg-gray-500 hover:bg-gray-600 text-white mt-4 font-semibold py-2 px-4 rounded-full">
            Voltar para a página inicial
          </button>
        </div>
      </Link>
      {isUploading && (
        <p className="mt-4 font-semibold">Enviando imagens...</p>
      )}
      {message && <Notification message={message} />}
      <CompressImg files={filesForCompress} albumName={albumName} onCompressed={handleCompressedFiles} />
    </div>
  );
};

export default UploadImageForm;
