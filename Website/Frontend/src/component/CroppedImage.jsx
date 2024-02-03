import React, { useState, useEffect } from 'react';

const CroppedImage = ({ url, startCoordinates, endCoordinates, Id_screen }) => {
  const [imageDimensions, setImageDimensions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadImageDimensions = () => {
      const image = new Image();
      image.src = url;

      image.onload = () => {
        setImageDimensions({ x: image.width, y: image.height });
      };
    };

    loadImageDimensions();
  }, [url]);


  const RatisReel = {x : 1280, y : 720}
  const RatioSite = {x : 200, y : 100}
  const sizeDownRatio = {x : RatioSite.x/(endCoordinates.x - startCoordinates.x), y : RatioSite.y/(endCoordinates.y - startCoordinates.y)}
  const cropStyles = {
    marginLeft: `${(imageDimensions.x*sizeDownRatio.x - RatioSite.x) - startCoordinates.x*(sizeDownRatio.x*2)}px`,
    marginTop: `${(imageDimensions.y*sizeDownRatio.y - RatioSite.y) - startCoordinates.y*(sizeDownRatio.y*2)}px`,
    zIndex: `${Id_screen}`,
  };
  return (
        <img
          height={`${imageDimensions.y*sizeDownRatio.y}`}
          width={`${imageDimensions.x*sizeDownRatio.x}`}
          className="image-background"
          src={url}
          alt={`Screen Image`}
          style={cropStyles}
        />
  );
};

export default CroppedImage;
