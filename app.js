const statTitleList = Array.from(
  document.querySelectorAll('.dashboard__stats-activity')
);

const statCurrentList = Array.from(
  document.querySelectorAll('.dashboard__stats-current')
);

const statPreviousList = Array.from(
  document.querySelectorAll('.dashboard__stats-previous')
);

const weekly = document.querySelector('#weekly');

function getWeeklyData() {
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
        statCurrentList[i].textContent = `${item.timeframes.weekly.current}hrs`;
        statPreviousList[
          i
        ].textContent = `Last Week - ${item.timeframes.weekly.previous}hrs`;
      })
    )
    .catch(error => console.log(error));
}

weekly.addEventListener('click', getWeeklyData);

// fetch('data.json')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP Error: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => console.log(data))
//   .catch(error => console.log(error));
