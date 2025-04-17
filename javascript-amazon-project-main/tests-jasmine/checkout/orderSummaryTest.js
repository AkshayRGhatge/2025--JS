import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage } from "../../data/cart.js";

describe('Test Suite: renderOrderSummary',() =>{
    it('displays the cart',()=>{

        document.querySelector('.js-test-container').innerHTML=`
        <div class="js-order-summary"></div>`;

         //mock localstorage object getItem method
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity:1,
                    deliveryOptionsID: '1'
                },
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
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

    })
})