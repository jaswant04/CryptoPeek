import { Link } from "react-router-dom";

export const detailedTableColumns = [
    { header: '#', accessor: 'market_cap_rank' },
    {
        header: 'Coin',
        render: (row) => (
            <div>
                <Link to={`/${row.id}`} className="flex justify-center align-middle ">
                    <img src={row.image} alt={row.name} width="20" height="20" />
                    <span className="px-1">{row.name}</span>
                    <span className="text-gray-400 text-xs/loose "> {row.symbol.toUpperCase()}</span>
                </Link>
            </div>
        )
    },
    { header: 'Price', accessor: 'current_price' },
    { header: 'Low 24h', accessor: 'low_24h' },
    { header: 'High 24h', accessor: 'high_24h' },
    { header: '24h', accessor: 'price_change_24h' },
    { header: '24h Change (%)', accessor: 'price_change_percentage_24h' },
    { header: 'Market Cap', accessor: 'market_cap' },
];

export const simpleTableColumns = [
    { header: '#', accessor: 'market_cap_rank' },
    {
        header: 'Coin',
        render: (row) => (
            <div>
                <Link to={`/${row.id}`} className="flex justify-center align-middle">
                    <img src={row.image} alt={row.name} width="20" height="20" style={{ marginRight: '10px' }} />
                    <span className="px-1">{row.name}</span>
                    <span className="text-gray-400 text-xs/loose "> {row.symbol.toUpperCase()}</span>
                </Link>
            </div>
        )
    },
    { header: 'Price', accessor: 'current_price' },
    { header: '24h Change (%)', accessor: 'price_change_24h' },
    { header: 'Market Cap', accessor: 'market_cap' },
];

export const trendingTable = [

    { header: '#', accessor: 'hash' },
    {
        header: 'Coin',
        render: row => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={`/${row.id}`} className="flex justify-center align-middle">
                    <img
                        src={row.image}
                        alt={row.name}
                        width="20"
                        height="20"
                        style={{ marginRight: '10px' }}
                    />
                    <span className="px-1">{row.name}</span>
                    <span className="text-gray-400 text-xs/loose ">{row.symbol}</span>
                </Link>
            </div>
        )
    },
    { header: 'Price', accessor: 'price' },
    { header: '24h Change (%)', accessor: 'price_change_24h' },
    { header: 'Market Cap.', accessor: 'marketCap' },
    {
        header: 'Chart',
        render: row => (
            <img src={row.chart} alt={row.image} />
        )
    }
]

export const Heading =({text})=>{
    return <p className="text-4xl text-center">{text}</p>
}