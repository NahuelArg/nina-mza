import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageComponent = ({ imageUrls }) => {
  const images = Array.isArray(imageUrls) ? imageUrls : imageUrls.split(",");

  return (
    <LazyLoadImage
      src={images[0]}
      alt={`Producto image`}
      className="w-64 h-64 object-cover"
    />
  );
};

export default ImageComponent;
