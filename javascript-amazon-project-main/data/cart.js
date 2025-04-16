export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart= JSON.parse(localStorage.getItem('cartItems'));

    if(!cart)
    {
        cart=[
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
                deliveryOptionsID: '1'
            },
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:2,
                deliveryOptionsID: '2'
            }     
        ];
    }
}

function saveCart(){
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

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
        matchingItem.quantity += 1;
    }
    else 
    {
        //Add in the cart productId + quantity
        cart.push(
            {
                productId: productId,
                quantity:1,
                deliveryOptionsID:'1'
            }
        );
    }
    saveCart();
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
    return totalQuantity;
}

//Display the quantity in the UI
export function displayCartQuantity(displayElementID)
{
      //get the cart quantity
      let displayTotalQuantity=updateCartQuantity(); 

      //get the dom element for the cart quantity
      const displayQuantity=document.querySelector(displayElementID);
      displayQuantity.innerHTML=displayTotalQuantity;
     
}
//The purpose of this function is to remove the item from the cart.
export function removeCartItem(productID){
    let cartDeleteItemID=productID;

    let updateCart=cart.filter((cartItem)=>{
        if(cartItem.productId != cartDeleteItemID)
        {
            return true;
        }
    })

    cart=updateCart;
    saveCart();
}
//The purpose of this method is the update the product quantity
export function cartItemUpdateQuantity(getProductID,quantityItem)
{
    //loop through the cart
    cart.forEach((cartItem)=>{
      //if the product id match
        if(cartItem.productId==getProductID)
        {
            //assigned the quantity to the array item quantity and return
            return cartItem.quantity=quantityItem;
        }

    });
    saveCart();
}

//The purpose of this function is update the deliveryOptionID in the cart array when the delivery option get changes
export function updateDeliveryOptionID(productId,deliveryOptionsID){
    let matchingItem;
        
    //loop through cart to check if the item exist in the cart or not
    cart.forEach((item)=>{
        //Check if the productId is already exist in the cart then we can update the quantity.
         if(item.productId == productId)
         {
            matchingItem=item;
         }
    });
    matchingItem.deliveryOptionsID=deliveryOptionsID;
    saveCart();

}