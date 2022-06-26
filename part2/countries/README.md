# Countries

In this exercise, we created an application, in which one can look at data of various countries. The data are fetched from the API <https://restcountries.com>, that provides a lot data for different countries in a machine readable format, a so-called REST API. \
The user interface is very simple. The country to be shown is found by typing a search query into the search field.
In this application, it is also possible to see the current weather in the country's capital.

## Start the application

To start an application, do the following :

```bash

# Install dependencies
yarn install

# create a .env file and put there the API KEY for retrieving data from https://weatherstack.com/
$ echo "REACT_APP_API_KEY=<YOUR-API-KEY>" > .env

# On another terminal, start the application
yarn start

```

You can then access the app on : <http://localhost:3000> \
You can also see the [API Documentation](https://documenter.getpostman.com/view/19259497/UyxdLV1p#d0e78a87-9b4b-4819-8c8d-e3d3c4ecc3be) of this app.
