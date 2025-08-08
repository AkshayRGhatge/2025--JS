import {displayCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {cart,removeAllCartItems} from '../../data/cart.js';
import {getDeliveryOption} from '../../data/deliveryOption.js';
import {formatCurrency} from '../utils/money.js';
import { addOrders } from '../../data/orders.js';



export function renderPaymentSummary()
{

 let paymentSummaryHtml='';

 paymentSummaryHtml=
    `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items <span class="js-display-cart-item"></span>:</div>
            <div class="payment-summary-money js-item-payment"></div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-item-delivery-fees"></div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-total-before-tax"></div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money js-total-tax"></div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-total-price"></div>
          </div>

          <button class="place-order-button button-primary js-order-button js-place-order js-place-order-disable-button">
            Place your order
          </button>
    `

    //Apend the html to the dom
    let appendPaymentSummary=document.querySelector('.js-payment-summary')
    appendPaymentSummary.innerHTML=paymentSummaryHtml;

    // Disable the button if cart is empty
    if (cart.length === 0) {
      const placeYourOrderButton = document.querySelector('.js-place-order-disable-button');
  
        placeYourOrderButton.disabled = true;
        placeYourOrderButton.classList.add('disabled');
    }
    else
    {
        let placeOrder=document.querySelector('.js-place-order')
        placeOrder.addEventListener('click',async ()=>{
          try
          {
              const response=await fetch('https://supersimplebackend.dev/orders',
                {
                  method:'POST',  
                  headers:{                                           
                    'Content-Type': 'application/json' //type of data we are sending
                  },
                  body:JSON.stringify({           //actual data we are sending need to convert it into json
                    cart: cart 
                  })
                })

              const order= await response.json();
              addOrders(order);
              removeAllCartItems(); //Remove all the cart items after placing the order

              //console.log(order);

          } 
          catch(error)
          {   
            console.log('Unexpected error occurred try again later.')
          }

          window.location.href='orders.html';
        });
    }

    //display the total item  in the cart beside Items
    displayCartQuantity('.js-display-cart-item');


    let totalItemPrice=0;
    let totalDeliveryOptionPrice=0;

    //loop through each cart to get the priceCents of the item
    cart.forEach((item)=>{

        //get the product ID 
        const productId=item.productId;

        //Find the match product id in the product JS reason to get the item pricecents
        let matchingCartProduct=getProduct(productId);

         //If match found 
         if(matchingCartProduct)   
         {
            let productQuantity=item.quantity;
            let productPriceCents=Number(matchingCartProduct.priceCents);

            //product quantity * price     
            totalItemPrice += productQuantity * productPriceCents;
            
         }
         
         //Now get the deliveryOption ID from the cart Array to loop through delivery Option to get the priceCents
        const deliveryOptionID= item.deliveryOptionsID;
        const deliveryOption=getDeliveryOption(deliveryOptionID);
         
         
        if(deliveryOption)
        {
            totalDeliveryOptionPrice += deliveryOption.priceCents 
        }

    })

    //Display the items price
    let placeHolderItemMoney=document.querySelector(".js-item-payment");
    placeHolderItemMoney.innerHTML='$'+ formatCurrency(totalItemPrice);

    //Display the handling Fees
    let placeHolderDeliveryFees=document.querySelector(".js-item-delivery-fees")
    placeHolderDeliveryFees.innerHTML='$'+ formatCurrency(totalDeliveryOptionPrice);

    //Get the total of the Item price + deliveryFees
    let itemPriceWithDelivery=totalItemPrice+totalDeliveryOptionPrice

    //Display the total money before tax
    let displayTotalBeforeTax=document.querySelector(".js-total-before-tax");
    displayTotalBeforeTax.innerHTML='$'+ formatCurrency(itemPriceWithDelivery);

    //Display the tax
    let calculateTax=taxCalculator(itemPriceWithDelivery);

    let displayTotalTax=document.querySelector(".js-total-tax");
    displayTotalTax.innerHTML='$'+ formatCurrency(calculateTax);

    //Display Total which is item price including deliveryfees + tax
    let totalPrice=itemPriceWithDelivery + calculateTax;

    let displayTotalPrice=document.querySelector(".js-total-price");
    displayTotalPrice.innerHTML='$'+ formatCurrency(totalPrice);

    //Function to calculate the tax
    function taxCalculator(priceCents)
    {
        let totatPaymentIncludingTax=(priceCents * 10)/100
        return totatPaymentIncludingTax;

    }

}

