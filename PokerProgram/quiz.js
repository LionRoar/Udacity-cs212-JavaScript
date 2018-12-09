/**
 * //TODO write a function called `deal` that deal out some hands
 * //TODO `deal` function takes number of hands an number of cards for each hand
 */

const shuffle = require('./helpers').array.shuffle;

/**
 * Deals out hands list
 * @param {Number} numberOfHands 
 * @param {Number} numberOfCards? 
 * @returns {Array}
 */
function deal(numberOfHands = 0, numberOfCards = 5) {

    let deck = shuffle(getDeck());
    let hands = [];
    for (let i = 0; i < numberOfHands; i++) {
        let hand = deck.filter((e, j) => (i * numberOfCards) <= j && j < numberOfCards + (i * numberOfCards));
        hands.push(hand);
    }
    return hands;
}
/**
 * Return an ordered deck of 52 card * (number of decks)
 * @param {Number} numberOfDecks?
 * @returns {Array}
 */
function getDeck(numberOfDecks = 1) {
    /* cSpell:disable */
    let ranks = '23456789TJQKA';
    let suits = 'SHDC';
    let deck = [];

    for (let d = 0; d < numberOfDecks; d++)
        for (let r of ranks)
            for (let s of suits)
                deck.push(`${r}${s}`);
    return deck;
}

module.exports.deal = deal;