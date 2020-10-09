# Peer Mentoring App

The frontend repository of Codecool's IRL coding challenge's Peer Mentoring application.

## Technologies

- React v16
- Axios v0.x
- Bootstrap v4
  - React Bootstrap v1.x
- [React Autosuggest](https://github.com/moroshko/react-autosuggest) v10
- [React Multi Select Component](https://www.npmjs.com/package/react-multi-select-component) v3
- [React Time Ago](https://www.npmjs.com/package/react-time-ago) v6
- [React Toggle](https://www.npmjs.com/package/react-toggle) v4

## Setup

### Development

- Install Node.js packages

```sh
$ npm i
```

- Make a copy from `.env.example` with name `.env`
- Start Java Spring Boot back-end
- Start React app in development mode

```sh
$ npm start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Heroku

- Create an app
- Go to Settings > Config vars
- Add a new environment variable with name `REACT_APP_API_BASE_URL` pointing
  to the server (**without trailing slash**)
