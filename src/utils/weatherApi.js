export function getWeatherData({ latitude, longitude }, APIkey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
`).then(checkResponse);
}

export const filterWeatherData = (data) => {
  const result = {};

  result.city = data.name;
  result.temp = data.main.temp;
  result.type = getWeatherType(data.main.temp);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys);

  return result;
};

const isDay = ({ sunrise, sunset }) => {
  const timeNow = Math.floor(Date.now() / 1000);
  return timeNow > sunrise && timeNow < sunset;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};
