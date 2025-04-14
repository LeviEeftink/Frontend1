import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CircleDiagram from "./linediagram"; // adjust path if needed

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CoinList() {
    const [coinData, setCoinData] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100");
                const data = await res.json();
                if (data?.Data?.LIST) setCoinData(data.Data.LIST);
                else console.error("Invalid API response format.");
            } catch (err) {
                console.error("Error fetching coins:", err);
            }
        };
        fetchCoins();
    }, []);

    const toggleFavorite = (id) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSearch = (e) => setSearch(e.target.value);

    const filteredCoins = useMemo(() => {
        return coinData
            .filter(({ SYMBOL, NAME }) =>
                SYMBOL.toLowerCase().includes(search.toLowerCase()) ||
                NAME.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => {
                const aFav = favorites[a.ID] ? 1 : 0;
                const bFav = favorites[b.ID] ? 1 : 0;
                return bFav - aFav || Number(b.market_cap) - Number(a.market_cap);
            });
    }, [coinData, favorites, search]);

    const CoinCard = ({ coin }) => {
        const { ID, SYMBOL, NAME, PRICE_USD, SPOT_MOVING_24_HOUR_CHANGE_CONVERSION } = coin;
        const isFav = favorites[ID];
        const change = Number(SPOT_MOVING_24_HOUR_CHANGE_CONVERSION).toFixed(2);

        return (
            <div className="p-4 rounded-lg bg shadow-md bg-[#1c1c1c] hover:shadow-lg transition">
                <button
                    onClick={() => toggleFavorite(ID)}
                    className={`text-xl ${isFav ? "text-red-500" : "text-gray-400"} hover:text-red-400 transition`}
                >
                    {isFav ? "Unfollow" : "Follow"}
                </button>

                <p className="text-white text-xl font-semibold">
                    {SYMBOL} ({NAME})
                </p>
                <p className="text-gray-300">${Number(PRICE_USD).toFixed(2)}</p>
                <p className={`font-semibold ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {change}%
                </p>
                <Link to={`/${ID}`}>
                    <button className="w-full mt-4 p-2 text-white bg-[#201F21] rounded-lg">
                        Meer informatie
                    </button>
                </Link>
            </div>
        );
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-4 w-full max-w-4xl">
                <h1 className="text-white text-2xl font-bold mb-4">Crypto Coins</h1>

                {coinData.length > 0 && <CircleDiagram coins={coinData} />}

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                    className="p-3 mb-6 w-full rounded-lg bg-[#201F21] text-white text-lg"
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCoins.map(coin => (
                        <CoinCard key={coin.ID} coin={coin} />
                    ))}
                </div>
            </div>
        </div>
    );
}
