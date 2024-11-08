import React, { useState, useEffect } from 'react';
import logo from '../../assets/an.png';
import anuncio from '../../assets/anuncioOpti.jpg';
import './ImageCarousel.css'

const ImageCarousel: React.FC = () => {
  
  const images = [anuncio, logo];

  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  
  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000); 
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="p-1">
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        className="carousel-image"
      />
      <div className="carousel-controls">
      </div>
    </div>
  );
};

export default ImageCarousel;
