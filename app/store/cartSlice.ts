// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// import { Image as IImage } from "sanity";


// export interface ICartItem {
//     name: string,
//     price: number,
//     sub_cat: string,
//     image: IImage,
//     quantity: number
// }

// interface IDatabaseData{
//     id:number;
//     user_id:string;
//     product_name:string,
//     price:number;
//     quantity:number;
// }


// export interface CartState {
//     cartItems: IDatabaseData[];
//     isLoading: boolean,
//     error: any;
// }

// const initialState: CartState = {
//     cartItems: [],
//     isLoading: false,
//     error: null
// };

// export const getData = createAsyncThunk("cart/getData", async () => {
//     const res = await fetch('/api/cart/get');
//     if (!res.ok) {
//         throw new Error("Cannot fetch data from the database")
//     }
//     const data = await res.json();
//     return data;
// })

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addToCart: (state: CartState, action: PayloadAction<{ product: ICartItem, oneQuantityPrice: number }>) => {
//             console.log(state.cartItems)
//             const item = state.cartItems.find((p) => p.name === action.payload.product.name);
//             const existingItem = state.cartItems.find((item) => item.name === action.payload.product.name);
//             if (item) {
//                 if (existingItem) {
//                     existingItem.quantity = action.payload.product.quantity;
//                     existingItem.price = action.payload.oneQuantityPrice * action.payload.product.quantity
//                 }
//                 else {
//                     item.quantity++;
//                     item.price = action.payload.oneQuantityPrice * item.quantity
//                 }
//             }
//             else {
//                 state.cartItems.push({ ...action.payload.product, quantity: 1 });
//             }
//         },

//         removeFromCart: (state, action: PayloadAction<string>) => {
//             state.cartItems = state.cartItems.filter(
//                 (item) => item.name !== action.payload
//             );
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(getData.pending, (state) => {
//             state.isLoading = true
//         })
//         builder.addCase(getData.fulfilled, (state, action) => {
//             const { items } = action.payload
//             state.cartItems = items
//             state.isLoading = false;
//         });
//         builder.addCase(getData.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.error
//         })
//     }
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;

// export const selectIsLoading = (state: RootState) => state.cart.isLoading;

// export default cartSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Image as IImage } from "sanity";
import axios from 'axios';

interface IDatabaseData {
    product_name: string,
    price: number;
    quantity: number;
}

interface ICartState {
    cartItems: IDatabaseData[],
    isLoading: boolean,
    error: any
}

const initialState: ICartState = {
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

export const addCartItem = createAsyncThunk("cart/addCartItem", async (data: { product_name: string, quantity: number, price: number }, { getState }) => {
    try {
        await axios.post("/api/cart", {
            product_name: data.product_name,
            quantity: data.quantity,
            price: data.price
        });

        const addedProduct: IDatabaseData = {
            product_name: data.product_name,
            quantity: data.quantity,
            price: data.price,
        };

        return addedProduct;
    }
    catch (error) {
        throw new Error("Cannot insert items into the database");
    }
});


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.product_name !== action.payload
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
        builder.addCase(addCartItem.fulfilled, (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.product_name === newItem.product_name);
            if (!existingItem) {
                // If the item is not present in the cart, add it to the cartItems array
                state.cartItems.push(newItem);
            } else {
                // If the item already exists in the cart, increase its quantity
                existingItem.quantity = existingItem.quantity + 1;
                console.log(existingItem.quantity)
                existingItem.price = newItem.price;
            }
        });
    }
});

export const { removeFromCart } = cartSlice.actions;

export const selectIsLoading = (state: RootState) => state.cart.isLoading;

export default cartSlice.reducer;
