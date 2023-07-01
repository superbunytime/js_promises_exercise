let favNumber = 3;
let baseURL = "http://numbersapi.com";

$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data);
});

let favNumbers = [7, 3, 1];
$.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
  console.log(data);
});

Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(facts => {
  facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});
