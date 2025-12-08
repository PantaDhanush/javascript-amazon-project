const cart={
    cartItems:undefined,
    loadFromStorage(){
        this.cartItems=JSON.parse(localStorage.getItem('cart-oop'))||[
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryOptionsId:'1'
        },{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryOptionsId:'2'
        }];
    },
    saveToStorage(){
        localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
    },
    addToCart(productId){
        let matchingItem;
        this.cartItems.forEach((item)=>{
            if(productId===item.productId){
                matchingItem=item;
                return;
            }
        });
        if(matchingItem){
            matchingItem.quantity++;
        }else{
            this.cartItems.push(
                {
                    productId:productId,
                    quantity:1,
                    deliveryOptionsId:'1'
                }
            )
        }
        this.saveToStorage();
    },
    removeFromeCart(productId){
        const index = this.cartItems.findIndex(item => item.productId === productId);
        if (index !== -1) this.cartItems.splice(index, 1);
        this.saveToStorage();
    },
    updateQuantity(productId,newQuantity){
        const matchingItem = this.cartItems.find(item => item.productId === productId);
        matchingItem.quantity=newQuantity;
        this.saveToStorage();
    },
    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((item)=>{
            if(productId===item.productId){
                matchingItem=item;
                return;
            }
        });
        matchingItem.deliveryOptionsId=deliveryOptionId;
        this.saveToStorage();
    }
}
cart.loadFromStorage();
console.log(cart)