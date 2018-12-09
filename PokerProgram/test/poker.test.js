const assert = require('assert');
const poker = require('../poker');

const {
    handRank,
    cardRank,
    straight,
    flush,
    kind,
    two_pair,
    pair
} = poker.test;


const {
    unstable_isEqual
} = require('../helpers').array;


const assertArrayEqual =
    (arr1, arr2, msg) =>
    assert(unstable_isEqual(arr1, arr2), msg);

let split = s => String.prototype.split.call(s, /\s/);
//test case for poker program
let sf = split("6C 7C 8C 9C TC"); //straight flush 
let fk = split("9D 9H 9S 9C 7D"); //four of a kind
let fh = split("TD TC TH 7C 7D"); //full-house
let tp = split("5S 5D 9H 9C 6S"); //two-pair
let s1 = split("AS 2S 3S 4S 5C"); // A - 5 straight
let s2 = split("2C 3C 4C 5C 6C"); // 2 - 6 straight
let ah = split("AS 2S 3S 4S 6S") // A high
let sh = split("2S 3S 4S 6C 7D"); // 7 high
let op = split("2S 2D 3H 9S 5C"); // one-pair
/* cSpell:disable */
let fkrank = [9, 9, 9, 9, 7]; //four of a kind rank


function testCardRank() {
    assertArrayEqual(cardRank(sf), [10, 9, 8, 7, 6]);
    assertArrayEqual(cardRank(fk), [9, 9, 9, 9, 7]);
    assertArrayEqual(cardRank(fh), [10, 10, 10, 7, 7]);
    assertArrayEqual(cardRank(s1), [5, 4, 3, 2, 1]);
    assertArrayEqual(cardRank(s2), [6, 5, 4, 3, 2]);
    return "testCardRankPass";
}

function testStraight() {
    assert(straight([9, 8, 7, 6, 5]) === true);
    assert(straight([9, 8, 8, 6, 5]) === false);
    assert(straight(cardRank(s1)) === true);
    assert(straight(cardRank(s2)) === true);
    return "testStraightPass";

}

function testFlush() {
    assert(flush(sf) === true);
    assert(flush(fk) === false);
    return "testFlushPass";
}

function testKind() {
    assert(kind(4, fkrank) === 9);
    assert(kind(3, fkrank) === 0);
    assert(kind(2, fkrank) === 0);
    assert(kind(1, fkrank) === 7);
    return "testKindPass";
}

function testTwoPair() {
    assertArrayEqual(two_pair(cardRank(fk)) , []);
    assertArrayEqual(two_pair(cardRank(tp)), [9, 5]);
    return "testTwoPairPass";
}

function testPair() {
    assert(pair(cardRank(op)) === 2);
    assert(pair(cardRank(s2)) === 0);
    return "testPairPass";
}

function testHandRank() {

    handRank(fh)//?
    assertArrayEqual(handRank(sf), [8,[10,9,8,7,6]]);
    assertArrayEqual(handRank(fk), [0 , [9, 7]]);
    assertArrayEqual(handRank(fh), [0,[10, 7]]);
    return "testHandRank pass"
}

function testPoker() {
    assertArrayEqual(poker([sf, fk, fh]), [sf]);
    assertArrayEqual(poker([fk, fh]), [fk]);
    assertArrayEqual(poker([fh, fh]), [fh, fh]); //extreme value
    assertArrayEqual(poker([sf]), [sf]); //extreme value
    assertArrayEqual(poker([s1, s2, ah, sh]), [s2]);
    return "testPoker pass";
}

module.exports = {
    testCardRank,testStraight,testFlush,testKind,
    testTwoPair,testPair,
    testHandRank,testPoker
};

//   console.log(testCardRank());
//   console.log(testStraight());
//   console.log(testFlush());
//   console.log(testKind());
//   console.log(testTwoPair());
//   console.log(testPair());
//   console.log(testHandRank());
//   console.log(testPoker());