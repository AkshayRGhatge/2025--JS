import {getProduct, loadProductsFetch} from '../data/products.js';
import {getOrdersFromStorage} from '../data/orders.js';
import { displayCartQuantity } from '../data/cart.js';  

//Url parameter https://abc.com?orderid=122 here orderid=122  is parameters
      
//generate obj
const url=new URL(window.location.href);  //get the url
//url.searchParams.get('orderId');  //get the parameter from url 
let productId=url.searchParams.get('productId');
let orderId=url.searchParams.get('orderId');

 let appendOrderTrackingSection=``;
let estimatedDeliveryTime = '';
loadProductsFetch().then(()=>{

    let orderdetails=getOrdersFromStorage();
    if(orderdetails)
    {
 
    // Find the order by orderId
    let getOrderDetails = orderdetails.find(order => order.id === orderId);
    // Find the product in the order by productId
    let getProductDetails = getOrderDetails
      ? getOrderDetails.products.find(product => product.productId === productId)
      : null;
          console.log("getProductDetails "+ JSON.stringify(getProductDetails, null, 2))
    
         if(getProductDetails)
         {

                estimatedDeliveryTime = new Date(getProductDetails.estimatedDeliveryTime).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                }).replace(' ', ', ');
           
        }


    }

    let matchingProduct= getProduct(productId);
    console.log(matchingProduct);
    if(matchingProduct)
    {

         appendOrderTrackingSection=`
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            Arriving on ${estimatedDeliveryTime}
            </div>

            <div class="product-info">
                ${matchingProduct.name}
            </div>

            <div class="product-info">
            Quantity: ${matchingProduct.quantity}
            </div>

            <img class="product-image" src="${matchingProduct.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
        </div>
      `;
    }
    else
    {
        console.error('Product not found');
    }
    let getSectionID=document.querySelector('.js-main-tracking');
    getSectionID.innerHTML=appendOrderTrackingSection;

    //Display the cart quantity in the header
   
    displayCartQuantity('.js-tracking-cart-quantity');
    
   
})


