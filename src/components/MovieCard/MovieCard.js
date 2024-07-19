import React, { useState, useEffect } from 'react';
import './MovieCard.css';
import Loader from '../Loader/Loader.js';

const MovieCard = ({ movie }) => {
  const [dogImage, setDogImage] = useState('');
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchDogImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
      setImageLoading(false);
    };
    fetchDogImage();
  }, []);

  return (
    <div className="card">
      {imageLoading ? (
        <Loader />
      ) : (
        <img src={dogImage} alt="Dog" />
      )}
      <h2>{movie.title}</h2>
      <p>{movie.author ? `Author: ${movie.author}` : 'Author: Unknown'}</p>
      <p>{movie.publicationDate ? `Published: ${movie.publicationDate}` : 'Published: Unknown'}</p>
    </div>
  );
};

export default MovieCard;
