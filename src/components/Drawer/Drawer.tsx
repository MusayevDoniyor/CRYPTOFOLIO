import { Drawer } from "flowbite-react";
import { CryptosinWatchList, DrawerProps } from "../../types/Types";
import { DrawerTheme } from "../../Custom/Themes";
import { useSelector, useDispatch } from "react-redux";
import { removeCryptoFromWatchList } from "../../store/watchingCryptosSlice";
import { formatCurrency } from "../../utils/formatters";
import Swal from "sweetalert2";

export default function WatchListDrawer({ isOpen, setIsOpen }: DrawerProps) {
  const dispatch = useDispatch();

  const watchingCryptos = useSelector(
    (state: { watchingCryptosReducer: CryptosinWatchList[] }) =>
      state.watchingCryptosReducer
  );

  const currency = useSelector(
    (state: { currencyReducer: { currency: string } }) =>
      state.currencyReducer.currency
  );

  const handleClose = () => setIsOpen(false);

  const handleRemove = (symbol: string) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Removed from Watchlist",
      showConfirmButton: false,
      timer: 1500,
      background: "#1e222d",
      color: "#fff",
    });
    dispatch(removeCryptoFromWatchList({ symbol }));
  };

  return (
    <Drawer
      theme={DrawerTheme}
      open={isOpen}
      onClose={handleClose}
      position="right"
      className="bg-[#0b0d11]/fb backdrop-blur-xl border-l border-white/10"
    >
      <Drawer.Header
        title="WATCHLIST"
        titleIcon={() => null}
        className="text-cyan-400 font-black tracking-widest text-xl border-b border-white/10 pb-4"
      />

      <Drawer.Items className="mt-6 px-4">
        {watchingCryptos.length > 0 ? (
          <div className="flex flex-col gap-4">
            {watchingCryptos.map((crypto) => (
              <div
                key={crypto.id || crypto.symbol}
                className="glass-card p-4 flex flex-col items-center group relative overflow-hidden transition-all hover:bg-white/10"
              >
                <img
                  className="w-20 h-20 object-contain mb-3 transition-transform group-hover:scale-110"
                  src={crypto.image}
                  alt={`${crypto.symbol} logo`}
                />

                <div className="text-center w-full">
                  <span className="text-white font-bold uppercase block mb-1">
                    {crypto.symbol}
                  </span>

                  <span className="text-cyan-400 font-bold text-lg block mb-4">
                    {formatCurrency(crypto.current_price, currency)}
                  </span>

                  <button
                    className="w-full bg-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                    onClick={() => handleRemove(crypto.symbol)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 italic">
              Your watchlist is currently empty.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Add coins from the market table to track them here.
            </p>
          </div>
        )}
      </Drawer.Items>
    </Drawer>
  );
}
