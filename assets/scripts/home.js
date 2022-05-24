'use strict';

const accept = document.getElementById('accept');
const manage = document.getElementById('manage');
const save = document.getElementById('save');
const first = document.getElementById('one');
const second = document.getElementById('two');
const switch1 = document.getElementById('switch');
const switch2 = document.getElementById('switch1');
const switch3 = document.getElementById('switch2');
const switch4 = document.getElementById('switch3');


function getBrowserName(){

    let value = navigator.userAgent;
    if(value.match(/chrome/i)){
        return 'Chrome';
      }else if(value.match(/firefox/i)){
        return 'FireFox';
      }  else if(value.match(/safari/i)){
        return 'Safari';
      }else if(value.match(/opr\//i)){
        return 'Opera';
      } else if(value.match(/edg/i)){
        return 'edge';
      }else{
        return "No browser detection";
      }
}


function getOsName(){

    let value = navigator.userAgent;

    if(value.includes('Windows')){
        return 'Windows';
    }

    if(value.includes('Mac')){
        return 'Mac';
    }

    if(value.includes('Linux')){
        return 'Linux';
    }
}

function setCookie(name, value) {
    let limit = new Date();
    limit.setSeconds(limit.getSeconds() + 10);
    limit = limit.toUTCString();
  
    const options = {
      path: '/',
      SameSite: 'Lax',
      expires: limit
    };
    
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
}

function getCookieValueByName(name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : `Cookie ${name} not found`;
}

accept.addEventListener('click', () => {
    first.close();
    setCookie('browser', getBrowserName());
    setCookie('OS', getOsName());
    setCookie('screen_width', screen.width + 'px');
    setCookie('screen_height', screen.height + 'px');
    console.log(document.cookie);
});

manage.addEventListener('click', () => {
    first.close();
    second.showModal();
});

save.addEventListener('click', () => {
    second.close();
      if(switch1.checked === true){
        setCookie('browser', getBrowserName());
      }else{
        setCookie(switch1.name, 'Rejected');
      }
      if(switch2.checked === true){
        setCookie('OS', getOsName());
      }else{
        setCookie(switch2.name, 'Rejected');
      }
      if(switch3.checked === true){
        setCookie('screen_width', screen.width + 'px');
      }else{
        setCookie(switch3.name, 'Rejected');
      }
      if(switch4.checked === true){
        setCookie('screen_height', screen.height + 'px');
      }else{
        setCookie(switch4.name, 'Rejected');
      }
    console.log(document.cookie);
});

window.onload = () => {
    if(!document.cookie){
      first.showModal();
    }else if (document.cookie) {
        console.log(document.cookie);
    }
}
