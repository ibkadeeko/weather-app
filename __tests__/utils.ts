import nock from 'nock';

export const nockOpenWeatherAPI = (id: string) =>
  nock('https://api.openweathermap.org')
    .get(`/data/2.5/weather?id=${id}&appid=${process.env.OPEN_WEATHER_API_KEY}`)
    .reply(200, {
      id: id,
      coord: {
        lon: 8.4647,
        lat: 49.4883,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      base: 'stations',
      main: {
        temp: 279.7,
        feels_like: 278.49,
        temp_min: 277.7,
        temp_max: 281.38,
        pressure: 1019,
        humidity: 59,
      },
      visibility: 10000,
      wind: {
        speed: 1.83,
        deg: 105,
        gust: 6.61,
      },
      clouds: {
        all: 0,
      },
      dt: 1650242680,
      sys: {
        type: 2,
        id: 45705,
        country: 'DE',
        sunrise: 1650256101,
        sunset: 1650306136,
      },
      timezone: 7200,
      name: 'Mannheim',
      cod: 200,
    });
