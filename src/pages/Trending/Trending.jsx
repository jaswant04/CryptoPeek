import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '../../components/Table';
import { Heading, trendingTable } from '../../config/columns'
import { Error, Loading } from '../../components/Loading';


const Trending = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                const apiKey = import.meta.env.VITE_API_KEY; //not using cause there is no need 🤷‍♂️
                const url = 'https://api.coingecko.com/api/v3/search/trending';
                const res = await axios.get(url);
                if (isMounted) {
                    const formattedData = res.data.coins.map(coin => ({
                        hash: coin.item.market_cap_rank,
                        id: coin.item.id,
                        name: coin.item.name,
                        symbol: coin.item.symbol,
                        image: coin.item.small,
                        price: coin.item.data.price.toFixed(4),
                        price_change_24h: coin.item.data.price_change_percentage_24h.usd,
                        marketCap: coin.item.data.market_cap,
                        chart: coin.item.data.sparkline,
                    }))
                    setData(formattedData);
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
        <>
            {loading && <Loading />}
            {error && <Error Error={error} />}
            {!loading && !error && (
                <>
                    <Heading text={`Top Trending Coins`}/>
                    <Table columns={trendingTable} data={data} />
                </>
            )}
        </>
    )
}

export default Trending

// const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=30&page=1&sparkline=true&price_change_percentage=%201h%2C%2024h%2C%207d&precision=2';
// const res = await axios.get(url, {
//     headers: {
//         'Authorization': apiKey,
//     }
// });