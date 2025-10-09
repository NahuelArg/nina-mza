import React, { useEffect, useState } from "react";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import ProductList from "../../componentes/Ecommerce/Products/ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSheets,
  getCategories,
  getColors,
} from "../../redux/actions/productActions";
import WhatsAppBubble from "../../componentes/Ecommerce/Whatsapp/WhatsAppBubble";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.sheets.sheetsData);
  const filterProducts = useSelector((state) => state.sheets.filteredProducts);
  const condition = useSelector((state) => state.sheets.rCondition);
  const filterColors = useSelector((state) => state.sheets.filterColors);
  const searchedProducts = useSelector((state) => state.sheets.searchedProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSheets())
      .then(() => {
        dispatch(getCategories());
        dispatch(getColors());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const renderProducts = () => {
    switch (condition) {
      case "allProducts":
        return <ProductList allProducts={products} />;
      case "filteredProducts":
        // Always pass the filteredProducts array directly. If it's empty
        // ProductList will show the 'No se encontraron productos para este filtro' message.
        return <ProductList allProducts={filterProducts} />;
      case "filteredColor":
        return <ProductList allProducts={filterColors} />;
      case "searchedProducts":
        return <ProductList allProducts={searchedProducts} />;
      default:
        return <ProductList allProducts={products} />;
    }
  };

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div>
      <Navigation isCart={false} />
      <WhatsAppBubble />

      {renderProducts()}
    </div>
  );
};

export default AllProducts;
