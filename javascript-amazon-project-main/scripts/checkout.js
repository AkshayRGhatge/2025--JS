import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {renderOrderSummary}  from './checkout/orderSummary.js'
import {renderPaymentSummary}  from './checkout/paymentSummary.js'
import { loadProducts,loadProductsFetch } from '../data/products.js';
import {loadCart} from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js'

/*
//Promise
// Create a new Promise object
new Promise((resolve)=>{
    // Call the loadProducts function and pass a callback function to it.
    // loadProducts is an asynchronous function that loads product data from the backend.
    // Once loadProducts is done, it will call the callback function we passed.
    loadProducts(()=>{ 

         // This code runs AFTER products are loaded.
         // We're calling resolve() to say "the Promise is complete now."
        resolve();
     });
    
})  // Once the Promise is resolved, we move on to the 'then' block
.then(()=>{

     // This code runs only after products are successfully loaded
     // Each function below is for rendering the checkout page UI
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})

*/

/*
new Promise((resolve)=>{
    // Call the loadProducts function and pass a callback function to it.
    // loadProducts is an asynchronous function that loads product data from the backend.
    // Once loadProducts is done, it will call the callback function we passed.
    loadProducts(()=>{ 

         // This code runs AFTER products are loaded.
         // We're calling resolve() to say "the Promise is complete now."
        resolve('value1');  // pass parameter to then 
     });

    
})  // Once the Promise is resolved, we move on to the 'then' block
.then((value)=>{
    console.log(value);
    return new Promise((resolve)=>{
        loadCart(()=>{
          resolve());
        });
    })
  
})
.then(()=>{

     // This code runs only after products and carts are successfully loaded
     // Each function below is for rendering the checkout page UI
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})
*/

//Async operation make a function return promise
// Asynchronous function to load page data and render UI components
async function loadPage() {
  
    try{
        // Wait for the products to be fetched from the backend
        // loadProductsFetch returns a Promise
        await loadProductsFetch(); // Allows writing async code like synchronous code, improves readability

        // Wait for the cart data to be loaded using a callback-based function (wrapped in a Promise).
        //reject create an error in future
        await new Promise((resolve,reject) => {
            // loadCart uses a callback, so we wrap it in a Promise to use 'await'
            loadCart(() => {
                //reject('error');
            resolve(); // Resolve the Promise when cart loading is complete
            });
        });
    } catch(error)
    {
        console.log('Error occurred. please try again later')
    }

  // Once both products and cart are loaded, render the UI sections
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage()

/*
//Promise.all let you run multiple asynchronous code
//within array it takes promise
Promise.all([
   loadProductsFetch(),

  new Promise((resolve)=>{
        loadCart(()=>{
         resolve();
        });
    })
]).then(()=>{
    renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
})
*/

/*
loadProducts(()=>{  

    loadCart(()=>{
        console.log("LoadProduct and load cart finish")
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    })         

});
*/
