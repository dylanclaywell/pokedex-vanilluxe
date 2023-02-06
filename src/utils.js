function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

function chunkArray(array, numberPerChunk) {
  const results = []
  for (let i = 0; i < array.length; i += numberPerChunk) {
    results.push(array.slice(i, i + numberPerChunk))
  }
  return results
}
