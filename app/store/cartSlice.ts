import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Image as IImage } from "sanity";


export interface ICartItem {
    name: string,
    price: number,
    sub_cat: string,
    image: IImage,
    quantity: number
}

export interface CartState {
    cartItems: ICartItem[];
    isLoading: boolean,
    error: any;
}

const initialState: CartState = {
    cartItems: [],
    isLoading: false,
    error: null
};

export const getData = createAsyncThunk("cart/getData", async () => {
    const res = await fetch('/api/cart/get');
    if (!res.ok) {
        throw new Error("Cannot fetch data from the database")
    }
    const data = await res.json();
    return data;
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state: CartState, action: PayloadAction<{ product: ICartItem, oneQuantityPrice: number }>) => {
            const item = state.cartItems.find((p) => p.name === action.payload.product.name);
            const existingItem = state.cartItems.find((item) => item.name === action.payload.product.name);
            if (item) {
                if (existingItem) {
                    existingItem.quantity = action.payload.product.quantity;
                    existingItem.price = action.payload.oneQuantityPrice * action.payload.product.quantity
                }
                else {
                    item.quantity++;
                    item.price = action.payload.oneQuantityPrice * item.quantity
                }
            }
            else {
                state.cartItems.push({ ...action.payload.product, quantity: 1 });
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.name !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            const { items } = action.payload
            state.cartItems = items
            state.isLoading = false;
        });
        builder.addCase(getData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error
        })
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectIsLoading = (state: RootState) => state.cart.isLoading;

export default cartSlice.reducer;