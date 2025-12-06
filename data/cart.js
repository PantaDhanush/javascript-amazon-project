export const cart=[];

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
                quantity:1
            }
        )
    }
}
