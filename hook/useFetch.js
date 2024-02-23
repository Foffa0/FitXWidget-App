import { useState, useEffect } from 'react';
import axios from 'axios';
 
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
    
        try {
           await axios.get(url, {responseType: 'json', timeout: 5000,})
            .then(res => {
                setData(res.data); 
            });
            setIsLoading(false);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;

