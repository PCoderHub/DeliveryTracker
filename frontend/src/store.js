import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenSlicer from "./tokenSlicer";

const rootReducer = combineReducers({
    token: tokenSlicer,
});

export default configureStore({
    reducer: rootReducer,
});