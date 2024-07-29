"use client";
import { useState } from "react";
import { useLogin } from '../../../hooks/useLogin';
import Input from "../_ui/Input"; 
import Button from "../_ui/Button"; 
import Image from "next/image";
import Modal from "../_ui/Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { error, login } = useLogin();
  const [validationError, setValidationError] = useState({ email: "", password: "" });

  const validateEmail = (email: string) => {
    if (!email) {
      setValidationError(prev => ({ ...prev, email: "O campo de e-mail é obrigatório." }));
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Z|a-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setValidationError(prev => ({ ...prev, email: "E-mail inválido. Insira um e-mail no formato correto." }));
      return false;
    }
    setValidationError(prev => ({ ...prev, email: "" }));
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setValidationError(prev => ({ ...prev, password: "O campo de senha é obrigatório." }));
      return false;
    }
    if (password.length < 8 || password.length > 32) {
      setValidationError(prev => ({ ...prev, password: "Senha inválida. A senha deve ter entre 8 e 32 caracteres." }));
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,32}$/;
    if (!passwordRegex.test(password)) {
      setValidationError(prev => ({ ...prev, password: "Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúscula, minúscula, números e caracteres especial (@,#$, etc..)." }));
      return false;
    }
    setValidationError(prev => ({ ...prev, password: "" }));
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      login(email, password);
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
              error={validationError.email || error.email || ""}
            />
            <Input
              label="Senha*"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={validationError.password || error.password || ""}
            />
            <div className="flex w-full mb-4">
              <Button fullWidth={true} text="Entrar" type="submit" size="medium" hideIconOnMobile={true} />
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
      <Modal title="Recuperar Senha" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
