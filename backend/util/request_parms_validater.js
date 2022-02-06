module.exports = function (items, body) {
  if (Array.isArray(items)) {
    for (const item of items) {
      if (body[item] === undefined) return true;
    }
    return false;
  } else {
    return true;
  }
};
