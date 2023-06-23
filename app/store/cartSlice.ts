import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


export interface ICartItem {
    name: string,
    price: number,
    sub_cat: string
}

export interface CartState {
    cartItems: ICartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            state.cartItems.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.name !== action.payload
            );
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart;

export default cartSlice.reducer;