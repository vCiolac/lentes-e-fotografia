import React, { useEffect } from 'react';
import Compressor from 'compressorjs';

interface CompressImgProps {
  files: File[];
  onCompressed: (compressedFiles: File[]) => void;
}

const CompressImg: React.FC<CompressImgProps> = ({ files, onCompressed }) => {

  useEffect(() => {
  if (!files.length) return;
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
        quality: 1, // Configuração de qualidade
        maxWidth: 1024, // Largura máxima
        maxHeight: 768, // Altura máxima
        success: handleCompression, // Função a ser chamada após a compressão
        error: (err) => console.error(err.message),
      });
    });
  }, [files, onCompressed]);

  return null;
};

export default CompressImg;