
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
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
        if (userId) {
            const res = await fetch(`/api/cart?userId=${userId}`, {
                method: "GET",
            });
            const data = await res.json();
            return data;
        }

    } catch (error) {
        throw new Error("Cannot fetch data from the database");
    }
});


export const addCartItem = createAsyncThunk("cart/addCartItem", async (data: { product_name: string, quantity: number, price: number }) => {
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

export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async (data: { product_name: string; quantity: number }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/api/cart?product_name=${encodeURIComponent(data.product_name)}`, {
                quantity: data.quantity,
            });

            const updatedCartItem = res.data;
            return updatedCartItem;
        } catch (error) {
            // Return the error message in the rejected state
            return rejectWithValue('Cannot update product quantity!');
        }
    }
);

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
            state.cartItems = action.payload.items;
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
        });
        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.isLoading = false;
            // Update the cart item with the new data from the API response
            const updatedCartItem = action.payload;
            state.cartItems = state.cartItems.map((item) =>
                item.product_name === updatedCartItem.product_name ? updatedCartItem : item
            );
        });
        builder.addCase(updateCart.rejected, (state, action) => {
            state.isLoading = false;
        });

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
