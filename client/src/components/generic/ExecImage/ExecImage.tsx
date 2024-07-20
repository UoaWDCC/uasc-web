import React, { useState } from 'react';
import Image from 'next/image';
import './ExecImage.css';

export interface ExecImageProps {
  src: string;
  alt: string;
  title: string;
  name: string;
}

const ExecImage: React.FC<ExecImageProps> = ({ src, alt, title, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`exec-image-container ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Image src={src} alt={alt} width={163} height={163} className="exec-image" />
      {isHovered && (
        <div className="exec-image-overlay">
          <p className="exec-image-title">{title}</p>
          <p className="exec-image-name">{name}</p>
        </div>
      )}
    </div>
  );
};

export default ExecImage;