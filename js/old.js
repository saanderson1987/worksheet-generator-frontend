let timeToFloat = (min, sec) => {
  let decimal = sec / 60;
  return min + decimal;
};

let floatToTimeStr = (float) => {
  let min = parseInt(float);
  let sec = Math.round((float - min) * 60);
  if (sec < 10) {
    sec = '0' + sec;
  }
  return `${min}:${sec}`;
};

let findPace = (time, interval) => {
  return floatToTimeStr(time / interval);
};

let goalTime;
let distanceInterval;
let mileIntervalText;

let getInput = () => {
  let distance = Number(document.querySelector('#distance').value);
  let min = Number(document.querySelector('#goal-min').value);
  let sec = Number(document.querySelector('#goal-sec').value);
  let mileIntervalEl = document.querySelector('#mile-interval');
  let mileInterval = Number(mileIntervalEl.value);
  goalTime = timeToFloat(min, sec);
  mileIntervalText = mileIntervalEl.options[mileIntervalEl.selectedIndex].text;
  distanceInterval = distance / mileInterval;
};

let form = document.querySelector('#form');
form.onsubmit = (event) => {
  event.preventDefault();
  getInput();
  let pace = findPace(goalTime, distanceInterval);
  document.querySelector('#pace-interval').textContent = `${mileIntervalText} mile pace: ${pace}`;
};
