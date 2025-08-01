import { useState, useEffect, useCallback } from 'react';

interface ApiService<T> {
  getAll: () => Promise<{ data: T[] }>;
}

interface UseApiDataResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApiData<T>(service: ApiService<T>): UseApiDataResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.getAll();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Veri yüklenirken hata oluştu');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
} 