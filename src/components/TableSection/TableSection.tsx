import React, { useState } from "react";
import { Pagination, Table, TextInput } from "flowbite-react";
import { InputTheme, PaginationTheme, TableTheme } from "../../Custom/Themes";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Cryptos, CryptosinWatchList } from "../../types/Types";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCryptoFromWatchList,
  watchCrypto,
} from "../../store/watchingCryptosSlice";
import { formatCurrency } from "../../utils/formatters";
import { useNavigate } from "react-router-dom";

interface TableSectionProps {
  cryptos: Cryptos[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Sparkline = React.memo(
  ({ data, color }: { data: number[]; color: string }) => {
    if (!data || data.length === 0) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const width = 100;
    const height = 40;
    const points = data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  }
);

export default function TableSection({
  cryptos,
  currentPage,
  setCurrentPage,
}: TableSectionProps) {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const watchingCryptos: CryptosinWatchList[] = useSelector(
    (state: any) => state.watchingCryptosReducer
  );

  const currency = useSelector((state: any) => state.currencyReducer.currency);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isCryptoInWatchList = (symbol: string) => {
    return watchingCryptos.some((crypto) => crypto.symbol === symbol);
  };

  const handleAddToWatchList = (e: React.MouseEvent, crypto: Cryptos) => {
    e.stopPropagation();
    const isInWatchList = isCryptoInWatchList(crypto.symbol);

    if (isInWatchList) {
      dispatch(removeCryptoFromWatchList(crypto));
    } else {
      dispatch(watchCrypto(crypto));
    }
  };

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center premium-gradient-text tracking-tight">
          Cryptocurrency Prices by Market Cap
        </h2>

        <div className="max-w-2xl mx-auto w-full">
          <TextInput
            theme={InputTheme}
            type="text"
            className="w-full"
            placeholder="Search for a cryptocurrency (name or symbol)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card overflow-x-auto shadow-2xl transition-all duration-500">
        <Table theme={TableTheme}>
          <Table.Head>
            <Table.HeadCell className="bg-white bg-opacity-5 text-cyan-400 font-bold">
              Coin
            </Table.HeadCell>
            <Table.HeadCell className="bg-white bg-opacity-5 text-cyan-400 font-bold">
              Price
            </Table.HeadCell>
            <Table.HeadCell className="bg-white bg-opacity-5 text-cyan-400 font-bold">
              24h Change
            </Table.HeadCell>
            <Table.HeadCell className="bg-white bg-opacity-5 text-cyan-400 font-bold">
              Last 7 Days
            </Table.HeadCell>
            <Table.HeadCell className="bg-white bg-opacity-5 text-cyan-400 font-bold text-right pr-12">
              Market Cap
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-white divide-opacity-10">
            {filteredCryptos.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={5}
                  className="text-center py-20 text-gray-400 italic"
                >
                  No cryptocurrencies found matching your search.
                </Table.Cell>
              </Table.Row>
            ) : (
              filteredCryptos.map((crypto) => (
                <Table.Row
                  key={crypto.id || crypto.symbol}
                  onClick={() => navigate(`/${crypto.id}`)}
                  className="bg-transparent hover:bg-white hover:bg-opacity-5 transition-colors cursor-pointer group"
                >
                  <Table.Cell className="py-6">
                    <div className="flex gap-4 items-center">
                      <img
                        className="w-12 h-12 rounded-full shadow-lg transition-transform group-hover:scale-110"
                        src={
                          typeof crypto.image === "string"
                            ? crypto.image
                            : (crypto.image as any).large
                        }
                        alt={crypto.name}
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xl font-bold text-white tracking-wide uppercase">
                          {crypto.symbol}
                        </span>
                        <span className="text-gray-400 text-sm group-hover:text-cyan-400 transition-colors">
                          {crypto.name}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-lg font-semibold text-white">
                      {formatCurrency(crypto.current_price, currency)}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => handleAddToWatchList(e, crypto)}
                        className="focus:outline-none transform transition-transform hover:scale-125"
                      >
                        {isCryptoInWatchList(crypto.symbol) ? (
                          <IoEye className="text-cyan-400 size-6 glow-sm" />
                        ) : (
                          <IoEyeOff className="text-gray-600 hover:text-gray-400 size-6" />
                        )}
                      </button>

                      <span
                        className={`font-bold px-2 py-1 rounded-md ${
                          crypto.price_change_percentage_24h >= 0
                            ? "text-emerald-400 bg-emerald-400 bg-opacity-10"
                            : "text-rose-400 bg-rose-400 bg-opacity-10"
                        }`}
                      >
                        {crypto.price_change_percentage_24h > 0 ? "+" : ""}
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex justify-center min-w-[120px]">
                      {crypto.sparkline_in_7d ? (
                        <Sparkline
                          data={crypto.sparkline_in_7d.price}
                          color={
                            crypto.price_change_percentage_24h >= 0
                              ? "#10b981"
                              : "#f43f5e"
                          }
                        />
                      ) : (
                        <span className="text-gray-600 text-xs">N/A</span>
                      )}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="text-right pr-12">
                    <span className="text-gray-300 font-medium whitespace-nowrap">
                      {formatCurrency(crypto.market_cap, currency)}
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      <div className="mt-12 flex justify-center overflow-x-auto pb-4">
        <Pagination
          theme={PaginationTheme}
          currentPage={currentPage}
          totalPages={10}
          onPageChange={handlePageChange}
          showIcons
          layout="pagination"
          className="premium-pagination"
        />
      </div>
    </section>
  );
}
