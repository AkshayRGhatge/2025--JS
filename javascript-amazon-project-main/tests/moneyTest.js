import {formatCurrency} from '../scripts/utils/money.js';

console.log("Test Suite: Format Currency");

console.log('convert cents into dollar');
if(formatCurrency(2500) === '25.00')
{
    console.log('Passed');
}
else
{
    console.log('Failed');
}

console.log('works with 0');
if(formatCurrency(0) === '0.00')
    {
        console.log('Passed');
    }
    else
    {
        console.log('Failed');
    }