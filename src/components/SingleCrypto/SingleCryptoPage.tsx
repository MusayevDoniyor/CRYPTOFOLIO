import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cryptos, DrawerProps } from "../../types/Types";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { SpinnerTheme } from "../../Custom/Themes";
import WatchListDrawer from "../Drawer/Drawer";
import LineChart from "../Chart/Chart";
import { coinService } from "../../services/coinService";
import { formatCurrency, formatNumber } from "../../utils/formatters";

interface CryptosInfo extends Cryptos {
  description: { en?: string } | string;
  market_cap_rank: number;
  hashing_algorithm?: string;
  categories: string[];
  sentiment_votes_up_percentage?: number;
  sentiment_votes_down_percentage?: number;
  last_updated: string;
  market_data: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
    ath: { [key: string]: number };
    atl: { [key: string]: number };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    max_supply_infinite: boolean;
    fully_diluted_valuation: { [key: string]: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_percentage_24h: number;
  };
  community_data: {
    twitter_followers: number;
    reddit_subscribers: number;
    facebook_likes: number;
    telegram_channel_user_count: number;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: { additions: number; deletions: number };
    commit_count_4_weeks: number;
  };
  tickers: Array<{
    market: { name: string };
    target: string;
    last: number;
    trust_score: string;
    bid_ask_spread_percentage: number;
    trade_url: string;
  }>;
}

