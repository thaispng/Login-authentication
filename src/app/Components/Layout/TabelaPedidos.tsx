"use client";
import React, { useState, useEffect } from 'react';
import Button from '../_ui/Button';
import { Filter, Trash } from 'lucide-react';
import useProdutos from '../../../hooks/useProdutos';
import useDeleteProduto from '../../../hooks/useDeleteProduto'; 
import FilterModal from './FilterModal';
import DeleteModal from './DeleteModal'; 

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Entregue':
      return 'bg-green-200 text-green-800';
    case 'Em Entrega':
      return 'bg-orange-200 text-orange-800';
    case 'Em Preparação':
      return 'bg-blue-200 text-blue-800';
    default:
      return '';
  }
};

const filterByDate = (produto: any, dateFilter: string | null, customDateRange: { from: string, to: string }) => {
  const today = new Date();
  const orderDate = new Date(produto.data);

  switch (dateFilter) {
    case '7dias':
      return orderDate >= new Date(today.setDate(today.getDate() - 7));
    case '15dias':
      return orderDate >= new Date(today.setDate(today.getDate() - 15));
    case '30dias':
      return orderDate >= new Date(today.setDate(today.getDate() - 30));
    case 'mais30dias':
      return orderDate < new Date(today.setDate(today.getDate() - 30));
    case 'personalizado':
      const from = new Date(customDateRange.from);
      const to = new Date(customDateRange.to);
      return orderDate >= from && orderDate <= to;
    default:
      return true;
  }
};

const TabelaPedidos: React.FC = () => {
  const { produtos: initialProdutos, loading, error } = useProdutos(); 
  const [produtos, setProdutos] = useState(initialProdutos);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<any>(null);
  const [filters, setFilters] = useState<any>({});
  const { deleteProduto, loading: deleteLoading, error: deleteError } = useDeleteProduto();

  useEffect(() => {
    setProdutos(initialProdutos);
  }, [initialProdutos]);

  const filteredProdutos = produtos.filter((produto) =>
    produto.numeroDoProduto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.valorDoProduto.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.formaDePagamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.status.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((produto) => 
    filterByDate(produto, filters.date, filters.customDateRange)
  ).filter((produto) =>
    filters.status ? produto.status === filters.status : true
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  const handleDeleteClick = (produto: any) => {
    setSelectedProduto(produto);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const success = await deleteProduto(selectedProduto.id);
    if (success) {
      const updatedProdutos = produtos.filter((produto) => produto.id !== selectedProduto.id);
      setProdutos(updatedProdutos); 
      setDeleteModalOpen(false);
    }
  };

  return (
    <div className="mx-auto p-4 w-full">
      <h1 className="text-2xl font-semibold mb-4">Lista de pedidos</h1>
      {deleteError && <div className="text-red-500 mb-4">{deleteError}</div>}
      <div className='flex flex-row justify-between gap-5 h-[60px]'>
        <input
          type="text"
          placeholder="Pesquise aqui"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Button icon={<Filter size={24} />} text="Filtrar" variant="primary" onClick={() => setFilterModalOpen(true)} size="medium" hideTextOnMobile={true} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white hidden sm:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-center">Núm. Pedido</th>
              <th className="py-2 px-4 border-b text-center">Valor</th>
              <th className="py-2 px-4 border-b text-center">Data</th>
              <th className="py-2 px-4 border-b text-center">Forma de pagamento</th>
              <th className="py-2 px-4 border-b text-center">Status</th>
              <th className="py-2 px-4 border-b">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredProdutos.map((produto) => (
              <tr key={produto.id}>
                <td className="py-4 px-4 border-b text-blue-500 text-center">
                  <a href="#">{produto.numeroDoProduto}</a>
                </td>
                <td className="py-2 px-4 border-b text-center">{`R$${produto.valorDoProduto.toFixed(2)}`}</td>
                <td className="py-2 px-4 border-b text-center">{produto.dataCriacao}</td>
                <td className="py-2 px-4 border-b text-center">{produto.formaDePagamento}</td>
                <td className="py-2 px-4 border-b text-center">
                  <span className={`py-2 px-3 rounded-lg text-base font-semibold ${getStatusColor(produto.status)}`}>
                    {produto.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDeleteClick(produto)}>
                    <Trash size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sm:hidden">
          {filteredProdutos.map((produto) => (
            <div key={produto.id} className="bg-white shadow-md rounded-lg mb-4 p-4 text-sm">
              <div className="flex justify-between mb-2">
                <div className="flex flex-col">
                  <div className="text-gray-700 font-semibold">Núm. Pedido</div>
                  <div className="text-blue-500">
                    <a href="#">{produto.numeroDoProduto}</a>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-700 font-semibold">Valor</div>
                  <div className="text-gray-700">{`R$${produto.valorDoProduto.toFixed(2)}`}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-700 font-semibold">Data</div>
                  <div className="text-gray-700">{produto.dataCriacao}</div>
                </div>
              </div>
              <div className="flex justify-center items-center w-full">
                <span className={`py-2 px-3 w-full text-center rounded-lg text-base font-semibold ${getStatusColor(produto.status)}`}>
                  {produto.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FilterModal isOpen={isFilterModalOpen} onClose={() => setFilterModalOpen(false)} onApplyFilters={setFilters} />
      <DeleteModal
        show={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default TabelaPedidos;
