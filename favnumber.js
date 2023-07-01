let favNumber = 3;
let baseURL = "http://numbersapi.com";

async function favNum() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data);
}
favNum();

const favNumbers = [7, 3, 1];
async function pluralFavNum() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  console.log(data);
}
pluralFavNum();

async function fourFunFacts() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
fourFunFacts();
