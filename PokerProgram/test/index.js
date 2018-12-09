const poker = require('./poker.test');
const {
    testCardRank,testStraight,testFlush,testKind,
    testTwoPair,testPair,
    testHandRank,testPoker
} = poker;

const quiz = require('./quiz.test');
const { testDeal, handPercentage} = quiz;

function test(tests = ['poker','quiz']){
    for(t of tests)
        test[t].call();
}
test.poker = function TEST_Poker() {
    console.log(testCardRank());
    console.log(testStraight());
    console.log(testFlush());
    console.log(testKind());
    console.log(testTwoPair());
    console.log(testPair());
    console.log(testHandRank());
    console.log(testPoker());
}

test.quiz = function TEST_Quiz() {
  console.log(testDeal());
  handPercentage();
}