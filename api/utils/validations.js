module.exports.isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch(error) {
    return false;
  }
}

module.exports.isAccepted = (value) => {
  return value === true;
}