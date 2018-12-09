//@ts-check
function permutations(string) {
  let result = [];
  permutationsHelper(string.split(''), "", result);
  return result;
}

function permutationsHelper(stringArray, chosen, result) {
  //if/else Base-Case

  if (stringArray.length <= 0) {
    result.push(chosen);
    return;
  }
  for (let i in stringArray) {
    // choose
    let char = stringArray[i];
    chosen += char
    stringArray.splice(i,1);

    // explore
    permutationsHelper(stringArray, chosen, result);

    // un-choose
    stringArray.splice(i, 0, char);
    chosen = chosen.substr(0 , chosen.length-1);
  }
}

module.exports = permutations;

