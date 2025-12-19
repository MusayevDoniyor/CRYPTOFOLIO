import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCryptos } from "./store/cryptosSlice";
import HeroSection from "./components/HeroSection/HeroSection";
import TableSection from "./components/TableSection/TableSection";
import { Alert, Spinner } from "flowbite-react";
import { SpinnerTheme } from "./Custom/Themes";
import { HiInformationCircle } from "react-icons/hi";
import WatchListDrawer from "./components/Drawer/Drawer";
import { DrawerProps } from "./types/Types";

function AppLayout({ isOpen, setIsOpen }: DrawerProps) {
  const dispatch = useDispatch<any>();

  const cryptos = useSelector((state: any) => state.cryptosReducer.cryptos);
  const loading = useSelector((state: any) => state.cryptosReducer.loading);
  const error = useSelector((state: any) => state.cryptosReducer.error);
  const currency = useSelector((state: any) => state.currencyReducer.currency);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchCryptos({ currency, perPage, page: currentPage }));
  }, [currency, currentPage, perPage, dispatch]);

  return (
    <>
      <main className="min-h-screen">
        <HeroSection />

        {loading === "loading" ? (
          <div className="flex justify-center items-center pt-16">
            <Spinner theme={SpinnerTheme} size="customSpinnerSize">
              Loading...
            </Spinner>
          </div>
        ) : error ? (
          <div className="fixed bottom-4 right-4 z-50">
            <Alert color="failure" icon={HiInformationCircle} role="alert">
              <span className="font-semibold mr-3 text-lg">Error!</span>
              <span className="font-medium text-base">{error}</span>
            </Alert>
          </div>
        ) : (
          <TableSection
            cryptos={cryptos}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}

        <WatchListDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </main>
    </>
  );
}

export default AppLayout;
