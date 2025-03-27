import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CoinList() {
    const [coins, setCoins] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [search, setSearch] = useState(""); 

    useEffect(() => {
        const fetchCoins = async () => {
            const response = await fetch("https://api.coincap.io/v2/assets");
            const data = await response.json();
            setCoins(data.data);
        };
        fetchCoins();
    }, []);

    const toggleFav = (coinId) => {
        setFavorites((prevFavs) => ({
            ...prevFavs,
            [coinId]: !prevFavs[coinId],
        }));
    };

    const filteredCoins = coins.filter(({ symbol, name }) =>
        symbol.toLowerCase().includes(search.toLowerCase()) ||
        name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-4 w-250">
                <h1 className="text-white p-4 text-xl font-semibold">Assets</h1>
    
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-5 mb-4 w-full rounded-lg bg-[#201F21] text-xl font-semibold text-white"
                />
    
                <div className="grid grid-cols-1 gap-6">
                    {filteredCoins.map(({ id, symbol, priceUsd, changePercent24Hr, name }) => {
                        const change = Number(changePercent24Hr).toFixed(2);
                        const isFavorite = favorites[id] || false;
    
                        return (
                            <div
                                key={id}
                                className="p-4 rounded-lg bg-gray-800 shadow-md transition hover:shadow-lg"
                            >
                                <button 
                                    onClick={() => toggleFav(id)} 
                                    className={`text-xl ${
                                        isFavorite ? "text-red-500" : "text-gray-400"
                                    } hover:text-red-400 transition`}
                                >
                                    {isFavorite ? "Unfollow" : "Follow"}
                                </button>
    
                                <p className="text-white text-25px font-semibold">{symbol.toUpperCase()} ({name})</p>
                                <p className="text-gray-300 text-25px">${Number(priceUsd).toFixed(2)}</p>
                                <p className={`text-25px ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
                                    {change}%
                                </p>
    
                                <Link to={`/${id}`}>
                                    <button
                                        className="w-full mt-4 p-4 text-white font-semibold bg-grey-600 rounded-lg hover:bg-blue-300 transition"
                                    >
                                        Meer informatie
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );    
}
