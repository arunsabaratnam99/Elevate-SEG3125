// BlackjackFunctionality.js

export const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
export const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Function to create and shuffle the deck
export const createDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return shuffleDeck(deck);
};

// Function to shuffle the deck
export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Function to calculate the value of a hand
export const calculateHandValue = (hand) => {
  let value = 0;
  let numAces = 0;

  for (let card of hand) {
    if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
      value += 10;
    } else if (card.value === 'A') {
      value += 11;
      numAces += 1;
    } else {
      value += parseInt(card.value);
    }
  }

  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces -= 1;
  }

  return value;
};

// Function to deal initial hands to player and dealer
export const dealInitialHands = (deck) => {
  const playerHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];
  return { playerHand, dealerHand, deck };
};

// Function to deal a card to a hand
export const dealCardToHand = (hand, deck) => {
  hand.push(deck.pop());
  return hand;
};

// Function to check the game outcome
export const checkOutcome = (playerHand, dealerHand) => {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  if (playerValue > 21) {
    return 'playerBust';
  } else if (dealerValue > 21) {
    return 'dealerBust';
  } else if (playerValue === 21 && playerHand.length === 2) {
    return 'blackjack';
  } else if (playerValue === dealerValue) {
    return 'push';
  } else if (playerValue > dealerValue) {
    return 'playerWins';
  } else {
    return 'dealerWins';
  }
};
