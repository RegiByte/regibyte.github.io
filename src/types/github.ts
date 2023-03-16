export interface GithubUser {
  login: string;
  name: string;
  organizations_url: string;
  public_gists: number;

  public_repos: number;
  repos_url: string;
  url: string;
  id: number;
  node_id: string;
  gravatar_id: string;
  avatar_url: string;
  bio: string;
  collaborators: number;
  company: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
}
