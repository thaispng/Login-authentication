"use client";
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Input from './Input';
export default function Header() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-blue bg-gray-50">
      <div className="flex-1 flex justify-end gap-10">
      <Input
          label=""
          type="text"
          placeholder="Pesquise aqui..."
          value=""
          onChange={() => {}}
        />
        <h1 className='flex flex-row font-semibold text-lg justify-center items-center text-gray-50'>
          Nome do usuário
        </h1>
      </div>
     
    </header>
  );
}
