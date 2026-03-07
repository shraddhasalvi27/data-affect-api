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

  //get all commits of that repo
  static async getCommits(accessToken: string, owner: string, repo: string, page?: string, perPage?: string) {
    const { data } = await axios.get(
      `https://api.github.com/user/repos/${owner}/${repo}/commits`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          page,
          per_page: perPage
        }
      }
    )
    return data;
  }

  //get all affected files in that commit
  static async getCommitFiles(
    accessToken: string,
    owner: string,
    repo: string,
    sha: string
  ) {
    const { data } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    return data.files
  }
  //get File content
  static async getFileContent(
    accessToken: string,
    path: string,
    ref: string,
    owner: string,
    repo: string
  ) {
    const { data } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          ref
        }
      }
    )

    const content = Buffer.from(data.content, "base64").toString("utf-8")

    return content
  }

}
