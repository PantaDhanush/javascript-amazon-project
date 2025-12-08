import { cart } from "../../data/cart.js";
import { totalItemsInCart } from "../Utils/ItemsInCart.js";
export function renderCheckOutHeader(){
    let totalItems=totalItemsInCart();
    const html=`Checkout (<a class="return-to-home-link"
    href="amazon.html">${totalItems} Items</a>)`
    document.querySelector('.js-checkout-header-middle-section').innerHTML=html;
}