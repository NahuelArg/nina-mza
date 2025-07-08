import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import sheetsReducer from "./reducer/sheetsReducer";
import cartReducer from "./reducer/cartReducer";
import userReducer from "./reducer/userReducer";
import paymentReducer from "./reducer/paymentReducer";


const store = configureStore({
    reducer: {
        auth: authReducer,
        sheets: sheetsReducer,
        cart: cartReducer,
        user: userReducer,
        payment: paymentReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})


export default store;
