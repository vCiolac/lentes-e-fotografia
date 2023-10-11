import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImagesByAlbum } from '../hooks/fetchImagesByAlbum';

function Album() {
  const { albumname } = useParams();
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <div>
      <h1>{albumname}</h1>
      <div>
        <input
          type="text"
          placeholder="Data"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Horário"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </div>
      <ul>
        {images.map((image) => (
          <li key={image.id}>{image.imageName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Album;
