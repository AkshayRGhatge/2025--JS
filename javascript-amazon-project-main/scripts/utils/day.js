import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; 

  export function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
  }

  export function todayDate()
  {
    const today=dayjs();
    return today;
  }

  export function addDate(currentDate,addDate)
  {
    const updatedDate=currentDate.add(addDate,'day');
    return updatedDate;
  }

 
export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = todayDate();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
      // This is a shortcut for:
      // remainingDays = remainingDays - 1;
    }
  }
}