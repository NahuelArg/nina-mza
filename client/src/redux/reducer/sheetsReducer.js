import {
  FETCH_SHEETS,
  ADD_SHEET_ROW,
  UPDATE_SHEET_ROW,
  DELETE_SHEET_ROW,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  CLEAR_IMAGES,
  CLEAR_FILTER,
  CLEAR_COLOR,
  FILTER_CATEGORY,
  GET_CATEGORIES,
  SET_CONDITION,
  GET_CASH_FLOW,
  ADD_CASH_FLOW_ENTRY,
  FETCH_PRODUCT_SHEET_BY_ID,
  GET_COLORS,
  FILTER_COLOR,
  SET_VARIABLE,
  SEARCH_PRODUCT,
  CLEAN_SEARCH_PRODUCT,
  GET_DASHBOARD_CATEGORIES,
  FILTER_BY_PARAMS,
} from "../actions/productActions";

const initialState = {
  sheetsData: [],
  product: {},
  loading: false,
  error: null,
  rCondition: "allProducts",
  images: [],
  filterProducts: [],
  categories: [],
  dashboardCategories: [],
  cashFlow: [],
  colors: [],
  filterColors: [],
  searchedProducts: [],
  filterVar: { category: "", color: "" },
  allProducts: [],
  filteredProducts: [],
};

const sheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHEETS:
      return {
        ...state,
        sheetsData: action.payload,
        allProducts: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case FETCH_PRODUCT_SHEET_BY_ID:
      return { ...state, product: action.payload };

    case ADD_SHEET_ROW:
      return { ...state, sheetsData: [...state.sheetsData, action.payload] };

    case UPDATE_SHEET_ROW:
      return {
        ...state,
        sheetsData: state.sheetsData.map((row) => (row[0] === action.payload[0] ? action.payload : row)),
      };

    case DELETE_SHEET_ROW:
      return { ...state, sheetsData: state.sheetsData.filter((row) => row[0] !== action.payload) };

    case UPLOAD_IMAGES_SUCCESS:
      return { ...state, images: [...state.images, action.payload], error: null };

    case UPLOAD_IMAGES_FAILURE:
      return { ...state, error: action.payload };

    case CLEAR_IMAGES:
      return { ...state, images: [] };

    case SET_CONDITION:
      return { ...state, rCondition: action.payload };

    case SET_VARIABLE: {
      const payload = action.payload;
      const normalized =
        payload == null
          ? { category: "", color: "" }
          : typeof payload === "string"
          ? { category: payload, color: "" }
          : { category: payload.category || "", color: payload.color || "" };
      return { ...state, filterVar: normalized };
    }

    case FILTER_CATEGORY:
      return { ...state, filterProducts: action.payload, filteredProducts: Array.isArray(action.payload) ? action.payload : [] };

    case CLEAR_COLOR:
      return { ...state, filterColors: [] };

    case CLEAR_FILTER:
      return { ...state, filterProducts: [], filteredProducts: [] };

    case GET_CATEGORIES:
      return { ...state, categories: action.payload };

    case GET_DASHBOARD_CATEGORIES:
      return { ...state, dashboardCategories: action.payload };

    case GET_COLORS:
      return { ...state, colors: action.payload };

    case FILTER_COLOR:
      return { ...state, filterColors: action.payload };

    case SEARCH_PRODUCT: {
      const searchTerm = (action.payload || "").toString().toLowerCase();
      const searchedProducts = state.sheetsData.filter((item) => typeof item?.nombre === "string" && item.nombre.toLowerCase().includes(searchTerm));
      return { ...state, searchedProducts };
    }

    case CLEAN_SEARCH_PRODUCT:
      return { ...state, searchedProducts: [] };

    case GET_CASH_FLOW:
      return { ...state, cashFlow: action.payload };

    case ADD_CASH_FLOW_ENTRY:
      return { ...state, cashFlow: [...state.cashFlow, action.payload] };

    case FILTER_BY_PARAMS:
      return { ...state, filteredProducts: Array.isArray(action.payload) ? action.payload : [] };

    default:
      return state;
  }
};

export default sheetsReducer;

