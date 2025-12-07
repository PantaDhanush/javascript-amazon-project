export let cart=JSON.parse(localStorage.getItem('cart'))||[
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionsId:'1'
    },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionsId:'2'
    }
];
export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId){
    let matchingItem;
    cart.forEach((item)=>{
        if(productId===item.productId){
            matchingItem=item;
            return;
        }
    });
    if(matchingItem){
        matchingItem.quantity++;
    }else{
        cart.push(
            {
                productId:productId,
                quantity:1,
                deliveryOptionsId:'1'
            }
        )
    }
    saveToStorage();
}
export function removeFromeCart(productId){
    const index = cart.findIndex(item => item.productId === productId);
    if (index !== -1) cart.splice(index, 1);
    saveToStorage();
}

export function updateQuantity(productId,newQuantity){
    const matchingItem = cart.find(item => item.productId === productId);
    matchingItem.quantity=newQuantity;
    saveToStorage();
}