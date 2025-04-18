import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart } from "../../data/cart.js";

describe('Test Suite: renderOrderSummary',() =>{
    it('displays the cart',()=>{

        document.querySelector('.js-test-container').innerHTML=
        `
        <div class="js-order-summary"></div> 
        `;

        const productId1='15b6fc6f-327a-4ec4-896f-486349e85a3d';
        const productId2='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
         //mock localstorage object getItem method
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity:1,
                    deliveryOptionsID: '1'
                },
                {
                    productId: productId2,
                    quantity:2,
                    deliveryOptionsID: '2'
                }  
            ]);
        })

        //This was needed because we have mock the localstorage but it was loaded already when we have imported it 
        //We need to reload it again after mock
        loadFromStorage();

        renderOrderSummary();
        
        //check in the dom if we have 2 cart items
        //Note:   document.querySelectorAll('.js-cart-item-container') return the array of an object need to use length
        expect(
            document.querySelectorAll('.js-cart-item-container').length 
        ).toEqual(2);

        //Chec the product quantity
        expect(
            document.querySelector(`.js-quantity-label-${productId1}`).innerText
        ).toEqual('1');

        expect(
            document.querySelector(`.js-quantity-label-${productId2}`).innerText
        ).toEqual('2');

        //remove the element from the DOM
        document.querySelector('.js-test-container').innerHTML='';

    })

    it('delete the item',()=>{

         //mock localstorage object setItem method
         spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML=`
        <div class="js-order-summary"></div>
        <div class="js-checkout-header"></div>
        <div class="js-payment-summary"></div>
        `;

        const productId1='15b6fc6f-327a-4ec4-896f-486349e85a3d';
        const productId2='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
         //mock localstorage object getItem method
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity:1,
                    deliveryOptionsID: '1'
                },
                {
                    productId: productId2,
                    quantity:2,
                    deliveryOptionsID: '2'
                }  
            ]);
        })

        //This was needed because we have mock the localstorage but it was loaded already when we have imported it 
        //We need to reload it again after mock
        loadFromStorage();

        renderOrderSummary();

        //delete the first item
        document.querySelector(`.js-delete-link-${productId1}`).click();

        //Expect length to be 1
        expect(
            document.querySelectorAll('.js-cart-item-container').length 
        ).toEqual(1);

        //Expect element not in the dom
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

         //Expect element2 present in the dom
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        //Expect cart have 1 item check length
        expect(
           cart.length
        ).toEqual(1);

          //Expect cart have 1 item check length
          expect(
            cart[0].productId
         ).toEqual(productId2);
         
         //remove the element from the DOM
         document.querySelector('.js-test-container').innerHTML='';

    })
})