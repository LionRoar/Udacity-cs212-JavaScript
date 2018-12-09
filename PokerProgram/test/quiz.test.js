const deal = require('../quiz').deal;
const handRank = require('../poker').test.handRank;
const assert = require('assert');

function testDeal() {
    assert(deal(2).length === 2);
    assert(deal(5).length === 5);
    assert(deal(3, 2)[0].length === 2);
    assert(deal(6, 1)[5].length === 1);

    return "testDealPass";
}

const HAND_NAMES = [
    '     High Card',
    '          Pair',
    '        2 Pair',
    '   3 of a Kind',
    '      Straight',
    '         Flush',
    '    Full House',
    '   4 of a Kind',
    'Straight Flush',
];

function handPercentage(n = 700 * 1000) {
    let counts = Array(9).fill(0);

    for (let i = 0; i < n / 10; i++) {
        for (let hand of deal(10)) {
            let ranking = handRank(hand)[0];
            counts[ranking] += 1;
        }
    }
    for (let i = counts.length - 1; i >= 0; i--)
        console.log("%s: %f %% ", HAND_NAMES[i],
            (100 * counts[i] / n).toFixed(5));
}


module.exports = {
    testDeal ,handPercentage
};

// console.log(testDeal());
// handPercentage();