# Phonebook

In this exercise, we created a simple phonebook.

In this phonebook, users have the possibility to a add, update & delete a person as well as its phone number. Person's names are unique, which means that users cannot add names that already exist in the phonebook. A search field is also available in the app to filter the people by their name.

This initial state of the application is stored in a file db.json, which correspond to a list of users along with their numbers. This file is used by the tool JSON Server that acts as a backend server where the data are stored.

## Start the application

To start an application, do the following :

```bash

# Install dependencies
yarn install

# Start the JSON Server
yarn run server

# On another terminal, start the application
yarn start

```

You can then access the app on : <http://localhost:3000> \
You can also see the content of the JSON Server by heading to <http://localhost:3001/persons> \
You can also see the [API Documentation](https://documenter.getpostman.com/view/19259497/UyxdLV1p#b89783bc-c09b-48da-8def-3703e8b62f53) of this app.
