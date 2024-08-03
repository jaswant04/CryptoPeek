import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Table from '../../components/Table'
import { detailedTableColumns, Heading } from '../../config/columns'
import { Error, Loading } from '../../components/Loading';


const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=30&page=1&sparkline=true&price_change_percentage=%201h%2C%2024h%2C%207d&precision=2';
                const res = await axios.get(url);
                if (isMounted) {
                    setData(res.data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.log(err.message);
                    setError(err);
                    setLoading(false);
                }
            }
        }
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [])
    return (
        <div className='flex justify-center items-center flex-col '>
            {loading && <Loading />}
            {error && <Error Error={error} />}
            {!loading && !error && <Table columns={detailedTableColumns} data={data} />}
            {/* news */}
        </div >
    )
}

export default Home

