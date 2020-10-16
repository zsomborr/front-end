# Peer Mentoring App

The frontend repository of Codecool's IRL coding challenge's Peer Mentoring application.

## Technologies

- Axios v0.x
- Bootstrap v4
- [Noty](https://www.npmjs.com/package/noty) v3
- React v16
  - [React Bootstrap](https://www.npmjs.com/package/react-bootstrap) v1
  - [React Autosuggest](https://github.com/moroshko/react-autosuggest) v10
  - [React Multi Select Component](https://www.npmjs.com/package/react-multi-select-component) v3
  - [React Time Ago](https://www.npmjs.com/package/react-time-ago) v6
  - [React Toggle](https://www.npmjs.com/package/react-toggle) v4
  - [React Stars](https://www.npmjs.com/package/react-stars) v2

## Setup

### Discord

- [Create a new](https://discord.com/developers/applications) Application

### Development

- Install Node.js packages

```sh
$ npm i
```

- Make a copy from `.env.example` with name `.env`
- Update the `REACT_APP_DISCORD_CLIENT_ID` value to match Your newly created Discord app's ID
- Add `http://localhost:3000/settings/discord/auth` to the Discord's app **Redirects** list
- Start Java Spring Boot back-end
- Start React app in development mode

```sh
$ npm start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Heroku

- Create an app
- Go to `Settings` > `Config vars`
- Add new environment variables
  - `REACT_APP_API_BASE_URL`: pointing to the server (**without trailing slash**)
  - `REACT_APP_DISCORD_CLIENT_ID`: the app's ID from https://discord.com/developers/applications
  - `REACT_APP_DISCORD_REDIRECT_URI`: the URL where Discord will redirect after successful authentication
  - `REACT_APP_DISCORD_SCOPES`: set to `identify email`
- Add Buildpack:

```
https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz
```

- Add the `REACT_APP_DISCORD_REDIRECT_URI` + `/settings/discord/auth` value to the Discord's app **Redirects** list
