const statTitleList = Array.from(document.querySelectorAll('.dashboard__stats-activity'));

const statCurrentList = Array.from(document.querySelectorAll('.dashboard__stats-current'));

const statPreviousList = Array.from(document.querySelectorAll('.dashboard__stats-previous'));

const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');

let dashboardData = null;
function loadDashboardData() {
  return fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      dashboardData = data;
      return data;
    })
    .catch(error => console.log(error));
}

loadDashboardData().then(() => updateDashboard('weekly'));

function updateDashboard(period) {
  // Style Text
  dailyBtn.classList.toggle('white-text', period === 'daily');
  weeklyBtn.classList.toggle('white-text', period === 'weekly');
  monthlyBtn.classList.toggle('white-text', period === 'monthly');

  // Update stats shown
  dashboardData.forEach((item, i) => {
    statTitleList[i].textContent = item.title;

    statCurrentList[i].textContent = `${item.timeframes[period].current}hrs`;

    if (period === 'daily') {
      statPreviousList[i].textContent = `Yesterday - ${item.timeframes.daily.previous}hrs`;
    } else if (period === 'weekly') {
      statPreviousList[i].textContent = `Last Week - ${item.timeframes.weekly.previous}hrs`;
    } else if (period === 'monthly') {
      statPreviousList[i].textContent = `Last Month - ${item.timeframes.monthly.previous}hrs`;
    }
  });
}

dailyBtn.addEventListener('click', () => updateDashboard('daily'));
weeklyBtn.addEventListener('click', () => updateDashboard('weekly'));
monthlyBtn.addEventListener('click', () => updateDashboard('monthly'));
