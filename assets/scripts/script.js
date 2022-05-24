'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoibW91cmlidXMiLCJhIjoiY2wxd2lkZmh1MDB5dzNlc2pxdTgwcTQ4YyJ9.8AQnsSGfZv0nvk48pylE7Q';

const form = document.getElementById('registration');
const $firstName = document.getElementById('first-name');
const $lastName = document.getElementById('last-name');
const $age = document.getElementById('age');
const $email = document.getElementById('email');
const $submit = document.getElementById('submit');
const msgSub = document.getElementById('submit-message');
const msgE = document.getElementById('msg-email');
const msgF = document.getElementById('msg-name');
const msgL = document.getElementById('msg-last');
const msgA = document.getElementById('msg-age');
const emailPattern = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;


// The 'success' callback function
function showLocation(position) {
  // const longitude = position.coords.longitude;
  // const latitude = position.coords.latitude;
  // Object destructuring
  const { longitude, latitude } = position.coords;

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 15 // starting zoom
  });

  console.log(`Longitude: ${longitude}`);
  console.log(`Latitude: ${latitude}`);
}

// The 'failure' callback function
function errorHandler() {
  console.log('Nope');
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showLocation, errorHandler);
} else {
  console.log('Geolocation is not supported by your browser');
}




submit.addEventListener('click', () => {
  let firstName = $firstName.value.trim();
  let lastName = $lastName.value.trim();
  let age = $age.value.trim();
  let email = $email.value.trim();

  let messagef = '';
  let messagel = '';
  let messagea = '';
  let messagee = '';

  let valid = true;
  let count = 0;

  if (firstName === '') {
    msgF.innerText = 'First name is required'
    valid = false;
    count++;
  } else if (isNaN(firstName) === false) {
    msgF.innerText = 'First name can not include a number'
  }

  if (lastName === '') {
    msgL.innerText = 'last name is required'
    valid = false;
    count++;
  } else if (isNaN(lastName) === false) {
    msgL.innerText = 'Last name can not include a number'
  }

  if (age === '') {
    msgA.innerText = 'age is required'
    count++;
  } else {
    let ageInt = parseInt(age);
    if (isNaN(age) || (ageInt < 16 || ageInt > 120)) {
      msgA.innerText = 'Age is not valid'
      valid = false;
    }
  }

  if (email === '') {
    msgE.innerText = 'email is required'
    valid = false;
    count++;
  } else {
    if (!emailPattern.test(email)) {
      msgE.innerText = 'email is not valid'
      valid = false;
    }
  }
  if (count === 4) {
    msgL.innerText = '';
    msgF.innerText = '';
    msgA.innerText = '';
    msgE.innerText = '';
    msgSub.innerText = 'All fields are required!';
  } else if (count === 0) {
    form.reset();
    msgSub.innerText = 'Thank you!';
    msgL.innerText = '';
    msgF.innerText = '';
    msgA.innerText = '';
    msgE.innerText = '';
  }
});