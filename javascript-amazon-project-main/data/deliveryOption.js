//The function purpose is to loop through deliveryoption array and find the delivery item and return
export function getDeliveryOption(deliveryOptionID){
    let deliveryOption;
    //loop through the delivery option array
    deliveryOptions.forEach((option)=>{
        //check the delivery option id matches with the cart delivery id
        if(option.id==deliveryOptionID)
        {
          deliveryOption=option;
        }
      })
      //Make the first item as default
      return deliveryOption || deliveryOption[0];
}

export const deliveryOptions=[
{
    id: '1',
    deliveryDays: 7,
    priceCents:0

},
{
    id: '2',
    deliveryDays: 3,
    priceCents:499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents:999
}]