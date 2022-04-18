# Weather App

This is a simple REST-based service to retrieve information about the weather in different cities.



## About the Project

This service makes use of data from [Open Weather](https://openweathermap.org/). 

It allows a user to:
- Get a list of the available cities around a specified latitude/longitude within a radius of 10 kilometers
- Retrieve the details for a city based on its Id
- Retrieve the weather data for a city based on its Id

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` There was a problem with the request (security, malformed)permissions to access the requested resource
- `404` `Not Found` An attempt was made to access an endpoint or resource that does not exist
- `500` `Server Error` An error on the server occurred

## Getting Started

### Dependencies

This project uses [Express.js](https://expressjs.com/). It has the following dependencies:

- [Node.js](https://nodejs.org/en/download)
- [TypeScript](https://www.typescriptlang.org/) 

### Third party Services

- [Docker](https://www.docker.com) for containerization of application.
- [Open Weather](https://openweathermap.org/) for weather data


### Installation & Usage
You can get the app running locally in the following way:
- Clone the repository `$ git clone https://github.com/ibkadeeko/weather-app.git`.
- Change into the directory `$ cd weather-app`.
- Get the List of available cities [here](http://bulk.openweathermap.org/sample/city.list.json.gz) and save to a file in the base directory with the name `city.list.json`

- Get the Open Weather API Key [here](https://home.openweathermap.org/api_keys)

- Create a `.env` file from `.env.example` and set your local `.env.` variable(s).

##### Without Docker
- Use `$ npm install` to install all required dependencies.
- Start app with `$ yarn build && yarn start`.

##### With Docker
- Make sure docker is installed on your machine and running.
- Run `docker-compose up` to start the app

### Running Tests
The tests are written using Supertest, Mocha and Chai.

##### Without Docker
- Run `$ npm test` from the root folder.

##### With Docker
- Run `docker-compose -f docker-compose.test.yml up` to test

## _API Endpoints_

| Endpoint                                     |              Functionality               | HTTP method |
| -------------------------------------------- | :--------------------------------------: | ----------: |
| /cities?lat={latitude}&lng={longitude}       |     Get list of cities around point      |        GET  |
| /cities/_id_                                 |               Get a city                 |        GET  |
| /cities/_id_/weather                         |     Get the weather data for a city      |        GET  |
