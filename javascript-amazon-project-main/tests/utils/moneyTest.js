import {formatCurrency} from '../../scripts/utils/money.js';
//Describe is the test suite name 
describe('Test Suite: Format Currency',()=>{

    //it is the test 
    it('convert cents into dollars',()=>{

        //Expect: Calling the actual method and compare the value
        //Expect give us an object
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('round up to nearest cemt',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
})