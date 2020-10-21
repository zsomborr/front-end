import axios from "axios";

export default class DiscordService {
  constructor() {
    this.baseURL = "https://discord.com/api";
    this.authURL =
      `${this.baseURL}/oauth2/authorize` +
      `?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}` +
      `&redirect_uri=${process.env.REACT_APP_DISCORD_REDIRECT_URI}/settings/discord/auth` +
      "&response_type=token" +
      `&scope=${process.env.REACT_APP_DISCORD_SCOPES}` +
      "&prompt=none";
  }

  getUser(fragment) {
    const tokenType = fragment.get("token_type");
    const accessToken = fragment.get("access_token");

    return axios.get(`${this.baseURL}/users/@me`, {
      headers: { Authorization: `${tokenType} ${accessToken}` },
    });
  }
}
