const statTitle = document.querySelectorAll('.stat__title');
const statTitleList = Array.from(statTitle);

const statCurrent = document.querySelectorAll('.stat__current');
const statCurrentList = Array.from(statCurrent);

const statPrevious = document.querySelectorAll('.stat__previous');
const statPreviousList = Array.from(statPrevious);

console.log(statTitleList[0].textContent);

fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  })
  .then(data =>
    data.forEach((item, i) => {
      statTitleList[i].textContent = item.title;
      statCurrentList[i].textContent = item.timeframes.monthly.current;
      statPreviousList[i].textContent = item.timeframes.monthly.previous;
    })
  )
  .catch(error => console.log(error));

// fetch('data.json')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP Error: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => console.log(data))
//   .catch(error => console.log(error));
