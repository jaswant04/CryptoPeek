import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Error, Loading } from '../../components/Loading';
import { Heading } from '../../config/columns';
const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                const url = 'https://api.coingecko.com/api/v3/news'
                const res = await axios.get(url);
                if (isMounted) {
                    setNews(res.data.data)
                    setLoading(false)
                }
            } catch (err) {
                if (isMounted) {
                    console.log(err.message)
                    setError(err)
                    setLoading(false)
                }
            }
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [])
    return (
        <>
            <Heading text={`Latest news about Crypto`}/>
            <div className='flex justify-around items-center flex-wrap md:gap-4 xxs:gap-1'>
                {loading && <Loading />}
                {error && <Error Error={error} />}
                {!loading && !error && (
                    news.map((article, i) => (
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sm:w-1/3 mx-4 md:mx-0 lg:w-1/4 h-[500px] xxs:w-4/5 xxs:mx-0 my-4 hover:scale-105"
                            key={i}
                        >
                            <div className="rounded-lg bg-white shadow-lg overflow-hidden flex flex-col">
                                <div className="relative h-[250px]">
                                    <img
                                        src={article.thumb_2x}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 flex-grow flex flex-col h-[250px]">
                                    <p className="text-lg font-semibold mb-2 text-black">{article.title}</p>
                                    <p className="text-gray-600 flex-grow text-ellipsis pb-2">
                                        {article.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))
                )}
            </div>
        </>


    )
}

export default News