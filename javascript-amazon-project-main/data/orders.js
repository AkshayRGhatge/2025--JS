export const orders=JSON.parse(localStorage.getItem('orders')) || [];  //default value if stoage empty 

export function addOrders(order)
{
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}