import { useState, useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import Compressor from "compressorjs";
import Spinner from "../Spinner/Spinner";
import validationProductForm from "./validationProductForm";
import toast from "react-hot-toast";
import axios from "axios";
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
import {
  addSheetRow,
  clearImages,
  updateRow,
  uploadImages,
} from "../../../redux/actions/productActions";

export default function TabFormCreateProduct({ isOpen, onClose, product }) {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    tamaño: "",
    stock: "",
    color: "",
    precio: 0,
    images: [],
  });
  const [errors, setErrors] = useState({});
  const img = useSelector((state) => state.sheets.images);
  const memoizedErrors = useMemo(() => {
    return validationProductForm(formData);
  }, [formData]);

  useEffect(() => {
    setErrors(memoizedErrors);
  }, [memoizedErrors]);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        categoria: product.categoria || "",
        nombre: product.nombre || "",
        color: product.color || "",
        tamaño: product.talle || "",
        stock: product.stock || 0,
        precio: product.precio || "",
        images: Array.isArray(product.images)
          ? product.images
          : product.images
          ? product.images.split(",").map((image) => image.trim())
          : [],
      });
    }
  }, [product]);

  useEffect(() => {
    if (img && img.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...img.map((image) => image[0])],
      }));
      dispatch(clearImages());
    }
  }, [img, dispatch]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(memoizedErrors).length === 0) {
      try {
        console.log("formData.images:", formData.images);
        const imagesArray = Array.isArray(formData.images)
        ? formData.images : [formData.images];
        const newRow = {
          categoria: formData.categoria,
          nombre: formData.nombre,
          color: formData.color,
          tamaño: formData.tamaño,
          stock: formData.stock,
          precio: formData.precio,
          images: imagesArray,
        };

        console.log("Datos enviados:", newRow);

        if (product) {
          const updatedRows = {
            id: formData.id,
            categoria: formData.categoria,
            nombre: formData.nombre,
            color: formData.color,
            tamaño: formData.tamaño,
            stock: formData.stock,
            precio: formData.precio,
            images: imagesArray.join(", "),
          };

          dispatch(updateRow(updatedRows));
        } else {
          dispatch(addSheetRow(newRow));
        }
        setFormData({
          nombre: "",
          categoria: "",
          tamaño: "",
          stock: "",
          color: "",
          precio: 0,
          images: [],
        });
        onClose();
      } catch (error) {
        toast.error("Error al crear el nuevo producto");
      }
    }
  };

  const handleImageUpload = async (event) => {
    setIsUploading(true);

    const file = event.target.files[0];

    if (!file) {
      setIsUploading(false);
      return;
    }

    try {
      const compressedFile = await new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.7,
          convertSize: 2000000,
          success: resolve,
          error: reject,
          mimeType: "image/webp",
        });
      });

      const formDataImage = new FormData();
      formDataImage.append("file", compressedFile);
      formDataImage.append("api_key", CLOUDINARY_API_KEY);
      formDataImage.append("upload_preset", "NinaMza");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formDataImage,
        }
      );

      const result = await response.json();
      console.log("URL de la imagen subida:", result.secure_url);

      if (result.secure_url) {
        setFormData((prevData) => ({
          ...prevData,
          images: [...(prevData.images || []), result.secure_url],
        }));
        toast.success("Imagen subida exitosamente");
      } else {
        console.error("Error al subir la imagen:", result.error?.message);
        toast.error("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageUploadInput").click();
  };

  const handleImageDelete = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index), // Cambiado de "url" a "images"
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        className="bg-white h-auto text-center shadow-md p-6 rounded-xl md:w-1/2 lg:w-auto m-2 flex flex-col"
        onSubmit={handleSubmit}
      >
        <button
          onClick={onClose}
          className="text-gray-400 flex text-3xl hover:text-gray-500"
        >
          &times;
        </button>
        <div className="flex justify-center items-center">
          <div className="rounded-sm w-full py-2 px-4">
            <div className="mb-2 flex justify-center items-center gap-1">
              <div className="mt-4 cursor-pointer flex">
                {isUploading && <Spinner />}

                {formData?.images?.length > 0 &&
                  formData?.images?.map((url, index) => (
                    <div
                      key={index}
                      className="relative mr-[5px] flex shadow-md rounded-full p-2 w-24 h-24 justify-center items-center border border-gray-800"
                    >
                      <img
                        src={url}
                        alt={`uploaded-${index}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(index)}
                        className="absolute bottom-0 right-0 flex justify-center items-center bg-red-500 text-white rounded-full p-1 w-6 h-6"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
              </div>

              <div
                className="border cursor-pointer shadow-lg rounded-md p-4 flex justify-center items-center flex-col gap-2 hover:shadow-sm hover:border-blue-400 hover:text-blue-400"
                onClick={handleImageClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                <span>Cargar imagen</span>
                <input
                  type="file"
                  id="imageUploadInput"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="nombre">Nombre</label>
          <input
            className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
              errors.nombre ? "border-red-500" : "border-gray-400"
            }`}
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs">{errors.nombre}</p>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
              errors.categoria ? "border-red-500" : "border-gray-400"
            }`}
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            <option value="Abrigos"> Abrigos </option>
            <option value="Pantalones">Pantalones</option>
            <option value="Tops">Tops</option>
            <option value="Bodys">Bodys</option>
            <option value="Sweaters">Sweaters </option>
            <option value="Vestidos">Vestidos</option>
            <option value="Catsuits">Catsuits</option>
            <option value="Faldas">Faldas-shorts</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Calzados">Calzados</option>
            <option value="Vapers">Vapers</option>
            <option value="Perfumes">Perfumes</option>
            <option value="Bikinis">Bikinis</option>
          </select>
          {errors.categoria && (
            <p className="text-red-500 text-xs">{errors.categoria}</p>
          )}
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="mt-2 w-1/2">
            <label htmlFor="tamaño">Tamaño</label>
            <input
              className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
                errors.tamaño ? "border-red-500" : "border-gray-400"
              }`}
              type="text"
              id="tamaño"
              name="tamaño"
              value={formData.tamaño}
              onChange={handleChange}
              placeholder="Tamaño"
            />
            {errors.tamaño && (
              <p className="text-red-500 text-xs">{errors.tamaño}</p>
            )}
          </div>
          <div className="mt-2 w-1/2">
            <label htmlFor="stock">stock</label>
            <input
              className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
                errors.stock ? "border-red-500" : "border-gray-400"
              }`}
              type="text"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="stock"
            />
            {errors.stock && (
              <p className="text-red-500 text-xs">{errors.stock}</p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="mt-2 w-1/2">
            <label htmlFor="color">Color</label>
            <input
              className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
                errors.color ? "border-red-500" : "border-gray-400"
              }`}
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Color"
            />
            {errors.color && (
              <p className="text-red-500 text-xs">{errors.color}</p>
            )}
          </div>
          <div className="mt-2 w-1/2">
            <label htmlFor="precio">Precio</label>
            <input
              className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
                errors.precio ? "border-red-500" : "border-gray-400"
              }`}
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Precio"
            />
            {errors.precio && (
              <p className="text-red-500 text-xs">{errors.precio}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="p-4 shadow-lg bg-blue-300 text-gray-900 rounded-md mt-2"
        >
          {product ? "Editar producto" : "Crear producto"}
        </button>
      </form>
    </div>
  );
}
