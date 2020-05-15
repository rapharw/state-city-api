# State-City-Api
CRUD Project with State and City information

## Config .env file
Create a file *.env* with the below values and then start your app:

```
APP_API_STATE=/states
APP_API_CITY=/cities
LOG_LEVEL=debug
SECRET=my-secret
```

## Installation and start app

After install node_modules (with YARN INSTALL or NPM INSTALL), run the application.

```bash
node app.js
```
or if you using nodemon
```bash
nodemon app.js
```

## Testing
You can use http://localhost:5000/ for testing local, or https://state-city-api.herokuapp.com/ to test deployed URL


## Endpoints

API State
${URL_DOMAIN}/states

API City
${URL_DOMAIN}/cities

Monitoring Health Check
${URL_DOMAIN}/status


## Tech Stack
Express

Express-Validator

Express-Status-Monitor

MongoDB (with Mongoose)

Helmet (security)


## Database
On the file ***database/Config.js***, use your database config. In this project, i'm using MLAB (https://mlab.com/) 


## Postman Request
https://www.getpostman.com/collections/7ecf56abeaeeb4258d73



## Circle CI and Heroku
This project using *Circle CI* to do a build/test/deploy. The file *.circleci/config.yml* is used to do the magic.

It is also using *Heroku* to publish our app. The file *.Procfile* is used to do the magic.

You can just ignore both files and start your app locally. 