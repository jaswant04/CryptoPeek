import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const Chart = ({ coin }) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });

        const lineSeries = chart.addLineSeries({
            color: '#ff0000',
            lineWidth: 2,
        });

        const fetchData = async () => {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30`)
            const data = res.data;

            const chartData = data.prices.map(([timestamp, price]) => ({
                time: Math.floor(timestamp / 1000),
                value: price,
            }));

            lineSeries.setData(chartData);
        };

        fetchData();

        return () => {
            chart.remove();
        };
    }, [coin]);

    return (
        <div ref={chartContainerRef} className='h-[600px] ml-2' ></div>
    );
};

export default Chart;
