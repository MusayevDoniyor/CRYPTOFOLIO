import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cryptos } from "../../types/Types";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { SpinnerTheme } from "../../Custom/Themes";

const SingleCryptoPage = () => {
  const { name } = useParams();
  const [cryptoData, setCryptoData] = useState<Cryptos | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currency = useSelector((state: any) => state.currencyReducer.currency);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await api.get(`/coins/${name}`);
        setCryptoData(response.data);
      } catch (error: any) {
        console.error("Error fetching crypto data:", error);
        setError("Failed to fetch cryptocurrency data. Please try again.");
      }
    };

    fetchCryptoData();
  }, [name]);

  if (error) {
    return (
      <div className="flex justify-center items-center pt-16">
        <Alert color="failure" icon={HiInformationCircle} role="alert">
          <span className="font-semibold mr-3 text-lg">Error!</span>
          <span className="font-medium text-base">{error}</span>
        </Alert>
      </div>
    );
  }

  if (!cryptoData) {
    return (
      <div className="flex justify-center items-center pt-16">
        <Spinner theme={SpinnerTheme} size="customSpinnerSize" />
      </div>
    );
  }

  return (
    <main className="w-full mx-auto p-4">
      <h1 className="text-4xl font-bold">
        {cryptoData.name} ({cryptoData.symbol.toUpperCase()})
      </h1>

      <img
        src={cryptoData.image}
        alt={`${cryptoData.name} logo`}
        className="w-32 h-32"
      />

      <p className="mt-4">
        <strong>Current Price:</strong>{" "}
        {cryptoData.current_price.toLocaleString()}{" "}
        {currency === "USD" ? "$" : currency === "AED" ? "د.إ" : "₺"}
      </p>

      <p>
        <strong>Market Cap:</strong> {cryptoData.market_cap.toLocaleString()}{" "}
        {currency === "USD" ? "$" : currency === "AED" ? "د.إ" : "₺"}
      </p>

      <p>
        <strong>24h Change:</strong>{" "}
        {cryptoData.price_change_percentage_24h.toFixed(2)}%
      </p>
    </main>
  );
};

export default SingleCryptoPage;
