import { cart, removeFromeCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurrency  from "./Utils/Money.js";
import { totalItemsInCart } from "./Utils/ItemsInCart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";
let totalCart='';
cart.forEach((cartItem)=>{
const {productId,quantity}=cartItem;
let product;
products.forEach((p)=>{
    if(p.id===productId){
        product=p;
        return;
    }
})
const deliveryOptionId=cartItem.deliveryOptionsId;
let deliveryOption;
deliveryOptions.forEach((Option)=>{
    if(Option.id===deliveryOptionId){
        deliveryOption=Option;
    }
})
const today=dayjs();
const deliveryDate=today.add(deliveryOption.deliverDays,'days');
const dateString=deliveryDate.format('dddd,MMMM D');
totalCart+=`
<div class="cart-item-container js-cart-item-container-${product.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${product.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${product.name}
            </div>
            <div class="product-price">
            $${formatCurrency(product.priceCents)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label js-quantity-label-${product.id}">${quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${product.id}">
                Update
            </span>
            <input class="quantity-input js-quantity-input-${product.id}">
            <span class="save-quantity-link link-primary js-save-link"
            data-product-id="${product.id}">
                Save    
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">
                Delete
            </span>
            </div>
        </div>
        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(product,cartItem)}
        </div>
        </div>
    </div>
`
})

function deliveryOptionsHTML(product,cartItem){
    let html='';
    deliveryOptions.forEach((deliveryOption)=>{
        const today=dayjs();
        const deliveryDate=today.add(deliveryOption.deliverDays,'days');
        const dateString=deliveryDate.format('dddd,MMMM D');
        const priceString=deliveryOption.priceCents===0?'FREE ':`$${formatCurrency(deliveryOption.priceCents)} -`;
        const isChecked=deliveryOption.id===cartItem.deliveryOptionsId;
        html+=`
        <div class="delivery-option">
            <input type="radio" ${isChecked?'checked':''}
                class="delivery-option-input"
                name="delivery-option-${product.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                ${priceString} Shipping
                </div>
            </div>
        </div>
        `
    })
    return html;
}
document.querySelector('.order-summary').innerHTML=totalCart;
function updateCartQuantityInCartPage(){
    let totalQuantity=totalItemsInCart();
    document.querySelector('.js-count-of-items').innerText=`${totalQuantity} Items`
}
updateCartQuantityInCartPage();

//delete
document.querySelectorAll('.js-delete-link')
.forEach((link)=>{
    link.addEventListener('click',()=>{
        const {productId}=link.dataset;
        removeFromeCart(productId);
        console.log(cart);
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCartQuantityInCartPage();
    })
})

//update
document.querySelectorAll('.js-update-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
            const {productId}=link.dataset;
            const container=document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
        })
    })

//save
document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', (event) => {
        const {productId}=link.dataset;
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        const newQuantity=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }
        updateQuantity(productId,newQuantity);
        document.querySelector(`.js-quantity-label-${productId}`).innerText=newQuantity;
        container.classList.remove('is-editing-quantity');
        updateCartQuantityInCartPage();
    });
  });
