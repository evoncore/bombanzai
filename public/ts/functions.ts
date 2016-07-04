
function slicePixels(obj) {
  return Number(obj.length == 5 ? obj.slice(0,3) : obj.slice(0,2));
}