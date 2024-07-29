import { useState } from 'react';
import axios from 'axios';

const useDeleteProduto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProduto = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`https://deploy-erckf9egd4d5hub6.eastus-01.azurewebsites.net/api/produtos/${id}`);
      setLoading(false);
      return true;
    } catch (error) {
      setError('Erro ao excluir o produto. Por favor, tente novamente.');
      setLoading(false);
      return false;
    }
  };

  return { deleteProduto, loading, error };
};

export default useDeleteProduto;
