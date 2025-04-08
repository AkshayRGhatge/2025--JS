//Named export
import {cart,removeCartItem,displayCartQuantity,cartItemUpdateQuantity,updateDeliveryOptionID} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOption.js';
import {renderPaymentSummary} from './paymentSummary.js';

//Default Export external js without curly bracket
//each file can have single export as default  file
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; 

export function renderOrderSummary()
{

  let checkoutHtml='';

  //loop through each cart items array
  cart.forEach(item => {

    //get the product ID 
  const productId=item.productId
  const matchingProduct=getProduct(productId)

    // get the delivery option id from the cart array 
    const deliveryOptionID= item.deliveryOptionsID;
    const deliveryOption=getDeliveryOption(deliveryOptionID)


    //Get today day
    const today=dayjs();

    //Add day in the today day
    const deliveryDate=today.add(deliveryOption.deliveryDays,'day');

    //format
    const deliveryDateFormat=deliveryDate.format('dddd, MMMM D');

    if(matchingProduct)
    {
        checkoutHtml+=`
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${deliveryDateFormat}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
          
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
                    ${deliveryOptionHtml(matchingProduct,item)}
                  </div>
                </div>
            </div>`;
      }
    });

    //Display the cart quantity
    displayCartQuantity('.js-quantity-checkout');
    
    //Function to generate the html for the delivery option 
    function deliveryOptionHtml(matchingProduct, cart){
      let html='';

      deliveryOptions.forEach((deliveryOption)=>{
        //Get today day
        const today=dayjs();

        //Add day in the today day
        const deliveryDate=today.add(deliveryOption.deliveryDays,'day');

        //format
        const deliveryDateFormat=deliveryDate.format('dddd, MMMM D');

        //get the price cents
        const getPriceCents=deliveryOption.priceCents;
        let displayPrice='';
        if(getPriceCents === 0)
        {
          displayPrice='FREE'
        }else{
          displayPrice=`$${formatCurrency(deliveryOption.priceCents)} -`;
        }

        //Get the radio button checked for the delivery option
        let isChecked=deliveryOption.id == cart.deliveryOptionsID ? 'checked' : '';

        html += `
        <div class="delivery-option js-delivery-option-input"
                      data-product-id="${matchingProduct.id}"
                      data-delivery-option-id="${deliveryOption.id}">
                      <input type="radio" ${isChecked}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${deliveryDateFormat}
                        </div>
                        <div class="delivery-option-price"> 
                          ${displayPrice} Shipping
                        </div>
                      </div>
                    </div>
        `
      });
      return html;
    }
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
            //update the payment summary
            renderPaymentSummary();
  
        });
    })
        

    //Add Event listener to all the update link
    const updateQuantityLink=document.querySelectorAll('.js-update-quantity-link');
        
    //loop through each link
    updateQuantityLink.forEach((updateQuantityLink)=>{
        //add click event
        updateQuantityLink.addEventListener('click',()=>{
        
        const updateLinkID=updateQuantityLink.dataset.productId;
    
        //Once update is click need to hide the quantity label and update link so adding class 'display-none' using classlist
        const displayQuantityLabel= document.querySelector(`.js-quantity-label-${updateLinkID}`);
        displayQuantityLabel.classList.add('display-none');
        updateQuantityLink.classList.add('display-none');

        //show the Save and text box by removing class 'display-none' using classList
        document.querySelector(`.js-quantity-input-${updateLinkID}`).classList.remove('display-none');
        document.querySelector(`.js-save-quantity-link-${updateLinkID}`).classList.remove('display-none');
        
        //When click on Save button save the number 
        //Hide the Save and quantity Text box
        //Show the update link
        const saveQuantityLink=document.querySelector(`.js-save-quantity-link-${updateLinkID}`);
        saveQuantityLink.addEventListener('click', ()=>{

            const getSelectedItemCartQuantity=document.querySelector(`.js-quantity-input-${updateLinkID}`).value;

            //Save the quantity
            cartItemUpdateQuantity(updateLinkID,Number(getSelectedItemCartQuantity));

        //Display the cart quantity
        displayCartQuantity('.js-quantity-checkout');
        displayQuantityLabel.innerHTML=Number(getSelectedItemCartQuantity);

            //Hide the quantity text box
            document.querySelector(`.js-quantity-input-${updateLinkID}`).classList.add('display-none');
        
            //Hide the Save lInk
            document.querySelector(`.js-save-quantity-link-${updateLinkID}`).classList.add('display-none');

            //show the quantity label

            document.querySelector(`.js-quantity-label-${updateLinkID}`).classList.remove('display-none');

            //Show the Update link
            updateQuantityLink.classList.remove('display-none');
            renderPaymentSummary();
        
        })
        
        })
    })

    //Add event listener 'click' to the radio button delivery option
    document.querySelectorAll('.js-delivery-option-input').
    forEach((element)=>{
        element.addEventListener('click',()=>{
            //get the data attributes product id and deliveryOption id.
        const {productId,deliveryOptionId}=element.dataset;
        //call the updateDeliveryOptionID to update the cart deliveryoption id
        updateDeliveryOptionID(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
        });
    });    
 }