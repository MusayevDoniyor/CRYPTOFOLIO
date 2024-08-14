import api from "./api/api";
import { SetStateAction, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCryptos,
  getCryptosSuccess,
  getCryptosFailure,
} from "./store/cryptosSlice";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import TableSection from "./components/TableSection/TableSection";
import { Alert, Spinner } from "flowbite-react";
import { SpinnerTheme } from "./Custom/Themes";
import { HiInformationCircle } from "react-icons/hi";
import WatchListDrawer from "./components/Drawer/Drawer";

function App() {
  const dispatch = useDispatch();

  const cryptos = useSelector((state: any) => state.cryptosReducer.cryptos);
  const loading = useSelector((state: any) => state.cryptosReducer.loading);
  const error = useSelector((state: any) => state.cryptosReducer.error);
  const currency = useSelector((state: any) => state.currencyReducer.currency);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 10;

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      dispatch(getCryptos());

      try {
        const res = await api.get(
          `/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=${perPage}&page=${currentPage}&sparkline=false&price_change_percentage=24h`
        );
        dispatch(getCryptosSuccess(res.data));
      } catch (error: any) {
        console.error(error.message);
        dispatch(getCryptosFailure(error.message));
      }
    };

    fetchCryptos();
  }, [currency, currentPage, perPage, dispatch]);

  return (
    <>
      <Header />

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

export default App;
