import { Carousel } from "flowbite-react";
import { CarouselTheme } from "../../Custom/Themes";
import { useEffect, useState } from "react";
import { coinService } from "../../services/coinService";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [trending, setTrending] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await coinService.getTrendingCoins();
        setTrending(data.coins);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };
    fetchTrending();
  }, []);

  const chunkedTrending = [];
  for (let i = 0; i < trending.length; i += 4) {
    chunkedTrending.push(trending.slice(i, i + 4));
  }

  return (
    <section className="relative h-[550px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background with glow effects */}
      <div className="absolute inset-0 bg-[#0b0d11]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 text-center mb-12 px-4">
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4">
          <span className="text-white">CRYPTO</span>
          <span className="premium-gradient-text uppercase">folio</span>
        </h1>
        <p className="text-gray-400 font-medium text-lg md:text-xl max-w-2xl mx-auto">
          Track the pulse of the market. Get real-time insights on trending
          assets and your personalized portfolio.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4">
        {trending.length > 0 ? (
          <Carousel theme={CarouselTheme} slideInterval={3000} className="h-64">
            {chunkedTrending.map((group, index) => (
              <div
                key={index}
                className="flex items-center justify-around h-full py-4"
              >
                {group.map((item) => {
                  const coin = item.item;
                  return (
                    <Link
                      to={`/${coin.id}`}
                      key={coin.id}
                      className="group flex flex-col items-center p-6 glass-card hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 w-64"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan-400 blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <img
                          src={coin.large}
                          alt={`${coin.name} logo`}
                          className="w-20 h-20 mb-4 object-contain relative"
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-white uppercase">
                            {coin.symbol}
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              coin.data.price_change_percentage_24h?.usd > 0
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }`}
                          >
                            {coin.data.price_change_percentage_24h?.usd > 0
                              ? "+"
                              : ""}
                            {coin.data.price_change_percentage_24h?.usd?.toFixed(
                              2
                            )}
                            %
                          </span>
                        </div>
                        <span className="text-cyan-400 font-bold text-xl">
                          {coin.data.price}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-white/5 h-12 w-12"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-white/5 rounded"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
