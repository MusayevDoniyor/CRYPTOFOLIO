import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../store/currencySlice";
import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { customButtonTheme } from "../../Custom/Themes";

export default function Header() {
  const dispatch = useDispatch();
  const currentCurrency = useSelector(
    (state: any) => state.currencyReducer.currency
  );

  const changeCurrency = (currency: string) => {
    dispatch(setCurrency(currency));
  };

  return (
    <header className="shadow-custom3 border-b-2 border-white flex justify-center text-white py-4 px-7 items-center sticky top-1 bg-[#14161a] z-50">
      <div className="max-w-screen-xl w-full flex justify-between items-center">
        <div>
          <a
            className="font-semibold md:font-bold text-lg md:text-xl leading-8 text-[#87CEEB]"
            href="/"
          >
            CRYPTOFOLIO
          </a>
        </div>

        <nav>
          <ul className="flex gap-5 items-center">
            <li>
              <Dropdown label={currentCurrency} inline>
                <DropdownItem onClick={() => changeCurrency("USD")}>
                  USD
                </DropdownItem>

                <DropdownItem onClick={() => changeCurrency("TRY")}>
                  TRY
                </DropdownItem>

                <DropdownItem onClick={() => changeCurrency("AED")}>
                  AED
                </DropdownItem>
              </Dropdown>
            </li>

            <li>
              <Button
                theme={customButtonTheme}
                color="customColor"
                size="customSize"
              >
                Watch List
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
