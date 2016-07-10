
function returnValue(value) {
  return {
    v: value
  }
}

function findArrayValue(array, value) {
  if (array.indexOf) {
    return array.indexOf(value);
  }

  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) return i;
  }

  return -1;
}

function slicePixels(obj) {
  return Number(obj.length == 5 ? obj.slice(0,3) : obj.slice(0,2));
}