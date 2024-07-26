"use client";
import Image from "next/image";
import { useState } from "react";
import Input from "../_ui/Input";
import Button from "../_ui/Button";

export default function RedefinirSenha() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const validate = () => {
    let passwordError = "";
    let confirmPasswordError = "";

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

    if (confirmPassword !== password) {
      confirmPasswordError = "As senhas não coincidem.";
    }

    if (passwordError || confirmPasswordError) {
      setErrors({ password: passwordError, confirmPassword: confirmPasswordError });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      console.log("Senha redefinida para:", password);
    }
  };

  return (
    <div className="flex w-full min-h-screen justify-center p-4">
      <div className="flex flex-col justify-center items-center w-full max-w-md gap-8">
        <div>
          <Image src="/logo.svg" width={200} height={200} alt="Logo" />
        </div>
        <div className="flex flex-col bg-secondary w-full p-10 rounded-lg gap-5">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="flex justify-center w-full text-primary text-2xl font-bold">
              Redefinir Senha
            </h1>
            <p className="flex justify-center text-sm w-full">
              Redefina sua senha com no mínimo 8 caracteres
            </p>
          </div>
          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <Input
              label="Senha*"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <Input
              label="Confirme a senha*"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />
            <div className="flex w-full">
              <Button text="Redefinir Senha" fullWidth={true} type="submit" />
            </div>
          </form>
          <div className="flex flex-col w-full">
            <h1 className="text-base font-medium pb-5">
              Crie uma senha segura
            </h1>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use letras maiúsculas e minúsculas, símbolos e números;</li>
              <li>Não use informações pessoais como datas de aniversários;</li>
              <li>Não use uma senha igual a anterior;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
