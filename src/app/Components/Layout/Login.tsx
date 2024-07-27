"use client";
import { useState } from "react";
import { useValidation } from '../../../hooks/useValidation';
import { useLogin } from '../../../hooks/useLogin';
import Input from "../_ui/Input"; 
import Button from "../_ui/Button"; 
import Image from "next/image";
import Modal from "../_ui/Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { errors, validate } = useValidation();
  const { message, login } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate(email, password)) {
      login(email, password);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full h-[100vh] lg:w-1/2 p-10 lg:bg-white">
        <div className="w-full max-w-md">
            <Image src="/logo.svg" width={200} height={100} alt="Logo" className="mx-auto mb-6 lg:hidden" />
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <Input
              label="Email*"
              type="text"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Input
              label="Senha*"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <div className="flex w-full mb-4">
              <Button fullWidth={true} text="Entrar" type="submit" />
            </div>
            <div className="flex text-center w-full justify-start">
              <a href="#" className="text-blue-400 text-sm" onClick={() => setIsModalOpen(true)}>
                Esqueceu a senha?
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full p-10 bg-orange-50">
        <Image src="./logo.svg" width={400} height={200} alt="Logo" />
      </div>
      {message && <p className="text-red-500">{message}</p>}
      <Modal title="Recuperar Senha" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
