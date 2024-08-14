import { Carousel } from "flowbite-react";
import { CarouselTheme } from "../../Custom/Themes";
import { useSelector } from "react-redux";
import { CryptosinWatchList } from "../../types/Types";

export default function HeroSection() {
  const watchingCryptos: CryptosinWatchList[] = useSelector(
    (state: any) => state.watchingCryptosReducer.watchingCryptos
  );

  const groupedCryptos = [];
  if (watchingCryptos) {
    for (let i = 0; i < watchingCryptos.length; i += 4) {
      groupedCryptos.push(watchingCryptos.slice(i, i + 4));
    }
  }

  return (
    <section className="bg-heroImg h-[400px] bg-center bg-no-repeat bg-auto">
      <div className="text-center pt-20">
        <h1 className="text-[#87CEEB] font-bold text-6xl">
          CRYPTOFOLIO WATCH LIST
        </h1>

        <p className="text-[#A9A9A9] font-medium text-sm mt-2">
          Get all the Info regarding your favorite Crypto Currency
        </p>
      </div>

      <Carousel theme={CarouselTheme}>
        {groupedCryptos.map((group, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 lg:flex-row space-x-4 justify-center items-center bg-white p-4 rounded-lg shadow-md"
          >
            {group.map((crypto) => (
              <div
                key={crypto.symbol}
                className="flex flex-col items-center w-72 bg-white p-2 shadow-lg rounded-lg"
              >
                <img
                  src={crypto.image}
                  alt={crypto.symbol}
                  className="h-48 w-full object-contain rounded-md mt-1"
                />

                <h2 className="text-base font-bold mb-2 h-32">
                  <a
                    className="hover:text-blue-500 transition-colors"
                    href={`/products/${crypto.symbol}`}
                  >
                    {crypto.symbol}
                  </a>
                </h2>

                <p className="text-lg text-[#333]">
                  <strong>${crypto.current_price}</strong>
                </p>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </section>
  );
}
