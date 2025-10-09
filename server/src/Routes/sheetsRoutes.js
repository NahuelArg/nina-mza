const { Router } = require("express");
const sheetsRouter = Router();
const {
  authorize,
  getSheetData,
  appendRow,
  updateRow,
  registerSale,
  getSaleData,
  getSaleDataUnitiInfo,
  deleteRowById,
  increaseStock,
  decreaseStock,
  getProductsByCategory,
  getAllCategories,
  deleteSalesById,
  getCashFlow,
  addCashFlowEntry,
  getSheetDataById,
  getAllColors,
  getProductsByColor,
  activeProductById,
  getSaleByUserId,
  registerSaleDashboard,
  putSaleChangeState,
  getCategoriesDashboard,
} = require("../Controllers/sheets/sheetsController.js");
const {uploadImages}= require("../Controllers/sheets/uploadImages.js");
const { authMiddleware } = require("../Middleware/authMiddleware.js");
const upload = require("../Middleware/uploadMiddleware.js");
const { response } = require("../app.js");

// --- CACHE CONFIG ---
const CACHE_DURATION = 60 * 1000; // 1 minuto

let dataCache = null;
let dataCacheTime = 0;

let categoriesCache = null;
let categoriesCacheTime = 0;

let colorsCache = null;
let colorsCacheTime = 0;

let filterCategoryCache = {};
let filterCategoryCacheTime = {};

let filterColorCache = {};
let filterColorCacheTime = {};

let tallesCache = null;
let tallesCacheTime = 0;

// --- ENDPOINTS CON CACHE ---


sheetsRouter.get("/data", async (req, res) => {
  const now = Date.now();
  if (dataCache && now - dataCacheTime < CACHE_DURATION) {
    // Asegura que dataCache siempre tenga la forma { products: [...] }
    return res.json(dataCache);
  }
  try {
    const auth = await authorize();
    const data = await getSheetData(auth);
       const response = Array.isArray(data)
      ? { products: data }
      : data && Array.isArray(data.products)
      ? data
      : { products: [] };
    dataCache = response;
    dataCacheTime = now;
    // Siempre responde { products: [...] }
   console.log("Respuesta /api/sheets/data - productos:", response.products.length);
    return res.json(response);
  } catch (error) {
    console.error("Error en /api/sheets/data:", error.stack || error);
    return res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
});
sheetsRouter.get("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await authorize();
    const data = await getSheetDataById(id, auth);
    res.json(data);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send(error.message);
  }
});

sheetsRouter.post("/data", async (req, res) => {
  try {
    const auth = await authorize();
    const data = req.body;
    const updates = await appendRow(auth, data);
    res.json(updates);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send(error.message);
  }
});

