import toast from "react-hot-toast";
import instance from "../../api/axiosConfig";

export const FETCH_SHEETS = "FETCH_SHEETS";
export const AUTH_SHEETS = "AUTH_SHEETS";
export const ADD_SHEET_ROW = "ADD_SHEET_ROW";
export const FETCH_PRODUCT_SHEET_BY_ID = "FETCH_PRODUCT_SHEET_BY_ID";
export const UPDATE_SHEET_ROW = "UPDATE_SHEET_ROW";
export const DELETE_SHEET_ROW = "DELETE_SHEET_ROW";

export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";
export const CLEAR_IMAGES = "CLEAR_IMAGES";
export const SET_CONDITION = "SET_CONDITION";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_DASHBOARD_CATEGORIES = "GET_DASHBOARD_CATEGORIES";
export const FILTER_CATEGORY = "FILTER_CATEGOTY";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const CLEAR_COLOR = "CLEAR_COLOR";
export const GET_COLORS = "GET_COLORS";
export const FILTER_COLOR = "FILTER_COLOR";
export const SET_VARIABLE = "SET_VARIABLE";
export const SEARCH_PRODUCT= "SEARCH_PRODUCT";
export const CLEAN_SEARCH_PRODUCT= "CLEAN_SEARCH_PRODUCT"

export const GET_CASH_FLOW = "GET_CASH_FLOW";
export const ADD_CASH_FLOW_ENTRY = "ADD_CASH_FLOW_ENTRY";


export const fetchSheets = () => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await instance.get(`/api/sheets/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Map imageUrls to the url field for each product
    const productsWithUrls = res.data.products.map((product) => ({
      ...product,
      nombre: product.nombre || "Nombre no disponible",
      images: Array.isArray(product.imageUrls) ? product.imageUrls : [product.imageUrls || ""],
    }));

    dispatch({
      type: FETCH_SHEETS,
      payload: productsWithUrls,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await instance.get(`/api/sheets/data/${id}`);
    dispatch({
      type: FETCH_PRODUCT_SHEET_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const addSheetRow = (rowData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await instance.post(`/api/sheets/data`, rowData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.loading("Creando producto");
    if (res.status === 200) {
      toast.success("Creado exitosamente");
      dispatch({
        type: ADD_SHEET_ROW,
        payload: res.data,
      });
      dispatch(fetchSheets());
    }
    setTimeout(() => {
      toast.dismiss();
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

export const updateRow = (rowData) => async (dispatch) => {
  try {
    const res = await instance.put(`/api/sheets/update`, rowData);
    if (res.status === 200) {
      toast.success("Editado exitosamente");
      dispatch({
        type: UPDATE_SHEET_ROW,
        payload: res.data,
      });
      dispatch(fetchSheets());
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteSheetRow = (rowIndex) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await instance.delete(`/api/sheets/delete/${rowIndex}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      toast.success("Eliminado exitosamente");
      dispatch({
        type: DELETE_SHEET_ROW,
        payload: rowIndex,
      });
      dispatch(fetchSheets());
    }
  } catch (error) {
    console.log(error);
  }
};

export const publicProductById = (id) => async (dispatch) => {
  try {
    const res = await instance.put(`/api/sheets/product/${id}`);
    if (res.status === 200) {
      toast.success(res.data.message);
      dispatch({
        type: "PUBLIC_PRODUCT_BY_ID",
        payload: id,
      });
      dispatch(fetchSheets());
    }
  } catch (error) {
    console.log(error);
  }
};

