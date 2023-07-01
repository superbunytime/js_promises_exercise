$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    $.getJSON(`${baseURL}/new/draw/`).then(data => {
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  
    let cardOne = null;
    $.getJSON(`${baseURL}/new/draw/`)
      .then(data => {
        cardOne = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw/`);
      })
      .then(data => {
        let cardTwo = data.cards[0];
        [cardOne, cardTwo].forEach(function(card) {
          console.log(
            `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
          );
        });
      });
  
    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');
  
    $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
      deckId = data.deck_id;
      $btn.show();
    });
  
    $btn.on('click', function() {
      $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
        let cardImg = data.cards[0].image;
        $cardArea.append(
          $('<img>', {
            src: cardImg,
          })
        );
        if (data.remaining === 0) $btn.remove();
      });
    });
  });
  