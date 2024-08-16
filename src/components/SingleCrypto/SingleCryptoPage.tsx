import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cryptos, DrawerProps } from "../../types/Types";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { SpinnerTheme } from "../../Custom/Themes";
import WatchListDrawer from "../Drawer/Drawer";
import LineChart from "../Chart/Chart";
import Buttons from "./Buttons";

const SingleCryptoPage = ({ setIsOpen, isOpen }: DrawerProps) => {
  const [selectedTime, setSelectedTime] = useState("24 Hours");
  interface CryptosInfo extends Cryptos {
    description: { en?: string } | string;
    market_cap_rank: number;
    market_data: {
      current_price: {
        usd?: string;
        try?: string;
        aed?: string;
      };
    };

    market_capPrices: {
      usd?: number;
      try?: number;
      aed?: number;
    };
  }

  const length: number = 250;

  const { name } = useParams();
  const [cryptoData, setCryptoData] = useState<CryptosInfo | null>(null);
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

  const {
    name: cryptoName,
    image,
    market_capPrices,
    market_cap_rank,
    description,
    market_data,
  } = cryptoData;

  const currentPrice = market_data?.current_price || {};
  const market_cap = market_capPrices || {};

  const truncateDescription = (desc: string, length: number) => {
    return desc.length > length ? desc.substring(0, length) + "..." : desc;
  };

  const descriptionText =
    typeof description === "string" ? description : description.en || "";

  const priceDisplay = () => {
    switch (currency) {
      case "USD":
        return currentPrice.usd
          ? `$ ${Number(currentPrice.usd).toLocaleString()}`
          : "N/A";
      case "AED":
        return currentPrice.aed
          ? `د.إ ${Number(currentPrice.aed).toLocaleString()}`
          : "N/A";
      case "TRY":
        return currentPrice.try
          ? `₺ ${Number(currentPrice.try).toLocaleString()}`
          : "N/A";
      default:
        return "N/A";
    }
  };

  const marketCapDisplay = () => {
    switch (currency) {
      case "USD":
        return market_cap.usd
          ? `$ ${Number(market_cap.usd).toLocaleString()}`
          : "N/A";
      case "AED":
        return market_cap.aed
          ? `د.إ ${Number(market_cap.aed).toLocaleString()}`
          : "N/A";
      case "TRY":
        return market_cap.try
          ? `₺ ${Number(market_cap.try).toLocaleString()}`
          : "N/A";
      default:
        return "N/A";
    }
  };

  return (
    <>
      <main className="w-full min-h-screen mx-auto p-4 grid grid-cols-1 md:grid-cols-6 gap-4">
        <section className="col-span-2 border-b-2 md:border-r-2 border-[#808080] p-4">
          <img
            src={(typeof image === "string" ? image : image.large) || ""}
            alt={`${cryptoName} logo`}
            className="w-36 h-36 mx-auto"
          />

          <h1 className="text-5xl font-bold mt-2 text-center">{cryptoName}</h1>

          <p className="mt-4 font-normal text-base leading-relaxed">
            {truncateDescription(descriptionText, length)}
          </p>

          <div className="flex flex-col gap-2 mt-4 font-normal text-xl">
            <p>
              <strong className="font-bold text-2xl">Rank: </strong>
              <span>{market_cap_rank}</span>
            </p>

            <p>
              <strong className="font-bold text-2xl">Current Price:</strong>{" "}
              {priceDisplay()}
            </p>

            <p>
              <strong className="font-bold text-2xl">Market Cap: </strong>
              {marketCapDisplay()}
            </p>
          </div>
        </section>

        <section className="col-span-4 px-8 flex flex-col gap-3">
          <LineChart />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <Buttons
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            >
              24 Hours
            </Buttons>
            <Buttons
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            >
              30 Days
            </Buttons>
            <Buttons
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            >
              3 Months
            </Buttons>
            <Buttons
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            >
              1 Year
            </Buttons>
          </div>
        </section>
      </main>

      <WatchListDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default SingleCryptoPage;
