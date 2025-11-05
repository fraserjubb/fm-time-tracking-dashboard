const statTitleList = Array.from(
  document.querySelectorAll('.dashboard__stats-activity')
);

const statCurrentList = Array.from(
  document.querySelectorAll('.dashboard__stats-current')
);

const statPreviousList = Array.from(
  document.querySelectorAll('.dashboard__stats-previous')
);

const dailyTxt = document.querySelector('#daily');
const weeklyTxt = document.querySelector('#weekly');
const monthlyTxt = document.querySelector('#monthly');

function getDailyData() {
  // Style Text
  weeklyTxt.classList.remove('white-text');
  monthlyTxt.classList.remove('white-text');
  dailyTxt.classList.add('white-text');

  // Fetch data
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
        statCurrentList[i].textContent = `${item.timeframes.daily.current}hrs`;
        statPreviousList[
          i
        ].textContent = `Yesterday - ${item.timeframes.daily.previous}hrs`;
      })
    )
    .catch(error => console.log(error));
}

function getWeeklyData() {
  // Style Text
  dailyTxt.classList.remove('white-text');
  monthlyTxt.classList.remove('white-text');
  weeklyTxt.classList.add('white-text');

  // Fetch data
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

function getMonthlyData() {
  // Style Text
  dailyTxt.classList.remove('white-text');
  weeklyTxt.classList.remove('white-text');
  monthlyTxt.classList.add('white-text');

  // Fetch data
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
        statCurrentList[
          i
        ].textContent = `${item.timeframes.monthly.current}hrs`;
        statPreviousList[
          i
        ].textContent = `Last Month - ${item.timeframes.monthly.previous}hrs`;
      })
    )
    .catch(error => console.log(error));
}

dailyTxt.addEventListener('click', getDailyData);
weeklyTxt.addEventListener('click', getWeeklyData);
monthlyTxt.addEventListener('click', getMonthlyData);

// fetch('data.json')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP Error: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => console.log(data))
//   .catch(error => console.log(error));
