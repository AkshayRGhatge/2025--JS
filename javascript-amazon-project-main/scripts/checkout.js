import {cart,removeCartItem,displayCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrenccy} from './utils/money.js';

let checkoutHtml='';

cart.forEach(item => {
 const productId=item.productId
  let matchingProduct='';

  products.forEach(product => {
    if (product.id === productId) {
      matchingProduct=product;
    }
  });

  if(matchingProduct)
  {
      checkoutHtml+=`
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                   $${formatCurrenccy(matchingProduct.priceCents)}
         
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity:
                      <span class="quantity-label js-quantity-label-${matchingProduct.id}">${item.quantity}</span>
                      <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id} display-none" value=${item.quantity}>
                      <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id} display-none">Save</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity"  data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
  }
});

  //Display the cart quantity
  displayCartQuantity('.js-quantity-checkout');

   //get the product grid and append the product html into it
   let appendCheckoutTag=document.querySelector('.order-summary');
   appendCheckoutTag.innerHTML=checkoutHtml;      

   //Delete the cart items.
   //Add Event listener to all the Delete link
    const deleteQuantityLink=document.querySelectorAll('.js-delete-quantity');

    //Loops through each link
    deleteQuantityLink.forEach((deleteLink)=>{
          //Add event listener click
          deleteLink.addEventListener('click', (deleteItem)=>{
        
          //Get the productName through dataset here productId in the dom is from the data-product-Id.
          const deleteItemProductId=deleteLink.dataset.productId;
          
          //Calling 'removeCartItem' to remove the item
           removeCartItem(deleteItemProductId);

           //Display the cart quantity
           displayCartQuantity('.js-quantity-checkout');

          //remove the element from the dom
          let getCartContainer=document.querySelector(`.js-cart-item-container-${deleteItemProductId}`);
          getCartContainer.remove();
 
        });
      })
      

      //Add Event listener to all the update link
      const updateQuantityLink=document.querySelectorAll('.js-update-quantity-link');
      
      //loop through each link
      updateQuantityLink.forEach((updateQuantityLink)=>{
        //add click event
        updateQuantityLink.addEventListener('click',()=>{
        
          const updateLink=updateQuantityLink.dataset.productId;
          //Once update is click need to hide the quantity label and update link so adding class 'display-none' using classlist
         document.querySelector(`.js-quantity-label-${updateLink}`).classList.add('display-none');
         updateQuantityLink.classList.add('display-none');

          //show the Save and text box by removing class 'display-none' using classList
          document.querySelector(`.js-quantity-input-${updateLink}`).classList.remove('display-none');
          document.querySelector(`.js-save-quantity-link-${updateLink}`).classList.remove('display-none');
         
          //When click on Save button save the number 
          //Hide the Save and quantity Text box
          //Show the update link
          const saveQuantityLink=document.querySelector(`.js-save-quantity-link-${updateLink}`);
         saveQuantityLink.addEventListener('click', ()=>{

            //Save the quantity

            //Hide the quantity text box
            document.querySelector(`.js-quantity-input-${updateLink}`).classList.add('display-none');
         
            //Hide the Save lInk
            document.querySelector(`.js-save-quantity-link-${updateLink}`).classList.add('display-none');

            //show the quantity label

            document.querySelector(`.js-quantity-label-${updateLink}`).classList.remove('display-none');

            //Show the Update link
            updateQuantityLink.classList.remove('display-none');
          
         })
        
        })
      })
      
