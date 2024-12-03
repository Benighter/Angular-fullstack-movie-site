# FilmsphereA

A full-stack movie site built with Angular and Node.js.

## Table of Contents

- [FilmsphereA](#filmspherea)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Features](#features)
  - [Dependencies](#dependencies)
  - [Usage](#usage)

## Getting Started

To get started with FilmsphereA, follow these steps:

1. Clone the repository: `git clone https://github.com/Benighter/FilmsphereA.git`
2. Install dependencies: `npm install`
3. Start the backend server: `node server.js`
4. Start the frontend development server: `ng serve`

## Backend

The backend is built with Node.js and Express. It provides RESTful APIs for user authentication and movie data.

* [User Controller](FilmsphereA/backend/controllers/userController.js)
* [User Routes](FilmsphereA/backend/routes/userRoutes.js)

## Frontend

The frontend is built with Angular. It provides a user interface for users to interact with the app.

* [App Component](FilmsphereA/frontend/src/app/app.component.ts)
* [Login Component](FilmsphereA/frontend/src/app/components/login/login.component.ts)

## Features

* User authentication
* Movie data retrieval
* User interface for movie browsing and searching

## Dependencies

* Angular
* Node.js
* Express
* MongoDB (for data storage)

## Usage

To use FilmsphereA, follow these steps:

1. Register for an account or log in to an existing account
2. Browse or search for movies
3. View movie details and ratings
