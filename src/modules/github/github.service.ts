import axios from "axios"

export class GithubService {
  static async getUser(accessToken: string) {
    const { data } = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return data
  }

  static async getPublicRepos(accessToken: string) {
    const { data } = await axios.get(
      "https://api.github.com/user/repos?visibility=public",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return data
  }
}
