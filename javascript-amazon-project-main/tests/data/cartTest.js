import {addToCart,cart,loadFromStorage } from "../../data/cart.js";



describe('Test Suite: addToCart',()=>{
    it('add an existing product in the cart',()=>{

         //mock localstorage object setItem method
         spyOn(localStorage, 'setItem');


        //mock localstorage object getItem method
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity:1,
                    deliveryOptionsID:'1'
                }
            ]);
        })

        //This was needed because we have mock the localstorage but it was loaded already when we have imported it 
        //We need to reload it again after mock
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        //Only works if we have mock setItem check if it called 1 time
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        //check the product id is in the cart
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
       
        //check added a 1 qunatity in the cart or not
        expect(cart[0].quantity).toEqual(2);

    })

    it('adds a new product to the cart',()=>{

        //mock localstorage object setItem method
        spyOn(localStorage, 'setItem');

        //mock localstorage object getItem method
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })

        //This was needed because we have mock the localstorage but it was loaded already when we have imported it 
        //We need to reload it again after mock
        loadFromStorage();
      
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        //Only works if we have mock setItem check if it called 1 time
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        //check the product id is in the cart
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
       
        //check added a 1 qunatity in the cart or not
        expect(cart[0].quantity).toEqual(1);

    });
})