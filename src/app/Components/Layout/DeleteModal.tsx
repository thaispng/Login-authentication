import React from 'react';
import { X } from 'lucide-react';
interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, onClose, onDelete }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
            <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Excluir pedido</h2>
        <p className="mb-6">Você realmente deseja excluir o pedido? Essa ação não poderá ser desfeita</p>
        <div className="flex justify-between">
          <button
            className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
            onClick={onDelete}
          >
            Sim, excluir
          </button>
          <button
            className="bg-transparent text-orange-600 py-2 px-4 rounded hover:text-orange-700"
            onClick={onClose}
          >
            Não excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
