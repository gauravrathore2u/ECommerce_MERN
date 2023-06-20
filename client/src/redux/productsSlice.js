import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    productsList : [],
    cartItems: []
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProductData: (state, action)=>{
            state.productsList = [...action.payload]
        },

        addCartItem: (state, action)=>{
            const check = state.cartItems.some((el)=> el._id === action.payload._id);
            if(check){
                toast("Item already in cart");
            }
            else{
                toast("Item added Successfully");
                const total = action.payload.price;
                state.cartItems = [...state.cartItems, {...action.payload, qty: 1, total: total}]
            }
            
        },

        deleteCartItem: (state, action)=>{
            toast("One Item Deleted");
            const index = state.cartItems.findIndex((el)=> el._id === action.payload);
            state.cartItems.splice(index,1);
        },

        increaseQty: (state, action)=>{
            const index = state.cartItems.findIndex((el)=> el._id === action.payload);
            let qty = state.cartItems[index].qty;
            let qtyInc = ++qty;
            state.cartItems[index].qty = qtyInc;

            const price = state.cartItems[index].price;
            const total = price * qtyInc;
            state.cartItems[index].total = total;
        },

        decreaseQty: (state, action)=>{
            const index = state.cartItems.findIndex((el)=> el._id === action.payload);
            let qty = state.cartItems[index].qty;
            if(qty > 1){
                let qtyDec = --qty;
                state.cartItems[index].qty = qtyDec;
                
                const price = state.cartItems[index].price;
                const total = price * qtyDec;
                state.cartItems[index].total = total;
            }
        }
    }
});

export const {setProductData, addCartItem, deleteCartItem, increaseQty, decreaseQty} = productsSlice.actions;

export default productsSlice.reducer;