import { cart } from "../../data/cart.js";
export function totalItemsInCart(){
    let totalQuantity=0;
    cart.forEach((cartItems)=>{
        totalQuantity+=cartItems.quantity;
    })
    return totalQuantity;
}