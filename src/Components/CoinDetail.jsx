import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CoinDetail() {
    const { coinId } = useParams();
    console.log("Rendering CoinDetail for:", coinId); 

    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching data for:", coinId); 
        const fetchCoin = async () => {
            try {
                const response = await fetch(`https://api.coincap.io/v2/assets/${coinId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setCoin(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCoin();
    }, [coinId]);

    if (loading) return <p className="text-white p-4">Loading...</p>;
    if (error) return <p className="text-red-500 p-4">Error: {error}</p>;
    if (!coin) return <p className="text-white p-4">Coin not found!</p>;

    return (
        <div className="p-6 text-white">
            <h1 className="text-3xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
            <p className='text-xl mt-2'>Rank: {coin.rank}</p>
            <p className="text-xl mt-2">Price: ${Number(coin.priceUsd).toFixed(2)}</p>
            <p className="text-lg mt-2">Change (24hr): {Number(coin.changePercent24Hr).toFixed(2)}%</p>
            <p className="text-lg mt-2">Market Cap: ${Number(coin.marketCapUsd).toFixed(2)}</p>
            <p className="text-lg mt-2">Supply: {Number(coin.supply).toLocaleString()}</p>
            <p className="text-lg mt-2">Change Rate / 24hr: {Number(coin.changePercent24Hr).toLocaleString()}</p>

             <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">JSON Formaat:</h2>
                <pre className="text-sm bg-gray-800 p-4 rounded-lg overflow-auto">
                    {JSON.stringify(coin, null, 2)}
                </pre>
            </div>
        </div>
    );
}
