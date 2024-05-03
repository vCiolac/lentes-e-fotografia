import { useContext, useState } from 'react';
import uploadMetadados from '../../hooks/CompressImg/processExif';
import uploadImages from '../../hooks/CompressImg/uploadImages';
import FetchAlbums from '../../hooks/fetchAlbums';
import Notification from '../Notification/Notification';
import { Context } from '../../context/Context';
import { sanitizeAlbumName } from '../../hooks/handleAlbumName';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../Loading/Loading';
import CompressImg from '../../hooks/CompressImg/CompressImg';

const UploadImageForm = () => {
  const [filesForUpload, setFilesForUpload] = useState<File[]>([]);
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
    setAlbumName(e.target.value)
    setIsCreatingAlbum(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setFilesForUpload(filesArray);
    }
  };

  const handleButtonUpload = async () => {
    if (filesForUpload.length === 0) {
      return showNotification('Nenhuma imagem selecionada!');
    }
    if (albumName === '') {
      return showNotification('Nome do evento não pode ser vazio!');
    }
    if (isCreatingAlbum && albumName.length < 1) {
      return showNotification('Escolha um evento disponível!');
    }
    setIsUploading(true);
    handleMetadados(filesForUpload);
    handleStartUpload(filesForUpload);
  };

  const handleMetadados = async (metadados: File[]) => {
    const name = sanitizeAlbumName(albumName);
    await uploadMetadados(metadados, name);
  }

  const handleStartUpload = async (files: File[]) => {
    try {
      setFilesForCompress(files);
      setFilesForUpload([]);
    } catch (error: unknown) {
      showNotification(`Erro: ${(error as Error).message}`);
      setFilesForCompress([]);
      setFilesForUpload([]);
    }
  };

  const handleCompressedFiles = async (compressedFiles: File[]) => {
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

  const clearAll = () => {
    setAlbumName('');
    setFilesForCompress([]);
    setFilesForUpload([]);
  }

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <form className="grid mb-6 justify-items-center">
        <h3 className="text-2xl font-semibold mb-4 text-center tracking-wide border-gray-400 border-b-2">Adicionar imagens e albuns</h3>
        <button
          onClick={handleCreateAlbum}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2 border-gray-400 border-2">
          {isCreatingAlbum ? "Usar album existente" : "Criar novo album"}
        </button>
        {isCreatingAlbum ? (
          <label className="block mt-4 text-center">
            Nome do album:
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
              <option value="">Selecione um album existente</option>
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
      <div className="flex justify-center">
        <label
          htmlFor="file-input"
          className="block uppercase tracking-wide text-gray-700  bg-sky-500 hover:bg-sky-600 text-xs font-bold mb-2 p-2 border-gray-400 border-2">
          Selecionar Imagens
        </label>
      </div>
      {filesForUpload.length > 0 && (
        <div className="flex justify-center">
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Imagens Selecionadas</h3>
            <ul className="list-disc pl-6">
              {filesForUpload.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <button onClick={handleButtonUpload} className="block uppercase tracking-wide text-gray-700 bg-green-500 hover:bg-green-600 text-xs font-bold mb-2 p-2 border-gray-400 border-2">
          Enviar Imagens
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={clearAll}
          className="block uppercase tracking-wide text-gray-700 bg-red-500 hover:bg-red-600 text-xs font-bold mb-2 p-2 border-gray-400 border-2">
          Limpar
        </button>
      </div>
      <Link to={`/`}>
        <div className="flex justify-center">
          <button
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2 border-gray-400 border-2">
            Voltar para a página inicial
          </button>
        </div>
      </Link>
      {isUploading && (
        <LoadingSpinner msg='Enviando imagens para o servidor...' />
      )}
      {message && <Notification message={message} />}
      <CompressImg files={filesForCompress} onCompressed={handleCompressedFiles} />
    </div>
  );
};

export default UploadImageForm;
