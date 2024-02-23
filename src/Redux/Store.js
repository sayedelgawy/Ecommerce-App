import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { brandsReducer } from "./BrandsSlice";
import { categoriesReducer } from "./CategoriesSlice";





//waiting the reducer
export let store = configureStore({
    reducer:{
        counter:counterReducer,
        brands:brandsReducer,
        categories:categoriesReducer
    }
})