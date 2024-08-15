import { Pagination, Table, TextInput } from "flowbite-react";
import { InputTheme, PaginationTheme, TableTheme } from "../../Custom/Themes";
import { IoEye } from "react-icons/io5";
import { Cryptos, CryptosinWatchList } from "../../types/Types";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCryptoFromWatchList,
  watchCrypto,
} from "../../store/watchingCryptosSlice";
import { useState } from "react";

interface TableSectionProps {
  cryptos: Cryptos[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function TableSection({
  cryptos,
  currentPage,
  setCurrentPage,
}: TableSectionProps) {
  const dispatch = useDispatch();
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

  const handleAddToWatchList = (crypto: Cryptos) => {
    const isInWatchList = isCryptoInWatchList(crypto.symbol);

    if (isInWatchList) {
      dispatch(removeCryptoFromWatchList(crypto));
      const updatedWatchList = watchingCryptos.filter(
        (c) => c.symbol !== crypto.symbol
      );
      localStorage.setItem("watchingCryptos", JSON.stringify(updatedWatchList));
    } else {
      dispatch(watchCrypto(crypto));
      const updatedWatchList = [...watchingCryptos, crypto];
      localStorage.setItem("watchingCryptos", JSON.stringify(updatedWatchList));
    }
  };

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="overflow-x-auto max-w-7xl mx-auto">
      <div className="flex flex-col gap-7 my-4">
        <h2 className="text-4xl font-normal text-center">
          Cryptocurrency Prices by Market Cap
        </h2>

        <TextInput
          theme={InputTheme}
          type="text"
          className="placeholder:text-white"
          placeholder="Search For a Crypto Currency.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Table theme={TableTheme}>
        <Table.Head>
          <Table.HeadCell>Coin</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>24h Change</Table.HeadCell>
          <Table.HeadCell>Market Cap</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {filteredCryptos.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={4} className="text-center">
                No data available
              </Table.Cell>
            </Table.Row>
          ) : (
            filteredCryptos.map((crypto) => (
              <Table.Row
                key={crypto.symbol}
                className="bg-[#16171A] dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex gap-3 items-center">
                    <img
                      className="w-10 h-10 object-cover rounded-full"
                      src={crypto.image}
                      alt={crypto.name}
                    />
                    <div className="flex flex-col gap-1 font-normal">
                      <h2 className="text-xl text-white">
                        {crypto.symbol.toUpperCase()}
                      </h2>
                      <h3 className="text-[#A9A9A9] text-sm">{crypto.name}</h3>
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <span className="font-normal text-sm">
                    {currency === "USD"
                      ? "$"
                      : currency === "AED"
                      ? "د.إ"
                      : "₺"}
                    {"   "}
                    {crypto.current_price.toLocaleString()}
                  </span>
                </Table.Cell>

                <Table.Cell className="items-center">
                  <div className="items-center flex gap-2">
                    <IoEye
                      onClick={() => handleAddToWatchList(crypto)}
                      className={`size-6 cursor-pointer ${
                        isCryptoInWatchList(crypto.symbol)
                          ? "text-emerald-500"
                          : "text-white"
                      }`}
                    />

                    <span
                      className={`${
                        crypto.price_change_percentage_24h >= 0
                          ? "text-[#0ECB81]"
                          : "text-[#FF0000]"
                      }`}
                    >
                      {crypto.price_change_percentage_24h > 0
                        ? `+${crypto.price_change_percentage_24h}`
                        : crypto.price_change_percentage_24h}
                      %
                    </span>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  {currency === "USD" ? "$" : currency === "AED" ? "د.إ" : "₺"}
                  {"   "}
                  {crypto.market_cap.toLocaleString()}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      <div className="mt-6 flex justify-center text-center items-center text-xs md:text-sm lg:text-base">
        <Pagination
          theme={PaginationTheme}
          currentPage={currentPage}
          totalPages={25}
          onPageChange={handlePageChange}
          previousLabel="<"
          nextLabel=">"
          className="flex-1"
        />
      </div>
    </section>
  );
}
