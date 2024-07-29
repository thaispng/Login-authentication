import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginError {
  email?: string;
  password?: string;
}

export const useLogin = () => {
  const [error, setError] = useState<LoginError>({});
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`https://deploy-erckf9egd4d5hub6.eastus-01.azurewebsites.net/api/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/Inicial');
    } catch (err) {
      setError({
        email: "",
        password: "Invalid email or password"
      });
    }
  };

  return { error, login };
};
