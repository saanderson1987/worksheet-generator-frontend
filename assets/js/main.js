// Time to float

let timeToFloat = (min, sec) => {
  let float = sec / 60;
  return min + float;
};

let floatToTime = (float) => {
  let min = parseInt(float);
  let decimal = float - min;
  let sec = 60 * decimal; // 60*0.875 = 52.5 secs, should be 53 secs or 52:30
  return `${min}:${sec}`;
};

let findPace = (distance, time, interval) => {
  return time / (distance / interval);
};

let paceNum = findPace();
let paceTime = floatToTime(paceNum);
