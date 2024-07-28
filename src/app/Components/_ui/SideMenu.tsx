"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { House, Box, Boxes, FileBox, Users, GraduationCap, ArrowLeft, LogOut } from 'lucide-react';

const SideMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed inset-y-0 left-0 ${isOpen ? 'w-64' : 'w-20'} bg-container-white text-white z-40 transition-all duration-300`}>
      <div className="flex items-center justify-between px-4 py-4">
        <Image src="/Logotrajetonb 2.svg" width={50} height={50} alt="Logo" />
      </div>
      <nav className="flex flex-col gap-5 mt-4 p-2">
        <a href="#" className="flex items-center px-4 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
          <House className={`mr-2 ${isOpen ? 'text-base' : 'text-xl'}`} />
          {isOpen && <span>Home</span>}
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
          <Box className={`mr-2 ${isOpen ? 'text-base' : 'text-xl'}`} />
          {isOpen && <span>Estoque</span>}
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
          <Boxes className={`mr-2 ${isOpen ? 'text-base' : 'text-xl'}`} />
          {isOpen && <span>Categoria</span>}
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
          <GraduationCap className={`mr-2 ${isOpen ? 'text-base' : 'text-xl'}`} />
          {isOpen && <span>Escolas</span>}
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
          <FileBox className={`mr-2 ${isOpen ? 'text-base' : 'text-xl'}`} />
          {isOpen && <span>Gestão de pedidos</span>}
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
          <Users className={`mr-2 ${isOpen ? 'text-base' : 'text-xl'}`} />
          {isOpen && <span>Usuários</span>}
        </a>
        <a onClick={toggleMenu} className="cursor-pointer flex items-center px-4 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
          <ArrowLeft className={`mr-2 ${isOpen ? 'text-base' : 'text-xl'}`} />
          {isOpen && <span>Recolher</span>}
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-base text-gray-600 font-medium hover:bg-gray-100 rounded-md focus:text-orange-600 focus:bg-gray-100">
          <LogOut className={`mr-2 ${isOpen ? 'text-base' : 'text-xl'}`} />
          {isOpen && <span>Sair</span>}
        </a>
      </nav>
    </div>
  );
};

export default SideMenu;
