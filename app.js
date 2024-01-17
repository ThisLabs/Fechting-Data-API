const url = 'https://fakestoreapi.com/products';

const displayData = (data) => {
  console.log(data);

  const tbody = document.querySelector('tbody');

  tbody.innerHTML = '';

  if (data.length > 0) {
    data.forEach((item) => {
      const row = document.createElement('tr');

      const cells = ['id', 'title', 'price', 'description', 'category'];
      cells.forEach((cell) => {
        const td = document.createElement('td');
        td.textContent = item[cell];
        row.appendChild(td);
      });

      const imageElement = document.createElement('img');
      imageElement.src = item.image;
      const imageCell = document.createElement('td');
      imageCell.appendChild(imageElement);
      row.appendChild(imageCell);

      const ratingCell = document.createElement('td');
      ratingCell.textContent = item.rating.rate || '3.9';
      row.appendChild(ratingCell);

      const countCell = document.createElement('td');
      countCell.textContent = item.rating.count;
      row.appendChild(countCell);

      // Menambahkan baris ke dalam tbody
      tbody.appendChild(row);
    });
  } else {
    console.error('Data is empty');
  }
};

// function fetchData(url) {
//   fetch(url)
//     .then(async (response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const responseJson = await response.json();
//       displayData(responseJson);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
// fetchData(url);

// // getApiData(url)
// //   .then((data) => {
// //     console.log(data);
// //   })
// //   .catch((error) => {
// //     console.log(error);
// //   });

function fetchDataWithXMLHttpRequest(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let responseData = JSON.parse(xhr.responseText);
          displayData(responseData);
          // resolve(responseData);
        } else {
          reject(new Error(`HTTP error! Status: ${xhr.status}`));
        }
      }
    };

    xhr.open('GET', url, true);
    xhr.send();
  });
}

fetchDataWithXMLHttpRequest(url);
