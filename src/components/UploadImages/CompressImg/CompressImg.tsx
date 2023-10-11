import React, { useEffect } from 'react';
import Compressor from 'compressorjs';

interface CompressImgProps {
  files: File[];
  onCompressed: (compressedFiles: File[]) => void;
}

const CompressImg: React.FC<CompressImgProps> = ({ files, onCompressed }) => {
  useEffect(() => {
    const compressedFiles: File[] = [];

    // Função para lidar com o resultado da compressão
    const handleCompression = (result: File) => {
      compressedFiles.push(result);

      // Verifica se todas as imagens foram comprimidas
      if (compressedFiles.length === files.length) {
        // Todas as imagens foram comprimidas, chama a função de retorno
        onCompressed(compressedFiles);
      }
    };

    // Realiza a compressão para cada arquivo
    files.forEach((file) => {
      new Compressor(file, {
        quality: 0.2, // Configuração de qualidade
        maxWidth: 640, // Largura máxima
        maxHeight: 480, // Altura máxima
        success: handleCompression, // Função a ser chamada após a compressão
        error: (err) => console.error(err.message),
      });
    });
  }, [files, onCompressed]);

  // Este componente não renderiza nada, pois lida com a lógica de compressão em segundo plano
  return null;
};

export default CompressImg;
