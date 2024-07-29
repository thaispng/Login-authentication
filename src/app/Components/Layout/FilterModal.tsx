import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void; 
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [customDateRange, setCustomDateRange] = useState({ from: '', to: '' });
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); 
    }
  }, [isOpen]);

  const applyFilters = () => {
    const filters = {
      date: dateFilter,
      customDateRange,
      status: statusFilter,
    };
    onApplyFilters(filters);
    onClose();
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isOpen ? 'animate-fade-in' : 'animate-fade-out'}`}>
      <div
        className={`fixed top-0 right-0 h-full bg-white rounded-lg p-6 w-96 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button className="text-gray-400 float-right" onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Filtro</h2>

        <div className="mb-4">
          <h3 className="text-lg mb-2 font-semibold">Por data</h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center text-lg font-medium">
              <input type="radio" name="date" className="mr-2" onChange={() => setDateFilter('Todos')} /> Todos
            </label>
            <label className="flex items-center text-lg font-medium">
              <input type="radio" name="date" className="mr-2" onChange={() => setDateFilter('7dias')} /> até 7 dias
            </label>
            <label className="flex items-center text-lg font-medium">
              <input type="radio" name="date" className="mr-2" onChange={() => setDateFilter('15dias')} /> até 15 dias
            </label>
            <label className="flex items-center text-lg font-medium">
              <input type="radio" name="date" className="mr-2" onChange={() => setDateFilter('30dias')} /> até 30 dias
            </label>
            <label className="flex items-center text-lg font-medium">
              <input type="radio" name="date" className="mr-2" onChange={() => setDateFilter('mais30dias')} /> Mais de 30 dias
            </label>
            <label className="flex items-center text-lg font-medium">
              <input type="radio" name="date" className="mr-2" onChange={() => setDateFilter('personalizado')} /> Personalizado
            </label>
            <div className="flex space-x-2 mt-2">
              <input type="text" className="w-full border rounded px-2 py-1" placeholder="de 00/00/0000" onChange={(e) => setCustomDateRange({ ...customDateRange, from: e.target.value })} />
              <input type="text" className="w-full border rounded px-2 py-1" placeholder="à 00/00/0000" onChange={(e) => setCustomDateRange({ ...customDateRange, to: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg mb-2">Por status</h3>
          <select className="w-full border rounded px-2 py-1" onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Selecione o status</option>
            <option value="Entregue">Entregue</option>
            <option value="EmPreparacao">Em preparação</option>
            <option value="EmEntrega">Em entrega</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <button className="text-blue-500" onClick={() => {
            setDateFilter(null);
            setCustomDateRange({ from: '', to: '' });
            setStatusFilter(null);
            onApplyFilters({});
          }}>
            Limpar seleção
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={applyFilters}>
            Filtrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
