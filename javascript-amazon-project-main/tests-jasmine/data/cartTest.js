import {addToCart,cart,loadFromStorage } from "../../data/cart.js";

describe('Test Suite: addToCart',()=>{
    it('adds a new product to the cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })

        //This was needed because we have mock the localstorage but it was loaded already when we have imported it 
        //We need to reload it again after mock
        loadFromStorage();
      
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
    });
})