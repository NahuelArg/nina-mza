import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import ImageComponent from "../Images/ImageComponent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import colorMap from "../../Colors/colorsMap";
import toast from "react-hot-toast";
const ProductCard = ({
  id,
  name,
  images,
  sku,
  price,
  quantity,
  onAddToCart,
  colors,
  isNew,
}) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const validateAndAddToCart = () => {
    if (!selectedColor) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 justify-center items-center pt-0.5 border border-gray-400 p-2 rounded-full">
                🎨
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Por favor!</p>
                <p className="mt-1 text-sm text-gray-500">
                  Selecciona un color para poder agregar al carrito
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      // Lógica de toast
    } else {
      onAddToCart({
        id,
        nombre: name,
        images,
        sku,
        precio: price,
        cantidad: quantity,
        color: selectedColor,
      });
    }
  };

  return (
    <article className="w-full h-full rounded-xl bg-white p-2 shadow-lg hover:shadow-xl md:hover:transform md:hover:scale-105 duration-300 md:mb-6 border border-gray-300">
      <div>
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <Link to={`/product/${id}`}>
            {Array.isArray(images) && images.length > 1 ? (
              <ImageComponent imageUrls={images} />
            ) : (
              <LazyLoadImage
                src={images}
                alt={name}
                className="w-64 h-64 object-cover"
              />
            )}
          </Link>
          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-2 text-sm text-slate-400">4.9</span>
          </div>
        </div>
      </div>
      {isNew && (
        <div className="absolute md:top-5 md:right-5 top-3 right-10">
          <div className="relative">
            <div className="transform flex justify-center items-center md:rotate-45 rounded-t-md md:rounded-t-3xl rounded-b-sm translate-x-1/2 -translate-y-1/2 w-20 bg-red-500 text-white text-center text-xs font-bold px-6 py-1 shadow-lg">
              Nuevo
            </div>
          </div>
        </div>
      )}
      <div className="mt-1 p-2 flex flex-col justify-center items-center">
        <h2 className="text-slate-700">{name}</h2>
        <p className="mt-1 text-sm text-slate-400">{sku}</p>
        <div className="mt-3 flex space-x-2">
          {colors?.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorSelection(color)}
              style={{
                backgroundColor: colorMap[color.toLowerCase()] || "#CCCCCC",
              }}
              className={`w-6 h-6 rounded-full border border-gray-300 ${
                selectedColor === color ? "ring-2 ring-primary" : ""
              }`}
              aria-label={`Seleccionar color ${color}`}
            />
          ))}
        </div>

        <div className="mt-2 flex items-center justify-center">
          <p className="text-lg font-bold text-secondary">${price}</p>
        </div>
      </div>
      <div
        onClick={validateAndAddToCart}
        className={`flex justify-center items-center mt-4 ${
          quantity === 0
            ? "cursor-not-allowed text-red-400 border border-red-400 p-2 rounded-md"
            : "shadow-md active:translate-y-[2px] cursor-pointer rounded-lg border border-gray-300 p-2"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`h-4 w-4 ${quantity === 0 ? "text-red-400" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <button
          className={`text-sm text-slate-700 ${
            quantity === 0 ? "cursor-not-allowed text-red-400" : ""
          }`}
        >
          {quantity === 0 ? "No stock" : "Agregar"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
