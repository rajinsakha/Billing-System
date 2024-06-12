"use client"
import api, { setAuthToken } from '@/api/axiosInstance';
import { useAppSelector } from '@/redux/hooks';
import { useCallback, useEffect, useState } from 'react'

const useCheckToken = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [loading, setLoading] = useState(true);
    const {token} = useAppSelector((state)=>state.authReducer)

    const checkToken = useCallback(async ()=>{
        try{
            setAuthToken(token);
            const res = await api.get('');
            if(res.status === 200){
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }
        } catch(error){
            setIsAuthenticated(false);
        }finally{
            setLoading(false);
        }
    },[token])

    useEffect(()=>{
        checkToken();
    },[checkToken])

  return {isAuthenticated, loading}
}

export default useCheckToken