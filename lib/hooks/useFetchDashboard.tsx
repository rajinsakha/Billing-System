import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "@/redux/hooks";

import api from "@/api/axiosInstance";

const useFetchDashboard = () => {
  const { refetch } = useAppSelector((state) => state.tableReducer);
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
   const res = await api.get(`product/invoicebills/total_paid/`)
   setData(res.data);
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refetch]);

  return { data, loading, error };
};

export default useFetchDashboard;
