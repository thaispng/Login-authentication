import { useState } from 'react';

export const useValidation = () => {
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = (email: string, password: string) => {
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
      !/[!@#$%^&*(),.?\":{}|<>]/.test(password)
    ) {
      passwordError =
        "Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.";
    }

    setErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  };

  return { errors, validate };
};
