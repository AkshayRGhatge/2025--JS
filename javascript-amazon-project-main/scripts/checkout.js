import {cart,removeCartItem} from '../data/cart.js';
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
                      Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
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
          removeCartItem(deleteItemProductId)

            //remove the element from the dom
            let getCartContainer=document.querySelector(`.js-cart-item-container-${deleteItemProductId}`);
            getCartContainer.remove();

        });
      })

      
