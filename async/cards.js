$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    async function getCard() {
      let data = await $.getJSON(`${baseURL}/new/draw/`);
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }

    getCard()
  
    async function getTwoCards() {
      let cardOneData = await $.getJSON(`${baseURL}/new/draw/`);
      let deckId = cardOneData.deck_id;
      let cardTwoData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
      [cardOneData, cardTwoData].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
    }

    getTwoCards()
  
    async function draw() {
      let $btn = $('button');
      let $cardArea = $('#card-area');
  
      let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
      $btn.show().on('click', async function() {
        let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
        let cardImg = cardData.cards[0].image;
        $cardArea.append(
          $('<img>', {
            src: cardImg,
          })
        );
        if (cardData.remaining === 0) $btn.remove();
      });
    }
    draw();
  });
  