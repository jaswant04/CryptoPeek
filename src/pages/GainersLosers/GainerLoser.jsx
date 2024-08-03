import React, { useEffect, useState } from 'react'
import Table from '../../components/Table';
import axios from 'axios';
import { Heading, simpleTableColumns } from '../../config/columns'
import { Error, Loading } from '../../components/Loading';


const GainerLoser = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&price_change_percentage=24';
                const res = await axios.get(url);
                if (isMounted) {
                    setData(res.data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.log(err.message)
                    setError(err);
                    setLoading(false);
                }
            }
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [])

    // Sort coins to find the top 30 gainers
    const gainers = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 30);

    // Sort coins to find the top 30 losers
    const losers = [...data].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 30);

    return (
        <div>
            {loading && <Loading />}
            {error && <Error Error={error} />}
            {!loading && !error &&
                <>
                    <Heading text={`Top Gainers`}/>
                    <Table columns={simpleTableColumns} data={gainers} caption={`Out of Top 100 coins by Market Cap. `} />
                    <Heading text={`Top Losers`}/>
                    <Table columns={simpleTableColumns} data={losers} caption={`Out of Top 100 coins by Market Cap. `} />
                </>
            }
        </div>
    )
}

export default GainerLoser