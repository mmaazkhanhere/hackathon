import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Image as IImage } from "sanity";


export interface ICartItem {
    name: string,
    price: number,
    sub_cat: string,
    image: IImage,
    quantity: number,
    oneQuantityPrice: number
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
            const item = state.cartItems.find((p) => p.name === action.payload.name);
            if (item) {
                item.quantity++;
                item.price = item.oneQuantityPrice * item.quantity
            }
            else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },

        updateCart: (state, action: PayloadAction<ICartItem>) => {
            const { name, quantity, oneQuantityPrice } = action.payload;
            const existingItem = state.cartItems.find((item) => item.name === name);

            if (existingItem) {
                existingItem.quantity = quantity;
                existingItem.price = oneQuantityPrice * quantity
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.name !== action.payload
            );
        },
    },
});

export const { addToCart, updateCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart;

export default cartSlice.reducer;