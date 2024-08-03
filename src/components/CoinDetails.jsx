import React from 'react'


const Stats = ({ stat, val }) => {
    return <div className='flex justify-between pb-2 border-b-2 border-gray-700 mb-4'>
        <p className='text-gray-400'>{stat}</p>
        {val === null || val === undefined ? <p className='text-xl'>♾️</p> : <p>${val.toLocaleString()}</p>}
    </div>
}

// For last two rows which need date also 
const Comp = ({ name, val, percent, date }) => {
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = newDate.toLocaleDateString('en-US', options)
    return <div className='flex justify-between pb-2 border-b-2 border-gray-700 mb-4'>
        <p className='text-gray-400'>{name}</p>
        <div >
            <p className=''>${val.toLocaleString()}
                {
                    percent > 0 ?
                        (<span className='text-green-600 ml-2 text-sm font-semibold'>▲{percent.toLocaleString()}%</span>
                        ) : <span className='text-red-600 ml-2 text-sm font-semibold'>▼{percent.toLocaleString()}%</span>
                }
            </p>
            <p className='text-gray-400 text-xs text-right'>{formattedDate}</p>

        </div>
    </div>
}

const CoinDetails = ({ coin }) => {
    const {
        low_24h, high_24h, total_supply, circulating_supply, market_cap, total_volume, max_supply,
        ath, atl, ath_date, atl_date, ath_change_percentage, atl_change_percentage, fully_diluted_valuation
    } = coin.market_data;

    return (
        <>
            <div className='mt-4 mr-6'>
                <p className='font-bold text-xl pb-2 capitalize'>{coin.symbol} Statistics</p>
                <Stats stat="Market Cap" val={market_cap.usd} />
                <Stats stat="Total Volume" val={total_volume.usd} />
                <Stats stat="Fully Diluted Valuation" val={fully_diluted_valuation.usd} />
                <Stats stat="Circulating Supply" val={circulating_supply} />
                <Stats stat="Total Supply" val={total_supply} />
                <Stats stat="Max Supply" val={max_supply} />
            </div>
            <div className='mt-4 mr-6'>
                <p className='font-bold text-xl pb-2 capitalize'>{coin.symbol} Historical Price</p>
                <Stats stat="24h High" val={high_24h.usd} />
                <Stats stat="24h Low" val={low_24h.usd} />
                <Comp name="All Time High" val={ath.usd} date={ath_date.usd} percent={ath_change_percentage.usd} />
                <Comp name="All Time Low" val={atl.usd} date={atl_date.usd} percent={atl_change_percentage.usd} />
            </div>
        </>

    )
}

export default CoinDetails
