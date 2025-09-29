import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        toggleMenu: true
    },
    reducers:{
        toggleMenu: (state) => {
            state.toggleMenu = !state.toggleMenu;
        },
        closeMenu: (state) => {
            state.toggleMenu = false;
        }
    }
})

export const { toggleMenu ,closeMenu} = appSlice.actions;
export default appSlice.reducer;  