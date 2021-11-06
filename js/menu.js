const db = 'partners';

const renderItems = (data) => {
  data.forEach(element => {
    console.log(element);
  });
}

fetch(`https://test-f368b-default-rtdb.firebaseio.com/db/${db}.json`)
  .then(response => response.json())
  .then(data => {
    renderItems(data);
  });