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

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            state.cartItems.push(action.payload)
        }
    }
})

export const { addToCart } = cartSlice.actions;
export const selectItem = (state: RootState) => state.cart.cartItems
export default cartSlice.reducer