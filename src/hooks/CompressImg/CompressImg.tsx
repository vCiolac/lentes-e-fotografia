import React, { useContext, useEffect } from 'react';
import Compressor from 'compressorjs';
import { Context } from '../../context/Context';

interface CompressImgProps {
  files: File[];
  albumName: string;
  onCompressed: (compressedFiles: File[]) => void;
}

const CompressImg: React.FC<CompressImgProps> = ({ files, albumName,  onCompressed }) => {
  const { showNotification } = useContext(Context);

  useEffect(() => {
  if (!files.length) return;
  if(albumName === '') return showNotification('Nome do álbum não pode ser vazio!');
    const compressedFiles: File[] = [];

    const handleCompression = (result: File) => {
      compressedFiles.push(result);

      if (compressedFiles.length === files.length) {
        onCompressed(compressedFiles);
      }
    };

    // Realiza a compressão para cada arquivo
    files.forEach((file) => {
      new Compressor(file, {
        quality: 0.3, // Configuração de qualidade
        maxWidth: 640, // Largura máxima
        maxHeight: 480, // Altura máxima
        success: handleCompression, // Função a ser chamada após a compressão
        error: (err) => console.error(err.message),
      });
    });
  }, [files, onCompressed]);

  return null;
};

export default CompressImg;