import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5267/api/auth/login', { email, password });
      setMessage(response.data.message);
      router.push('/Inicial');
    } catch (error) {
      setMessage('Invalid email or password');
    }
  };

  return { message, login };
};
