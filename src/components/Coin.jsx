import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Error, Loading } from './Loading';
import { useNavigate } from 'react-router-dom';
import Chart from './Chart';
import CoinDetails from './CoinDetails';
import parse from 'html-react-parser'

const Coin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`;
                const res = await axios.get(url);
                if (isMounted) {
                    setData(res.data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    if (err.response.status == 404) {
                        alert(`${id} does not exist.`)
                        return navigate('/')
                    }
                    setLoading(false);
                    setError(err);
                }
            }
        }
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [id])
    return (
        <>
            {loading && <Loading />}
            {error && <Error Error={error} />}
            {data && (
                <>
                <Link to="/"><img src="./arrow-left.svg" alt="Back" className='md:w-12 xxs:w-8  h-12 invert hover:invert-0' /></Link>
                <div className=' flex shadow-lg bg-indigo-950 shadow-slate-800 rounded-2xl p-2 mx-auto xxs:flex-col xxs:mx-4 md:flex-row'>
                    <div className='md:w-1/3 flex flex-col justify-start '>
                        <div className=' '>
                            <img src={data.image.thumb} alt={data.name} className='inline pb-2' />
                            <span className='font-bold text-xl '> {data.name}</span>
                            <span className="text-gray-500 text-sm"> {data.symbol}</span>
                            <span> #{data.market_cap_rank}</span>
                        </div>
                        <div className='flex flex-row items-baseline my-2'>
                            <span className='text-4xl mr-2'>${data.market_data.current_price.usd.toLocaleString()}</span>
                            {
                                data.market_data.price_change_percentage_24h > 0 ? (
                                    <span className='text-green-600'>▲{data.market_data.price_change_percentage_24h.toFixed(2).toLocaleString()}%</span>
                                ) : <span className='text-red-600'>▼{data.market_data.price_change_percentage_24h.toFixed(2).toLocaleString()}%</span>
                            }
                        </div>
                        <CoinDetails coin={data} />
                    </div>
                    <div className='xxs:w-full md:w-2/3'>
                        <Chart coin={data.id} />
                        <p className='text-2xl my-4'>About {data.id}:</p>
                        <p className='mt-2 text-gray-200 text-lg a-tag'>{parse(data.description.en)}</p>
                    </div>
                </div>
                </>

            )}
        </>
    )
}

export default Coin