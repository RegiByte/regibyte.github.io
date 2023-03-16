import { getUserProfile } from '../../../services/githubService';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { GithubUser } from '../../../types/github';

interface UseGithubForm {
  username: string;
  setUsername: React.Dispatch<string>;
  user: GithubUser | null;
  setUser: React.Dispatch<GithubUser | null>;
  error: string | null;
  setError: React.Dispatch<string | null>;
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
  handleSubmit: (e: FormEvent) => Promise<void>;
}

export function useGithubForm(initialUsername: string = ''): UseGithubForm {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GithubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await getUserProfile(username);
      setUser(user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    getUserProfile('RegiByte').then((user) => {
      setUser(user);
    })
  }, [])

  return {
    username,
    setUsername,
    user,
    setUser,
    error,
    setError,
    loading,
    setLoading,
    handleSubmit,
  };
}
