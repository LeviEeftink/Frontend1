import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CoinDetail() {
  const { coinId } = useParams(); // Get the coinId from the URL params
  console.log("Rendering CoinDetail for:", coinId); // Debugging line

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching data for:", coinId); // Debugging line
    const fetchCoin = async () => {
      try {
        const response = await fetch(
          `https://data-api.coindesk.com/asset/v2/metadata?assets=${coinId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch from CoinDesk API`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        const foundCoin = data.Data[coinId];

        if (!foundCoin) {
          throw new Error("Coin not found!");
        }

        console.log("Coin object:", foundCoin);
        setCoin(foundCoin);
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
        <a className="text-red hover:text-red-300 text-xl transition" href="/">
          Go Back
        </a>

        <p className="text-xl mt-2">Name: {coin.NAME}</p>
        <p className="text-xl mt-2">
          Price USD: ${parseFloat(coin.PRICE_USD).toFixed(2)}
        </p>
        <p className="text-xl mt-2">Symbol: {coin.SYMBOL}</p>
        <p className="text-xl mt-2">
          30 Day Change Rate:{" "}
          {parseFloat(coin.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD).toFixed(2)}%
        </p>

      </div>
  );
}
