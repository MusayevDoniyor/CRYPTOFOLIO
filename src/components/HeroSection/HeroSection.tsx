import { Carousel } from "flowbite-react";
import { CarouselTheme } from "../../Custom/Themes";
import { CryptosinWatchList } from "../../types/Types";
import { useSelector } from "react-redux";

export default function HeroSection() {
  const watchingCryptos: CryptosinWatchList[] = JSON.parse(
    localStorage.getItem("watchingCryptos") || "[]"
  );

  const chunkedCryptos = [];
  for (let i = 0; i < watchingCryptos.length; i += 4) {
    chunkedCryptos.push(watchingCryptos.slice(i, i + 4));
  }

  const currency = useSelector((state: any) => state.currencyReducer.currency);

  return (
    <section className="bg-heroImg h-[450px] flex flex-col bg-center bg-no-repeat bg-auto">
      <div className="text-center pt-20">
        <h1 className="text-[#87CEEB] font-bold text-6xl md:text-5xl sm:text-4xl">
          CRYPTOFOLIO WATCH LIST
        </h1>
        <p className="text-[#A9A9A9] font-medium text-sm mt-2 md:text-base">
          Get all the Info regarding your favorite Crypto Currency
        </p>
      </div>

      {chunkedCryptos.length > 0 ? (
        <Carousel theme={CarouselTheme} slideInterval={2000}>
          {chunkedCryptos.map((group, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 lg:flex-row space-x-4 justify-evenly items-center p-4 rounded-lg shadow-md"
            >
              {group.map((crypto) => (
                <div
                  key={crypto.symbol}
                  className="flex flex-col items-center p-2"
                >
                  <img
                    src={crypto.image}
                    alt={`${crypto.symbol} logo`}
                    className="w-28 h-28 rounded-md mt-1 object-cover"
                  />

                  <h2 className="text-base font-bold my-3 flex gap-3 flex-col sm:flex-row">
                    <a
                      className="hover:text-blue-500 transition-colors"
                      href={`/products/${crypto.symbol}`}
                    >
                      <span>{crypto.symbol.toUpperCase()}</span>
                    </a>

                    <span
                      className={`${
                        crypto.price_change_percentage_24h > 0
                          ? "text-[#0ECB81]"
                          : "text-[#FF0000]"
                      }`}
                    >
                      {crypto.price_change_percentage_24h > 0
                        ? `+${crypto.price_change_percentage_24h.toFixed(2)}`
                        : crypto.price_change_percentage_24h.toFixed(2)}
                      %
                    </span>
                  </h2>

                  <p className="text-lg">
                    <strong>
                      {currency === "USD"
                        ? "$"
                        : currency === "AED"
                        ? "د.إ"
                        : "₺"}
                      {"   "}
                      {crypto.market_cap.toLocaleString()}
                    </strong>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          <p>No cryptocurrencies in your watchlist.</p>
        </div>
      )}
    </section>
  );
}