sheetsRouter.put("/update", async (req, res) => {
  try {
    const auth = await authorize();
    const rowData = req.body;
    const result = await updateRow(auth, rowData);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

sheetsRouter.delete("/delete/:rowIndex", async (req, res) => {
  try {
    const auth = await authorize();
    const rowIndex = parseInt(req.params.rowIndex, 10);
    const result = await deleteRowById(auth, rowIndex);
    res.status(200).json(result);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
});

sheetsRouter.put("/product/:id", async (req, res) => {
  try {
    const auth = await authorize();
    const rowIndex = parseInt(req.params.id, 10);
    const result = await activeProductById(auth, rowIndex);
    res.status(200).json(result);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
});



// Ruta para subir múltiples imágenes
sheetsRouter.post("/images", upload.array("images", 10), uploadImages)

sheetsRouter.get("/sale", async (req, res) => {
  try {
    const auth = await authorize();
    const sale = await getSaleData(auth);
    res.json(sale.salesData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

sheetsRouter.get("/sale/:id", async (req, res) => {
  try {
    const auth = await authorize();
    const saleId = req.params.id;
    const sales = await getSaleDataUnitiInfo(auth, saleId);

    if (sales.length === 0) {
      return res.status(404).json({ message: "Ventas no encontradas" });
    }

    res.json(sales);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

sheetsRouter.put("/sale/:id/changestate/:state", async (req, res) => {
  try {
    const { id, state } = req.params;
    const auth = await authorize();
    const saleChanged = await putSaleChangeState(auth, id, state);

    res.json(saleChanged);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

sheetsRouter.post("/sale/dashboard", async (req, res) => {
  try {
    const data = req.body;
    // console.log(data)
    const auth = await authorize();
    const sale = await registerSaleDashboard(auth, data);
    res.json(sale);
  } catch (error) {
    // console.log({ error: error.message });
    res.status(500).send(error.message);
  }
});

sheetsRouter.post("/sale", async (req, res) => {
  try {
    const data = req.body;
    // console.log(data)
    const auth = await authorize();
    const sale = await registerSale(auth, data);
    res.json(sale);
  } catch (error) {
    // console.log({ error: error.message });
    res.status(500).send(error.message);
  }
});

sheetsRouter.get("/sales/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    const authClient = await authorize();

    const sales = await getSaleByUserId(authClient, uid);
    // console.log(sales)
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo ventas por UID",
      error: error.message,
    });
  }
});

sheetsRouter.delete("/delete/sale/:id", async (req, res) => {
  try {
    const auth = await authorize();
    const id = req.params.id;
    const result = await deleteSalesById(auth, id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sheetsRouter.put("/increase-stock", async (req, res) => {
  try {
    const auth = await authorize();
    const { productId, amount } = req.body;
    const result = await increaseStock(auth, productId, amount);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

sheetsRouter.put("/decrease-stock", async (req, res) => {
  try {
    const auth = await authorize();
    const { productId, amount } = req.body;
    const result = await decreaseStock(auth, productId, amount);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// ...existing code...
sheetsRouter.get("/filter", async (req, res) => {
  try {
    const auth = await authorize();
    const { category = "", color = "" } = req.query;

    const normalize = (s) =>
      typeof s === "string"
        ? s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : "";

    const catNorm = normalize(category);
    const colorNorm = normalize(color);

    const { products = [] } = await getSheetData(auth);

    const filtered = (products || [])
      .filter((p) => p.publicado === "si")
      .filter((p) => {
        const prodCat = normalize(p.categoria || "");
        const prodColor = normalize(p.color || "");

        const matchesCategory = catNorm ? prodCat === catNorm : true;

        const matchesColor = colorNorm
          ? prodColor.includes(",")
            ? prodColor.split(",").map((c) => c.trim()).includes(colorNorm)
            : prodColor === colorNorm
          : true;

        return matchesCategory && matchesColor;
      });

    return res.json(Array.isArray(filtered) ? filtered : []);
  } catch (error) {
    console.error("Error en /api/sheets/filter:", error.stack || error);
    return res.status(500).json({ error: error.message || "Error interno al filtrar" });
  }
});

sheetsRouter.get("/filter/category/:category", async (req, res) => {
  const category = req.params.category;
  const now = Date.now();
  if (
    filterCategoryCache[category] &&
    now - filterCategoryCacheTime[category] < CACHE_DURATION
  ) {
    return res.json(filterCategoryCache[category]);
  }
  try {
    const auth = await authorize();
    const data = await getProductsByCategory(auth, category);
    filterCategoryCache[category] = data;
    filterCategoryCacheTime[category] = now;
    res.json(data);
  } catch (error) {
    res.status(404).send("Producto no encontrado");
  }
});

sheetsRouter.get("/categories", async (req, res) => {
  const now = Date.now();
  if (categoriesCache && now - categoriesCacheTime < CACHE_DURATION) {
    return res.json(categoriesCache);
  }
  try {
    const auth = await authorize();
    const categories = await getAllCategories(auth);
    categoriesCache = categories;
    categoriesCacheTime = now;
    res.json(categories);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send(error.message);
  }
});

sheetsRouter.get("/dashboard/categories", async (req, res) => {
  try {
    const auth = await authorize();
    const categories = await getCategoriesDashboard(auth);
    res.json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

sheetsRouter.get("/colors", async (req, res) => {
  const now = Date.now();
  if (colorsCache && now - colorsCacheTime < CACHE_DURATION) {
    return res.json(colorsCache);
  }
  try {
    const auth = await authorize();
    const colors = await getAllColors(auth);
    colorsCache = colors;
    colorsCacheTime = now;
    res.json(colors);
  } catch (error) {
    console.error("Error en /api/sheets/colors:", error);
    res.status(500).send(error.message || "Error interno al obtener colores");
  }
});

// ...existing code...
sheetsRouter.get("/filter/color/:color", async (req, res) => {
  try {
    const auth = await authorize();
    const colorParam = req.params.color || "";
    const color = colorParam.toUpperCase();
    const now = Date.now();

    // Return cached array if valid
    if (
      filterColorCache[color] &&
      now - filterColorCacheTime[color] < CACHE_DURATION
    ) {
      const cached = filterColorCache[color];
      const products = Array.isArray(cached)
        ? cached
        : Array.isArray(cached?.products)
        ? cached.products
        : [];
      return res.json(products);
    }

    // Call controller to get products by color
    const data = await getProductsByColor(auth, color);

    // Normalize controller response to an array
    const products = Array.isArray(data)
      ? data
      : Array.isArray(data?.products)
      ? data.products
      : [];

    // Cache and respond
    filterColorCache[color] = products;
    filterColorCacheTime[color] = now;
    return res.json(products);
  } catch (error) {
    console.error("Error en /api/sheets/filter/color/:color", error.stack || error);
    return res.status(500).json({ error: error.message || "Error interno al filtrar por color" });
  }
});
// ...existing code...

sheetsRouter.get("/cashflow", async (req, res) => {
  try {
    const auth = await authorize(); // Asegúrate de que authorize está correctamente implementado
    const cashFlow = await getCashFlow(auth);

    // Verificar que cashFlowData exista antes de enviarlo
    if (cashFlow && cashFlow.cashFlowData) {
      res.json(cashFlow.cashFlowData);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron datos de flujo de caja." });
    }
  } catch (error) {
    console.error("Error al obtener el flujo de caja:", error.message);
    res.status(500).json({ error: error.message });
  }
});

sheetsRouter.post("/cashflow/add", async (req, res) => {
  try {
    const auth = await authorize();
    const { tipo, monto, descripcion, fecha } = req.body; // Asegúrate de enviar estos datos desde el frontend
    const result = await addCashFlowEntry(auth, {
      tipo,
      monto,
      descripcion,
      fecha,
    });
    res.json(result);
  } catch (error) {
    console.error(
      "Error al agregar el movimiento al flujo de caja:",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
});

module.exports = sheetsRouter;
