async function getResponseOrError(response) {
  try {
    return [await response(), null];
  } catch (e) {
    return [null, e];
  }
}

module.exports = getResponseOrError;
