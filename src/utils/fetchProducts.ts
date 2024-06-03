async function fetchProductsExtarnally() {
  try {
    const response = await fetch('https://freetestapi.com/api/v1/birds', {
      method: 'get'
    })
    const data = await response.json();    
    return data
  } catch (err) {
    console.error(err);
  }
}

export default fetchProductsExtarnally;
