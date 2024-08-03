import React from 'react';

const Table = ({ columns, data, caption }) => {

    return (
        <div className="w-5/6 mx-auto overflow-scroll rounded-2xl scroll-m-1">
            <table className="table-auto shadow-lg bg-indigo-950 shadow-slate-800 rounded-2xl my-12 mx-auto text-center transition-all ">
                <thead>
                    <tr>
                        {columns.map((col, ind) => (
                            <th key={ind} className='p-6'>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className='table-row border-t-2 border-t-gray-500 hover:bg-white hover:text-black'>
                            {columns.map((col, ind) => (
                                <td
                                    key={ind}
                                    className={`p-6 sm:py-6 ${col.header === '24h Change (%)' || col.header === '24h'
                                        ? row.price_change_24h < 0
                                            ? 'text-red-600 font-medium'
                                            : 'text-green-500 font-medium'
                                        : ''
                                        }`}
                                >
                                    {col.accessor
                                        ? (col.header === '24h Change (%)' || col.header === '24h'
                                            ? parseFloat(row[col.accessor]).toFixed(4)
                                            : col.header === 'Market Cap' || col.header === 'Price' || col.header === 'Low 24h' || col.header === 'High 24h'
                                                ? `$${parseFloat(row[col.accessor]).toLocaleString()}`
                                                : row[col.accessor])
                                        : col.render ? col.render(row) : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                {caption ? <caption className='caption-bottom text-right mt-1 text-gray-500 text-sm'>{caption}</caption> : ''}
            </table>
        </div>
    );
}

export default Table;
