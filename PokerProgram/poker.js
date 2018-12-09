// @ts-check

const {
    max,
    min,
    sum,
    exclude,
    count,
    unstable_isEqual
} = require('./helpers').array;

/**
 * Return a list of winning hands 
 * @param {Array} hands 
 * @returns {Array} 
 */
function poker(hands) {
    /* cSpell:disable */
    return allmax(hands, handRank);
}
/**
 * Return a list of all items equal ot the max if the iterable
 * @param {Array} iterable 
 * @param {function} keyFun
 * @returns {Array}
 */
function allmax(iterable, keyFun = a => a) {
    let result = [];
     let maxValue = null;
    for (let element of iterable) {
      let resolvedValue = keyFun(element);
      if (result.length === 0 || resolvedValue > maxValue)
        [result, maxValue] = [[element], resolvedValue];
      else if (unstable_isEqual(resolvedValue, maxValue)) result.push(element);
    }
    return result;
  }

/**
 * returns a { Number } indicating the raking of a hand
 * @param {Array} hand 
 * @returns {Array} rank of a hand
 */
/* after refactoring */

function handRank(hand) {
    const [counts , ranks ]= group(cardRank(hand));
    const isStraight = straight(ranks);
    const isFlush = flush(hand);
    const isEqual = unstable_isEqual;

    let result  = 0;
    return (result =
           isEqual(counts,[5])      ? 9
         : isStraight && isFlush    ? 8 
         : isEqual(counts , [4,1])  ? 7
         : isEqual(counts , [3,2])  ? 6
         : isFlush                  ? 5
         : isStraight               ? 4
         : isEqual(counts,[3,1,1])  ? 3
         : isEqual(counts,[2,2,1])  ? 2
         : isEqual(counts,[2,1,1,1])? 1 
         : 0 , [result , ranks]);
    
}

/* before refactor 
function handRank(hand) {
    let ranks = cardRank(hand);
    if (straight(ranks) && flush(hand))
        return [8, max(ranks)]; // 2,3,4,5,6 [8,6] < [8,10]
    else if (kind(4, ranks))
        return [7, kind(4, ranks), kind(1, ranks)];
    else if (fullHouse(ranks))
        return [6, kind(3, ranks), kind(2, ranks)];
    else if (flush(hand))
        return [5, ...ranks];
    else if (straight(ranks))
        return [4, max(ranks)];
    else if (kind(3, ranks))
        return [3, ...ranks];
    else if (two_pair(ranks)) {
        let mx = max(ranks);
        return [2, mx, kind(2, exclude(ranks, mx)), ...ranks];
    } else if (kind(2, ranks))
        return [1, kind(2, ranks), ...ranks];
    else return [0, ...ranks];
}
*/

function group(ranks){
    let holder = {}
    let result = [];
    ranks.forEach(e => {
        if(holder[e])
            holder[e]++;
        else holder[e] = 1;
    });

    // @ts-ignore
    let values = Object.values(holder);
    let keys = Object.keys(holder)
        .map(e => parseInt(e))
        .sort((a,b) => b-a);

    return [values , keys];
}


/**
 * 
 * @param {Array} hand 
 * @returns {Array} ranks sorted higher first
 */
function cardRank(hand) {
    let nonNumericalCards = {
        T: 10,
        J: 11,
        Q: 12,
        K: 13,
        A: 14
    };
    /* cSpell:disable */
    //'--23456789TJQKA'.indexOf('A')
    let ranks = hand.map(card => {
        let numerical = nonNumericalCards[card[0]];
        if (numerical)
            card = card.replace(card[0], numerical);
        return parseInt(card.replace(/[DCSH]/, ''))
    });

    ranks = ranks.sort((a, b) => b - a);

    if (unstable_isEqual(ranks, [14, 5, 4, 3, 2]))
        ranks = [5, 4, 3, 2, 1];
    return ranks;

}
/**
 * Return True if the ordered ranks form 5-card straight
 * @param {Array} ranks 
 * @returns {Boolean} 
 */
function straight(ranks) {
    return sum(ranks) - min(ranks) * 5 === 10;
}
/**
 * Return True if all the cards have the same suit
 * @param {Array} hand 
 * @returns {Boolean}
 */
function flush(hand) {
    let suit = hand[0][1];
    return hand.every(card => card[1] === suit);
}
/**
 * Return true if there's three of a kind with a pair.
 * @param {Array} ranks 
 * @returns {Boolean}
 */
function fullHouse(ranks) {
    const cards = new Set(ranks);
    return cards.size === 2;
}
/**
 * Return a rank that has exactly n of 
 * Return False if no n-of-a-kind in the hand
 * @param {Number} number 
 * @param {Array} ranks 
 * @returns {Number}
 */
function kind(number, ranks) {
    for (let r of ranks)
        if (count(ranks, r) === number) return r;
    return 0;
}
/**
 * Return if there's two pair in hand
 * @param {Array} ranks 
 * @returns {Array}
 */
function two_pair(ranks) {
    ranks
    let pair = kind(2, ranks);
    let filtered = ranks.filter((x) => x != pair);
    let low_pair = kind(2, filtered);
    if (pair && low_pair) return [pair, low_pair];
    return [];
}
/**
 * Return a number that's a pair in given rank list
 * @param {Array} ranks 
 * @returns {Number}
 */
function pair(ranks) {
    return kind(2, ranks);
}


module.exports = poker;

module.exports.test = {
    handRank,
    cardRank,
    straight,
    flush,
    kind,
    two_pair,
    pair,
    allmax
};