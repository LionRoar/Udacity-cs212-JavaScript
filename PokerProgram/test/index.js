const poker = require("./poker.test");
const {
  testCardRank,
  testStraight,
  testFlush,
  testKind,
  testTwoPair,
  testPair,
  testHandRank,
  testPoker
} = poker;

const quiz = require("./quiz.test");
const { testDeal, handPercentage } = quiz;

function test(tests = ["poker", "quiz"]) {
  for (_t of tests) {
    let t = _t.toLowerCase();
    if (!test[t]) throw new TypeError(`The Test ${_t} doesn't exists.`);
    test[t].call();
  }
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
};

test.quiz = function TEST_Quiz() {
  console.log(testDeal());
  console.log(
    "Exhaustive test may take some while! Ctrl+C or CMD+C to terminate."
  );
  handPercentage();
};

let [node, path, ...args] = process.argv;
args = args.length === 0 ? undefined : args;
try {
  test(args);
} catch (err) {
  console.log(err.name + ": " + err.message);
}
