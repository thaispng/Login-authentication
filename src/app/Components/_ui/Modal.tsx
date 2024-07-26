import React, { useState, useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import Button from './Button';
import Input from './Input';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Formato de e-mail inválido';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    setEmailError(validateEmail(value));
  };

  const isEmailRegistered = async (email: string): Promise<boolean> => {
    const registeredEmails = ['email1@gmail.com', 'email2@gmail.com'];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(registeredEmails.includes(email));
      }, 1000);
    });
  };

  const handleSendClick = async () => {
    if (!emailError) {
      const isRegistered = await isEmailRegistered(inputValue);
      if (isRegistered) {
        onClose();
        setTimeout(() => {
          setIsConfirmationOpen(true);
        }, 300);
      } else {
        setEmailError('E-mail inválido. Este endereço de e-mail não está cadastrado no sistema, verifique e tente novamente.');
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
      setEmailError('');
    }
  }, [isOpen]);

  const handleBackClick = () => {
    onClose(); 
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full sm:max-w-md sm:h-auto md:max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <ChevronLeft className="block sm:hidden cursor-pointer" onClick={handleBackClick} />
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
              <button onClick={onClose} className="hidden sm:block text-gray-500 hover:text-gray-700">
                <X />
              </button>
            </div>
            <div className="mb-4">
              <p className="mb-2">Para recuperar sua senha, digite o e-mail cadastrado.</p>
              <Input
                label="E-mail*"
                type="text"
                placeholder="email@gmail.com"
                value={inputValue}
                onChange={handleInputChange}
              />
              {emailError && <span className="text-red-500">{emailError}</span>}
            </div>
            <div className="text-center">
              <Button fullWidth text="Enviar" onClick={handleSendClick} />
            </div>
          </div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full sm:max-w-md sm:h-auto md:max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <ChevronLeft className="block sm:hidden cursor-pointer" onClick={handleBackClick} />
                <h2 className="text-xl font-semibold">Recuperar senha</h2>
              </div>
              <button onClick={() => setIsConfirmationOpen(false)} className="hidden sm:block text-gray-500 hover:text-gray-700">
                <X />
              </button>
            </div>
            <div className="mb-4">
              <p>Enviamos um link de recuperação para o seu e-mail cadastrado. Por favor, verifique a sua caixa de entrada e a pasta de spam, se necessário.</p>
            </div>
            <div className="text-center">
              <Button fullWidth text="Entendido" onClick={() => setIsConfirmationOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
