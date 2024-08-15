import { Drawer } from "flowbite-react";
import { CryptosinWatchList, DrawerProps } from "../../types/Types";
import { DrawerTheme } from "../../Custom/Themes";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function WatchListDrawer({ isOpen, setIsOpen }: DrawerProps) {
  const handleClose = () => setIsOpen(false);

  const [watchingCryptos, setWatchingCryptos] = useState<CryptosinWatchList[]>(
    () => {
      const storedCryptos = localStorage.getItem("watchingCryptos");
      return storedCryptos ? JSON.parse(storedCryptos) : [];
    }
  );

  const currency = useSelector(
    (state: { currencyReducer: { currency: string } }) =>
      state.currencyReducer.currency
  );

  const removeFromWatchList = (symbol: string) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Crypto removed from WatchList",
      showConfirmButton: false,
      timer: 1500,
    });
    const updatedList = watchingCryptos.filter(
      (crypto) => crypto.symbol !== symbol
    );
    setWatchingCryptos(updatedList);
  };

  useEffect(() => {
    localStorage.setItem("watchingCryptos", JSON.stringify(watchingCryptos));
  }, [watchingCryptos]);

  return (
    <Drawer
      theme={DrawerTheme}
      open={isOpen}
      onClose={handleClose}
      position="right"
    >
      <Drawer.Header title="WatchList" />

      <Drawer.Items>
        {watchingCryptos.length > 0 ? (
          <div className="bg-[#515151] grid grid-cols-1 gap-2 md:grid-cols-2 px-2 md:px-4">
            {watchingCryptos.map((crypto) => (
              <div
                key={crypto.symbol}
                className="px-3 py-3 bg-[#14161A] rounded-xl text-center"
              >
                <img
                  className="rounded-3xl"
                  src={crypto.image}
                  alt={`${crypto.symbol} logo`}
                />

                <p className="py-3 flex justify-center gap-1 text-center">
                  <span>
                    {currency === "USD"
                      ? "$"
                      : currency === "AED"
                      ? "د.إ"
                      : "₺"}
                  </span>

                  <span>{crypto.current_price.toLocaleString()}</span>
                </p>

                <button
                  className="bg-[#FF0000] text-white py-0.5 px-3 font-normal text-xl"
                  onClick={() => removeFromWatchList(crypto.symbol)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No Cryptos in WatchList</p>
        )}
      </Drawer.Items>
    </Drawer>
  );
}
