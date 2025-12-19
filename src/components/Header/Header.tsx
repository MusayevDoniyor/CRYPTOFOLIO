import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../store/currencySlice";
import { Button, Dropdown } from "flowbite-react";
import { customButtonTheme } from "../../Custom/Themes";
import { DrawerProps } from "../../types/Types";
import { Link } from "react-router-dom";

export default function Header({ setIsOpen }: DrawerProps) {
  const dispatch = useDispatch();
  const currentCurrency = useSelector(
    (state: any) => state.currencyReducer.currency
  );

  const changeCurrency = (currency: string) => {
    dispatch(setCurrency(currency));
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0d11]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity"
        >
          <span className="text-white">CRYPTO</span>
          <span className="premium-gradient-text uppercase">folio</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Dropdown
            label={
              <span className="text-white font-bold text-sm tracking-wider">
                {currentCurrency}
              </span>
            }
            inline
            arrowIcon
          >
            <Dropdown.Item
              onClick={() => changeCurrency("USD")}
              className="hover:bg-cyan-500/10"
            >
              USD
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => changeCurrency("TRY")}
              className="hover:bg-cyan-500/10"
            >
              TRY
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => changeCurrency("AED")}
              className="hover:bg-cyan-500/10"
            >
              AED
            </Dropdown.Item>
          </Dropdown>

          <Button
            theme={customButtonTheme}
            className="glow-on-hover bg-cyan-400 text-black font-bold uppercase transition-transform active:scale-95"
            onClick={() => setIsOpen(true)}
            size="sm"
          >
            Watch List
          </Button>
        </nav>
      </div>
    </header>
  );
}
