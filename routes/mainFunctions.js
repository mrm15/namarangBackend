async function normalizeData(arrayOfObjects) {


  arrayOfObjects.forEach(v => {
    delete v['__v'];
    v['id'] = v['_id']
    delete v['_id']
  })
}

module.exports = {normalizeData};
