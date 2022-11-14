# Part 3

In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.

## Requirements

- [x] Node
- [x] Yarn

## Setting up the Project

There is one application by folder, to start an application :

- Using Node:

```bash

# Head to the desired folder (phonebook)
cd phonebook

# Install the dependencies
npm install

# create a .env file and put there the MONGODB_URI for connecting to your mongodb database
echo "MONGODB_URI=<YOUR-MONGODB-URI>" > .env

# Start the application
npm run dev

```

- Using Yarn:

```bash

# Head to the desired folder (phonebook)
cd phonebook

# Install the dependencies
yarn install

# create a .env file and put there the MONGODB_URI for connecting to your mongodb database
echo "MONGODB_URI=<YOUR-MONGODB-URI>" > .env

# Start the application
yarn run dev

```

You can then access the app on : <http://localhost:3000/>
