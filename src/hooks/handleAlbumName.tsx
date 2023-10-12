const formatAlbumName = (albumName: string) => {
  const withoutUnderscores = albumName.replace(/_/g, ' ');

  // const words = withoutUnderscores.split(' ');
  // const formattedWords = words.map((word) => {
  //   return word.charAt(0).toUpperCase() + word.slice(1);
  // });
  // const formattedAlbumName = formattedWords.join(' ');

  const formattedAlbumName = withoutUnderscores.toUpperCase();

  return formattedAlbumName;
}

const sanitizeAlbumName = (inputName: string) => {
  return inputName.replace(/[^\w\s]/g, '').replace(/\s+/g, '_');
};

export { formatAlbumName, sanitizeAlbumName };