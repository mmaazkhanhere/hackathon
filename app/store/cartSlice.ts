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
import { auth } from "@clerk/nextjs";
import axios from 'axios';

interface IDatabaseData {
    product_name: string,
    price: number;
    quantity: number;
    user_id?: number;
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

export const getData = createAsyncThunk("cart/getData", async (userId: string) => {
    try {
        const res = await fetch(`/api/cart/${userId}`);
        if (!res.ok) {
            throw new Error("Cannot fetch data from the database");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Cannot fetch data from the database");
    }
});

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

export const updateCart = createAsyncThunk("cart/updateCart", async (data: { product_name: string, quantity: number }) => {
    try {
        const res = await axios.patch(`/api/cart?product_name=${encodeURIComponent(data.product_name)}`, {
            quantity: data.quantity
        });
        return res.data;
    } catch (error) {
        throw new Error("Cannot update product quantity!")
    }
})

export const deleteItem = createAsyncThunk("cart/deleteItem", async (data: { product_name: string }) => {
    try {
        const res = await axios.delete(`/api/cart?product_name=${encodeURIComponent(data.product_name)}`)
        return res.data
    } catch (error) {
        throw new Error("Cannot delete item!")
    }
})


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
        //case for fetching item
        builder.addCase(getData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        builder.addCase(getData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.cartItems = action.payload.items; // Assuming the data is an object with an "items" property
        });

        builder.addCase(getData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "Cannot fetch data from the database";
        });
        //case for adding data into the cart
        builder.addCase(addCartItem.pending, (state, action) => {
            state.isLoading = true;
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
        builder.addCase(addCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error
        })
        //case for updating item in the cart
        builder.addCase(updateCart.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateCart.fulfilled, (state, action) => {
            // Update the cartItems array with the updated item quantity
            const updatedItem = action.payload;
            const existingItem = state.cartItems.find(item => item.product_name === updatedItem.product_name);
            if (existingItem) {
                existingItem.quantity = updatedItem.quantity;
            }
        });
        builder.addCase(updateCart.rejected, (state, action) => {
            state.isLoading = false;
        })
        //case for delete item
        builder.addCase(deleteItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            // Remove the deleted item from the cartItems array
            const deletedProductName = action.meta.arg.product_name;
            state.cartItems = state.cartItems.filter(item => item.product_name !== deletedProductName);
        });
        builder.addCase(deleteItem.rejected, (state, action) => {
            state.isLoading = false
        })
    }
});

export const { removeFromCart } = cartSlice.actions;

export const selectIsLoading = (state: RootState) => state.cart.isLoading;

export default cartSlice.reducer;