//UPLOAD IMAGE
export const uploadImages = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("No se ha encontrado un token de autenticación");
      return;
    }

    console.log("TOKEN ENVIADO:", token);

    const response = await instance.post("/api/sheets/images", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Validar la respuesta del servidor
    if (response.status === 200) {
      const imageUrls = response.data.imageUrls || response.data.imageUrl;

      if (Array.isArray(imageUrls)) {
        toast.success("Imágenes cargadas exitosamente");
        dispatch({
          type: UPLOAD_IMAGES_SUCCESS,
          payload: imageUrls, // array de URLs
        });
      } else {
        toast.error("El servidor no devolvió un array de URLs");
      }
    } else {
      toast.error("No se pudieron cargar las imágenes");
    }

    setTimeout(() => {
      toast.dismiss();
    }, 2000);
  } catch (error) {
    console.error("Error uploading images:", error);
    toast.error("Error al cargar las imágenes, por favor intente de nuevo.");
    dispatch({
      type: UPLOAD_IMAGES_FAILURE,
      payload: "Error uploading images",
    });
  }
};



  export const clearImages = () => ({
    type: CLEAR_IMAGES,
  });
  
  export const renderCondition = (condition) => ({
    type: SET_CONDITION,
    payload: condition,
  });
  
  export const filterByCategory = (category) => async (dispatch) => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await instance.get(`/api/sheets/filter/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      dispatch({
        type: FILTER_CATEGORY,
        payload: res.data.products,
      });
    } catch (error) {
      console.error("Error fetching sheets by category:", error);
    }
  };
  
  export const clearFilteredProducts = () => ({
    type: CLEAR_FILTER,
  });

  export const clearColor = () => ({
    type: CLEAR_COLOR,
  });
  
  export const getCategories = () => async (dispatch) => {
    try {
      const response = await instance.get("/api/sheets/categories");
      const categories = response.data;
  
      dispatch({ type: GET_CATEGORIES, payload: categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  export const getDashboardCategories = () => async (dispatch) => {
    try {
      const response = await instance.get("/api/sheets/dashboard/categories");
      const dashboardCategories = response.data;
  
      dispatch({ type: GET_DASHBOARD_CATEGORIES, payload: dashboardCategories });
    } catch (error) {
      console.error("Error fetching dashboard categories:", error);
    }
  };
  
  export const getColors = () => async (dispatch) => {
    try {
      const response = await instance.get("/api/sheets/colors");
      const colors = response.data;
  
      // Transformar el array de colores en un array de colores individuales
      const separatedColors = colors.flatMap((color) =>
        color.split(",").map((c) => c.trim())
      );
  
      // Eliminar duplicados usando un Set
      const uniqueColors = [...new Set(separatedColors)];
      dispatch({ type: GET_COLORS, payload: uniqueColors });
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };
  
  export const getProductsByColor = (color) => async (dispatch) => {
    try {
      const response = await instance.get(`/api/sheets/filter/color/${color}`);
      const products = response.data.products;
  
      dispatch({ type: FILTER_COLOR, payload: products });
    } catch (error) {
      console.error("Error fetching products by color:", error);
    }
  };

  export const setVariable = (variable) => async (dispatch) => {
    try {
      dispatch({ type: SET_VARIABLE, payload: variable });
    } catch (error) {
      console.error("Error setting variable:", error);
    }
  };

  export const searchProduct = (name) => async (dispatch) =>{
    try {
      
      dispatch({ type: SEARCH_PRODUCT, payload: name });
      
      
    }
    catch (error) {
      console.error("Error searching product:", error);
      toast.error("Error buscando el producto");
    }
  }

  export const cleanSearchProducts = () => async (dispatch) => {
    try {
      dispatch({ type: CLEAN_SEARCH_PRODUCT });
    } catch (error) {
      console.error("Error cleaning search products:", error);
    }
  }

  // FLUJO DE CAJA
// Obtener todos los movimientos de caja
export const getCashFlow = () => async (dispatch) => {
    try {
      const res = await instance.get(`/api/sheets/cashflow`);
  
      dispatch({
        type: GET_CASH_FLOW,
        payload: res.data, // Asegúrate que este payload coincide con la estructura de datos que esperas en tu componente
      });
    } catch (error) {
      console.error("Error obteniendo flujo de caja:", error);
      dispatch({ error: error.message });
    }
  };
  
  export const addCashFlowEntry = (entryData) => async (dispatch) => {
    try {
      const response = await instance.post("/api/sheets/cashflow/add", entryData);
      toast.success("Entrada añadida exitosamente");
  
      // Actualizar el estado local solo con la nueva entrada
      dispatch({
        type: ADD_CASH_FLOW_ENTRY,
        payload: response.data, // Solo la nueva entrada
      });
  
      // Desencadenar un fetch para obtener todo el flujo de caja actualizado (opcional)
      dispatch(getCashFlow());
    } catch (error) {
      console.error("Error añadiendo entrada:", error);
      toast.error("Error añadiendo la entrada de flujo de caja");
    }
  };