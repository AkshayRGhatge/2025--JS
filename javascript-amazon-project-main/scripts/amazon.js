import {addToCart,displayCartQuantity} from '../data/cart.js';
import {products, loadProducts,loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';


 loadProductsFetch().then(()=>{
    renderProductGrid();
 });

 //need to group html code into function and pass it to the loadProducts function
 //Reason since loadProducts is asynchronous will not wait for the response, need to pass the html function to it so it can load the data
 //once the response is received
 function renderProductGrid(){

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
                            src="${product.getStarsUrl()}">
                            <div class="product-rating-count link-primary">
                            ${product.rating.count}
                            </div>
                        </div>

                        <div class="product-price">
                        ${product.getPrice()}
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
                    
                        ${product.extraInfoHTML()}

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
               

                // Add the product to the cart
                addToCart(productId);
             
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
 }


       