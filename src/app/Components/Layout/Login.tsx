"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import Input from "../_ui/Input"; 
import Button from "../_ui/Button"; 
import Image from "next/image";
import Modal from "../_ui/Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "O email é obrigatório.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      emailError = "E-mail inválido. Insira um endereço de e-mail no formato correto.";
    }

    if (!password) {
      passwordError = "A senha é obrigatória.";
    } else if (
      password.length < 8 ||
      password.length > 32 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      passwordError =
        "Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      console.log("Entrar com email:", email, "e senha:", password);
      router.push('/Inicial'); 
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
      <Modal title="Recuperar Senha" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
