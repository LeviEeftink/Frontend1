import React, { useState, useEffect, useMemo } from "react";
import CoinCard from "./CoinCard";
import SearchBar from "./SearchBar";
import CircleDiagram from "./linediagram";

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

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-4 w-full max-w-4xl">
                <h1 className="text-white text-2xl font-bold mb-4">Crypto Coins</h1>

                {coinData.length > 0 && <CircleDiagram coins={coinData} />}

                <SearchBar search={search} onChange={handleSearch} />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCoins.map(coin => (
                        <CoinCard
                            key={coin.ID}
                            coin={coin}
                            isFavorite={favorites[coin.ID]}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
