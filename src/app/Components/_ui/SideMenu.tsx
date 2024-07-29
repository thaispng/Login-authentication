"use client"

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { House, Box, Boxes, FileBox, Users, GraduationCap, ArrowLeft, LogOut } from 'lucide-react';
import clsx from 'clsx';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const menuItems = useMemo(() => [
    { href: '#', icon: House, label: 'Home' },
    { href: '#', icon: Box, label: 'Estoque' },
    { href: '#', icon: Boxes, label: 'Categoria' },
    { href: '#', icon: GraduationCap, label: 'Escolas' },
    { href: '#', icon: FileBox, label: 'Gestão de pedidos' },
    { href: '#', icon: Users, label: 'Usuários' },
    { href: '#', icon: LogOut, label: 'Sair' },
  ], []);

  return (
    <div className={`inset-y-0 left-0 ${isOpen ? 'w-64' : 'w-20'} bg-container-white text-white z-40 transition-width duration-300 select-none whitespace-nowrap`}>
      <div className="flex items-center justify-between px-3 py-4">
        <Image src="/Logotrajetonb 2.svg" width={50} height={50} alt="Logo" />
      </div>
      <nav className="flex flex-col gap-5 mt-4 p-2">
        {menuItems.map(({ href, icon: Icon, label }) => (
          <a key={label} href={href} className="flex items-center px-3 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
            <Icon className="mr-2 text-base transition-all flex-none" />
            <span className={clsx('transition-all', isOpen ? 'opacity-100': 'opacity-0')}>{label}</span>
          </a>
        ))}
        <span onClick={toggleMenu} className="cursor-pointer flex items-center px-3 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
          <ArrowLeft className="mr-2 text-base" />
          {isOpen && <span>Recolher</span>}
        </span>
      </nav>
    </div>
  );
};

export default SideMenu;
