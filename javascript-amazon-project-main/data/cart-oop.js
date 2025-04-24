//use PascalCase for things that generate objects
//create the Cart object
function Cart(localStorageKey){
    //OOP: Organize the code into an object
    //Group data and function together into an object
    //Easy to create multiple object
    //Ex Amazon and Amazon business do have 2 carts 
    const cart={
        cartItems : undefined,
        loadFromStorage(){  //shortcut for loadFromStorage: function(){
        this.cartItems= JSON.parse(localStorage.getItem(localStorageKey)); 
    
        if(!this.cartItems)
        {
            this.cartItems=[
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
    },
    saveCart(){
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId){
        let matchingItem;
            
        //loop through cart to check if the item exist in the cart or not
        this.cartItems.forEach((item)=>{
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
            this.cartItems.push(
                {
                    productId: productId,
                    quantity:1,
                    deliveryOptionsID:'1'
                }
            );
        }
        this.saveCart();
    },
    updateCartQuantity(){
        //get the total quantity by looping through cart and add the quantity
        let totalQuantity=0;
        this.cartItems.forEach((item)=>{
            if(item.quantity != null)
            {
                    totalQuantity += item.quantity;
            }
        })
        return totalQuantity;
    },

    //Display the quantity in the UI
    displayCartQuantity(displayElementID)
    {
        //get the cart quantity
        let displayTotalQuantity=updateCartQuantity(); 

        //get the dom element for the cart quantity
        const displayQuantity=document.querySelector(displayElementID);
        displayQuantity.innerHTML=displayTotalQuantity;
        
    },
    
    //The purpose of this function is to remove the item from the cart.
        removeCartItem(productID){
        let cartDeleteItemID=productID;

        let updateCart=this.cartItems.filter((cartItem)=>{
            if(cartItem.productId != cartDeleteItemID)
            {
                return true;
            }
        })

        this.cartItems=updateCart;
        this.saveCart();
    },
        
    //The purpose of this method is the update the product quantity
    cartItemUpdateQuantity(getProductID,quantityItem)
    {
        //loop through the cart
        this.cartItems.forEach((cartItem)=>{
        //if the product id match
            if(cartItem.productId==getProductID)
            {
                //assigned the quantity to the array item quantity and return
                return cartItem.quantity=quantityItem;
            }

        });
        this.saveCart();
    },

    //The purpose of this function is update the deliveryOptionID in the cart array when the delivery option get changes
    updateDeliveryOptionID(productId,deliveryOptionsID){
        let matchingItem;
            
        //loop through cart to check if the item exist in the cart or not
        this.cartItems.forEach((item)=>{
            //Check if the productId is already exist in the cart then we can update the quantity.
            if(item.productId == productId)
            {
                matchingItem=item;
            }
        });
        matchingItem.deliveryOptionsID=deliveryOptionsID;
        this.saveCart();

    }
    };
    return cart;
}


const cart=Cart('cart-oop');
const businessCart=Cart('cart-business');
cart.loadFromStorage();
businessCart.loadFromStorage();

