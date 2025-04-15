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
        setFavorites((prevFavorites) => {
            const newFavorites = { ...prevFavorites };
            if (newFavorites[id]) {
                delete newFavorites[id];
            } else {
                newFavorites[id] = true;
            }
            return newFavorites;
        });
    };



    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const filteredCoins = coinData.filter(coin => {
        const searchTerm = search.toLowerCase();
        const matchesSymbol = coin.SYMBOL.toLowerCase().includes(searchTerm);
        const matchesName = coin.NAME.toLowerCase().includes(searchTerm);
        return matchesSymbol || matchesName;
    }).sort((a, b) => {
        const aFav = favorites[a.ID] ? 1 : 0;
        const bFav = favorites[b.ID] ? 1 : 0;


        if (aFav !== bFav) {
            return bFav - aFav;
        }

        return Number(b.market_cap) - Number(a.market_cap);
    });

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
