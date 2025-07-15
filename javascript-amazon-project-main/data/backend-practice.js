/// send HTTP request use XMLHttpRequest(); build in class to send a request backend
//create new http message/request
const xhr=new XMLHttpRequest();
xhr.open('GET','https://supersimplebackend.dev');// open takes 2 parameters: 1 param: what type of http request we have to send :GET,POST,PUT,DELETE, 2. param where to send message
//need to aad event listener first before sending request
xhr.addEventListener('load',()=>{
    console.log(xhr.response);
})
xhr.send();