const SingleCryptoPage = ({ setIsOpen, isOpen }: DrawerProps) => {
  const [selectedTime, setSelectedTime] = useState("24H");
  const [days, setDays] = useState("1");
  const { name: id } = useParams();
  const [cryptoData, setCryptoData] = useState<CryptosInfo | null>(null);
  const [historicData, setHistoricData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currency = useSelector((state: any) => state.currencyReducer.currency);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!id) return;
        const [details, history] = await Promise.all([
          coinService.getCoinDetails(id),
          coinService.getHistoricalData(id, days, currency.toLowerCase()),
        ]);
        setCryptoData(details);
        setHistoricData(history.prices);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. CoinGecko API might be rate-limited.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, days, currency]);

  const handleTimeChange = (time: string, dayValue: string) => {
    setSelectedTime(time);
    setDays(dayValue);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner theme={SpinnerTheme} size="customSpinnerSize" />
      </div>
    );
  }

  if (error || !cryptoData) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <Alert color="failure" icon={HiInformationCircle} className="max-w-md">
          <span className="font-semibold mr-3">Error!</span>
          {error || "Cryptocurrency not found."}
        </Alert>
      </div>
    );
  }

  const descriptionText =
    typeof cryptoData.description === "string"
      ? cryptoData.description
      : cryptoData.description.en || "";

  const curr = currency.toLowerCase();
  const market = cryptoData.market_data;
  const community = cryptoData.community_data;
  const developer = cryptoData.developer_data;

  return (
    <>
      <main className="w-full min-h-screen mx-auto p-4 md:p-8 lg:p-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          <section className="lg:col-span-2 lg:border-r border-white border-opacity-10 p-6 flex flex-col items-center lg:items-start text-center lg:text-left h-fit lg:sticky lg:top-24">
            <div className="relative group mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={
                  (typeof cryptoData.image === "string"
                    ? cryptoData.image
                    : cryptoData.image.large) || ""
                }
                alt={`${cryptoData.name} logo`}
                className="relative w-40 h-40 object-contain"
              />
            </div>

            <h1 className="text-5xl font-extrabold mb-2 premium-gradient-text tracking-tighter">
              {cryptoData.name}
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Rank #{cryptoData.market_cap_rank}
              </span>
              <span className="bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {cryptoData.symbol}
              </span>
            </div>

            <div
              className="text-gray-400 text-sm leading-relaxed mb-8 max-h-40 overflow-y-auto pr-2 custom-scrollbar"
              dangerouslySetInnerHTML={{
                __html:
                  descriptionText.split(". ").slice(0, 2).join(". ") + ".",
              }}
            />

            <div className="flex flex-col gap-4 w-full glass-card p-6 mb-8">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                  Current Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">
                    {formatCurrency(market.current_price[curr], currency)}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      market.price_change_percentage_24h >= 0
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {market.price_change_percentage_24h >= 0 ? "+" : ""}
                    {market.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
              <div className="glass-card p-4 hover:bg-white/5 transition-colors">
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">
                  Market Cap
                </span>
                <span className="text-white font-bold text-lg">
                  {formatCurrency(market.market_cap[curr], currency)}
                </span>
              </div>
              <div className="glass-card p-4 hover:bg-white/5 transition-colors">
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">
                  24h Volume
                </span>
                <span className="text-white font-bold text-lg">
                  {formatCurrency(market.total_volume[curr], currency)}
                </span>
              </div>
              {market.fully_diluted_valuation[curr] && (
                <div className="glass-card p-4 hover:bg-white/5 transition-colors">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">
                    FDV
                  </span>
                  <span className="text-white font-bold text-lg">
                    {formatCurrency(
                      market.fully_diluted_valuation[curr],
                      currency
                    )}
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="lg:col-span-4 flex flex-col gap-8">
            <div className="glass-card p-6 min-h-[450px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Price Chart ({selectedTime})
                </h2>
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                  {[
                    { label: "24H", value: "1" },
                    { label: "30D", value: "30" },
                    { label: "3M", value: "90" },
                    { label: "1Y", value: "365" },
                  ].map((btn) => (
                    <button
                      key={btn.value}
                      onClick={() => handleTimeChange(btn.label, btn.value)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedTime === btn.label
                          ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <LineChart historicData={historicData} days={days} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-8 group">
                <h3 className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">
                  Price Performance
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      label: "24h Change",
                      value: `${market.price_change_percentage_24h?.toFixed(
                        2
                      )}%`,
                      color:
                        market.price_change_percentage_24h >= 0
                          ? "text-emerald-400"
                          : "text-rose-400",
                    },
                    {
                      label: "7d Change",
                      value: `${market.price_change_percentage_7d?.toFixed(
                        2
                      )}%`,
                      color:
                        market.price_change_percentage_7d >= 0
                          ? "text-emerald-400"
                          : "text-rose-400",
                    },
                    {
                      label: "14d Change",
                      value: `${market.price_change_percentage_14d?.toFixed(
                        2
                      )}%`,
                      color:
                        market.price_change_percentage_14d >= 0
                          ? "text-emerald-400"
                          : "text-rose-400",
                    },
                    {
                      label: "200d Change",
                      value: `${market.price_change_percentage_200d?.toFixed(
                        2
                      )}%`,
                      color:
                        market.price_change_percentage_200d >= 0
                          ? "text-emerald-400"
                          : "text-rose-400",
                    },
                    {
                      label: "1y Change",
                      value: `${market.price_change_percentage_1y?.toFixed(
                        2
                      )}%`,
                      color:
                        market.price_change_percentage_1y >= 0
                          ? "text-emerald-400"
                          : "text-rose-400",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center group/item"
                    >
                      <span className="text-gray-500 text-sm group-hover/item:text-gray-400 transition-colors">
                        {stat.label}
                      </span>
                      <span
                        className={`font-bold ${stat.color || "text-white"}`}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8 group">
                <h3 className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">
                  Supply & Tokenomics
                </h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Circulating</span>
                    <span className="text-white font-bold">
                      {formatNumber(market.circulating_supply)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Total Supply</span>
                    <span className="text-white font-bold">
                      {formatNumber(market.total_supply)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Max Supply</span>
                    <span className="text-white font-bold">
                      {market.max_supply
                        ? formatNumber(market.max_supply)
                        : market.max_supply_infinite
                        ? "Infinite"
                        : "None"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-gray-500 text-sm">All Time High</span>
                    <span className="text-white font-bold">
                      {formatCurrency(market.ath[curr], currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">All Time Low</span>
                    <span className="text-white font-bold">
                      {formatCurrency(market.atl[curr], currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 overflow-hidden">
              <h3 className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">
                Global Exchange Markets (Top 5)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                      <th className="pb-4 pr-4 uppercase">Market</th>
                      <th className="pb-4 pr-4">Pair</th>
                      <th className="pb-4 pr-4">Price</th>
                      <th className="pb-4 pr-4">Spread</th>
                      <th className="pb-4">Trust</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {cryptoData.tickers?.slice(0, 5).map((ticker, i) => (
                      <tr
                        key={i}
                        className="group/row hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 pr-4">
                          <a
                            href={ticker.trade_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white font-bold hover:text-cyan-400 transition-colors"
                          >
                            {ticker.market.name}
                          </a>
                        </td>
                        <td className="py-4 pr-4 text-gray-400 text-sm uppercase">
                          {cryptoData.symbol}/{ticker.target}
                        </td>
                        <td className="py-4 pr-4 text-white font-medium text-sm">
                          {formatCurrency(ticker.last, "USD")}
                        </td>
                        <td className="py-4 pr-4 text-gray-400 text-sm">
                          {ticker.bid_ask_spread_percentage?.toFixed(3)}%
                        </td>
                        <td className="py-4">
                          <span
                            className={`w-3 h-3 rounded-full inline-block ${
                              ticker.trust_score === "green"
                                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                                : "bg-amber-400"
                            }`}
                          ></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-8 group">
                <h3 className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">
                  Social Presence
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      label: "Twitter Followers",
                      value: formatNumber(community.twitter_followers),
                    },
                    {
                      label: "Reddit Subscribers",
                      value: formatNumber(community.reddit_subscribers),
                    },
                    {
                      label: "Telegram Users",
                      value: formatNumber(
                        community.telegram_channel_user_count
                      ),
                    },
                    {
                      label: "Sentiment Index",
                      value: `${cryptoData.sentiment_votes_up_percentage}% Up`,
                      color: "text-emerald-400",
                    },
                  ].map((stat: any, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center group/item"
                    >
                      <span className="text-gray-500 text-sm group-hover/item:text-gray-400 transition-colors">
                        {stat.label}
                      </span>
                      <span
                        className={`font-bold ${stat.color || "text-white"}`}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-1000"
                      style={{
                        width: `${cryptoData.sentiment_votes_up_percentage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 group">
                <h3 className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">
                  Developer Health
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      label: "Repo Stars",
                      value: formatNumber(developer.stars),
                    },
                    {
                      label: "Repo Forks",
                      value: formatNumber(developer.forks),
                    },
                    {
                      label: "Closed Issues",
                      value: formatNumber(developer.closed_issues),
                    },
                    {
                      label: "Merged PRs",
                      value: formatNumber(developer.pull_requests_merged),
                    },
                    {
                      label: "4w Commits",
                      value: formatNumber(developer.commit_count_4_weeks),
                    },
                  ].map((stat: any, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center group/item"
                    >
                      <span className="text-gray-500 text-sm group-hover/item:text-gray-400 transition-colors">
                        {stat.label}
                      </span>
                      <span
                        className={`font-bold ${stat.color || "text-white"}`}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-white/5">
              <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                Data provided by CoinGecko API
              </span>
              <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                Last Updated:{" "}
                {new Date(cryptoData.last_updated).toLocaleString()}
              </span>
            </div>
          </section>
        </div>
      </main>

      <WatchListDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default SingleCryptoPage;
