//@ts-check
/**
 * returns the max value of an array
 * @param {Array} array 
 * @param {Function} fn? 
 * @returns {any} t 
 */
function max(array, fn = a => a) {
    let max = array[0];
    array.forEach(element => {
        if (fn(element) > fn(max))
            max = element;
    });
    return max;
}

/**
 * Returns the minimum element of Array
 * @param {Array} array 
 * @param {Function} fn? based on certain map 
 * @returns {any} 
 */
function min(array, fn = a => a) {
    let min = array[0];
    array.forEach(element => {
        if (fn(element) < fn(min))
            min = element;
    });
    return min;
}
/**
 * sums of an Array
 * @param {Array} array 
 * @returns {Number} 
 */
function sum(array) {
    return array.reduce((accumulator, current) => accumulator += current);
}
/**
 * Returns an array without excluded element
 * @param {Array} array 
 * @param {any} excluded element to be excluded form the array
 * @returns {Array} 
 */
function exclude(array, excluded) {
    return array.filter(e => e !== excluded);
}
/**
 * ! not reliable when there's an object element 
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @returns {Boolean} 
 */
function unstable_isEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

/**
 * Return a count of how many element appears in an Array
 * @param {Array} array 
 * @param {any} element 
 * @returns {Number}
 */
function count(array, element) {
    let counter = 0;
    array.forEach(elem => {
        if (elem === element)
            counter++;
    });
    return counter;
}
/**
 * Shuffles array to random order
 * @param {Array} array 
 * @returns {Array}
 */
function shuffle(array) {
    let result = [...array];
    for (let i = result.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1)); 
        [ result[randomIndex] , result[i] ]  = [ result[i] , result[randomIndex] ];
    }
    return result;
}


module.exports.array = {
    max,
    min,
    sum,
    exclude,
    unstable_isEqual,
    count,
    shuffle
};