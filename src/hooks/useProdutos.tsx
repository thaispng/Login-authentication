import { useState, useEffect } from 'react';

interface Produto {
  id: number;
  numeroDoProduto: string;
  valorDoProduto: number;
  dataCriacao: string;
  formaDePagamento: string;
  status: string;
}

const formaDePagamentoMap: { [key: string]: string } = {
  Dinheiro: 'Dinheiro',
  CartaoDeCredito: 'Cartão de crédito',
  Pix: 'Pix',
};

const statusMap: { [key: string]: string } = {
  Entregue: 'Entregue',
  EmPreparacao: 'Em Preparação',
  EmEntrega: 'Em Entrega',
};

const useProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/produtos');
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const data: Produto[] = await response.json();

        const mappedData = data.map(produto => ({
          ...produto,
          formaDePagamento: formaDePagamentoMap[produto.formaDePagamento] || produto.formaDePagamento,
          status: statusMap[produto.status] || produto.status,
        }));

        setProdutos(mappedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  return { produtos, loading, error };
};

export default useProdutos;
