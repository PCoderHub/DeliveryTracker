import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: {},
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        addTokenInfo: (state, action) => {
            state.token = {...action?.payload}
            console.log(state.token);
        },
    },
});

export const {addTokenInfo} = tokenSlice.actions;
export default tokenSlice.reducer;