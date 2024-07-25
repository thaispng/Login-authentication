"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import Input from "../_ui/Input"; 
import Button from "../_ui/Button"; 
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("Test@1234");
  const [errors, setErrors] = useState({ email: "", password: "" });
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
    <div className="flex w-full h-[100vh]">
      <div className="w-1/2">
        <div className="flex flex-col justify-center items-center h-full p-10">
          <form className="flex flex-col w-full p-10" onSubmit={handleSubmit}>
            <h1 className="text-primary text-1xl font-semibold">
              Entre na sua conta
            </h1>
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
            <div className="flex w-full">
              <Button fullWidth={true} text="Entrar" type="submit" />
            </div>
            <div>
              <div className="py-2">
                <a href="./Inicial" className="text-blue-400 text-sm">
                  Esqueceu a senha?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 h-full p-10 bg-orange-50">
        <div>
          <Image src="./logo.svg" width={400} height={200} alt="Logo" />
        </div>
      </div>
    </div>
  );
}
