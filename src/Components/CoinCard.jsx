import React from "react";
import { Link } from "react-router-dom";

export default function CoinCard({ coin, isFavorite, toggleFavorite }) {
    const { ID, SYMBOL, NAME, PRICE_USD, SPOT_MOVING_24_HOUR_CHANGE_CONVERSION } = coin;
    const change = Number(SPOT_MOVING_24_HOUR_CHANGE_CONVERSION).toFixed(2);

    return (
        <div className="p-4 rounded-lg bg shadow-md bg-[#1c1c1c] hover:shadow-lg transition">
            <button
                onClick={() => toggleFavorite(ID)}
                className={`text-xl ${isFavorite ? "text-red-500" : "text-gray-400"} hover:text-red-400 transition`}
            >
                {isFavorite ? "Unfollow" : "Follow"}
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
}
