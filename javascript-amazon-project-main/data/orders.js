import {displayCartQuantity} from '../data/cart.js';
import { formatCurrency } from '../scripts/utils/money.js';
import {getProduct,loadProductsFetch} from '../data/products.js';

export const orders=JSON.parse(localStorage.getItem('orders')) || [];  //default value if stoage empty 

export function addOrders(order)
{
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrdersFromStorage(){
    return JSON.parse(localStorage.getItem('orders'));
}

export function moveOrdertoPastHistory(){
    localStorage.setItem('pastOrders', JSON.stringify(orders));
}

//Function to render the order summary
document.addEventListener('DOMContentLoaded', async() => {
  displayCartQuantity('.js-order-cart-quantity');

    await loadProductsFetch(); // Wait for products to load


let orderGridSection='';
//Get teh order details from the local storage
let orderDetails=getOrdersFromStorage()
//If order details exist then loop through each order
//and render the order details
if(orderDetails && orderDetails.length > 0)
{

    orderDetails.forEach((order) => {

        let orderTime = new Date(order.orderTime).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric'
                        });
        //Create the order grid section
        orderGridSection+=`<div class="order-container">
                            <div class="order-header">
                                <div class="order-header-left-section">
                                    <div class="order-date">
                                        <div class="order-header-label">Order Placed:</div>
                                        <div class="js-order-date">${orderTime}
                                        </div>
                                    </div>
                                    <div class="order-total">
                                        <div class="order-header-label">Total:</div>
                                        <div class="js-order-total">$${formatCurrency(order.totalCostCents)}</div>
                                    </div>
                                </div>

                                <div class="order-header-right-section">
                                    <div class="order-header-label js-order-id">Order ID:</div>
                                    <div>${order.id}</div>
                                </div>
                            </div>
                        `;
        //Loop through each product in the order and create the order details grid
        //If the order has products then loop through each product
        order.products.forEach((product) => {
            let getProductID= product.productId;
            let getQuantity=product.quantity;
            let getEstimateDeliveryDate=new Date(product.estimatedDeliveryTime).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric'
                        });
            let matchingProduct= getProduct(getProductID);
  
            if(matchingProduct)
            {   
                console.log('matchingProduct invoke')
                orderGridSection += `
                        <div class="order-details-grid">
                            <div class="product-image-container ">
                                <img src="${matchingProduct.image}">
                            </div>

                            <div class="product-details">
                                <div class="product-name">
                                ${matchingProduct.name}
                                </div>
                                <div class="product-delivery-date">
                                Arriving on: ${getEstimateDeliveryDate}
                                </div>
                                <div class="product-quantity js-order-product-quantity">
                                Quantity: ${getQuantity}
                                </div>
                                <button class="buy-again-button button-primary">
                                <img class="buy-again-icon" src="images/icons/buy-again.png">
                                <span class="buy-again-message">Buy it again</span>
                                </button>
                            </div>

                            <div class="product-actions">
                                <a href="tracking.html">
                                <button class="track-package-button button-secondary">
                                    Track package
                                </button>
                                </a>
                            </div>
                        </div>
                        </div>
                    `;
            }

        });  
    });
}

//Get the order grid section and render it in the order grid section
let getOrderGridData=document.querySelector('.js-order-grid');
getOrderGridData.innerHTML=orderGridSection;

});

