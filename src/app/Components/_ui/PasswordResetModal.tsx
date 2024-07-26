import React from 'react';

const PasswordResetMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col border border-gray-900 p-5 rounded-md max-w-sm">
          <h2 className="text-2xl text-primary mb-4">Olá,</h2>
          <p className="mb-4 text-primary">Redefina sua senha de acesso clicando no link abaixo.</p>
          <a
            href="./RedefinirSenha"
            className="text-blue-500 hover:text-blue-700 underline break-all"
          >
            https://trajetonbdchabvuyhbyavrbvyubvryhv.senha
          </a>
          <p className="text-red-500 mt-4">O link expira em 24 horas</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetMessage;
