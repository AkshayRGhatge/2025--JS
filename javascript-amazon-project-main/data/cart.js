export const cart=[
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2
    },
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1
    }
];

export function addToCart(productId){
    let matchingItem;
        
    //loop through cart to check if the item exist in the cart or not
    cart.forEach((item)=>{
        //Check if the productId is already exist in the cart then we can update the quantity.
         if(item.productId == productId)
         {
            matchingItem=item;
         }
    });
    //If the item exists in the cart
    if(matchingItem)
    {
        //increment the quantity
        matchingItem.quantity +=1;
    }
    else 
    {
        //Add in the cart productId + quantity
        cart.push(
            {
                productId: productId,
                quantity:1
            }
        );
    }
}

export function updateCartQuantity(){
    //get the total quantity by looping through cart and add the quantity
    let totalQuantity=0;
    cart.forEach((item)=>{
        if(item.quantity != null)
        {
            totalQuantity += item.quantity;
        }
    })
    
    //get the dom element for the cart quantity
    const displayQuantity=document.querySelector('.js-cart-quantity');
    if(totalQuantity)
    {
        displayQuantity.innerHTML=totalQuantity;
    }
    
}