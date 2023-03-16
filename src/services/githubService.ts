// use axios as http client

import axios from 'axios';
import { githubConfig } from '../config/services';
import { GithubUser } from '../types/github';

export const githubClient = axios.create({
  baseURL: githubConfig.apiUrl,
  headers: {
    Authorization: `Bearer ${githubConfig.apiKey}`,
  },
});

export const getUserProfile = async (
  username: string,
): Promise<GithubUser | null> => {
  const response = await githubClient
    .get(`/users/${username}`)
    .catch((e) => ({ data: null }));
  return response.data;
};
