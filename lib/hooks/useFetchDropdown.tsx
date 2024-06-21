import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setCategoryDropdown,
  setSubCategoryDropdown,
} from "@/redux/features/tableReducer";
import { getCategoryDropdown, getSubCategoryDropdown } from "@/api/products/dropdown/dropdown";


const useFetchDropdown = () => {
  const dispatch = useAppDispatch();
  const { refetch } = useAppSelector((state) => state.tableReducer);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const categoryRes = await getCategoryDropdown();
      const subCategoryRes = await getSubCategoryDropdown();

      if (categoryRes.status === 200) {
        dispatch(setCategoryDropdown(categoryRes.data));
      }
      if (subCategoryRes.status === 200) {
        dispatch(setSubCategoryDropdown(subCategoryRes.data));
      }
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refetch]);

  return { loading, error };
};

export default useFetchDropdown;
