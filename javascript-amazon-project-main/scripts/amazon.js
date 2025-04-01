import {cart,addToCart,displayCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';


let productHtml='';


products.forEach((product)=>{ 
        productHtml += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                   ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                </div>

                <div class="product-quantity-container">
                    <select class="js-product-quantity-dropdown-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>`;   
        });
        //get the product grid and append the product html into it
        let appendTag=document.querySelector('.products-grid');
        appendTag.innerHTML=productHtml;  

         //Get the quantity and display in UI
         displayCartQuantity('.js-cart-quantity');
   

        document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
            button.addEventListener('click',()=>{
                
                //Get the productName through dataset here productId in the dom is from the data-product-Id.
                const productId=button.dataset.productId;


                 // Get the selected quantity from the dropdown
                const dropdown = document.querySelector(`.js-product-quantity-dropdown-${productId}`);
                const selectedQuantity = Number(dropdown.value); // Get the current value 

                // Add the product to the cart
                addToCart(productId, selectedQuantity);
             
                //Get the quantity and display in UI
                displayCartQuantity('.js-cart-quantity');

               // Display Added message in the UI
                const getMessageContainer = document.querySelector(`.js-added-to-cart-${productId}`);
                getMessageContainer.classList.add('is-visible');

                // Set a timeout to clear the success message after 2 seconds
                const timeoutId = setTimeout(() => {
                    getMessageContainer.classList.remove('is-visible');
                }, 2000);
             
            })
        })