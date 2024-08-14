import api from "./api/api";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCryptos,
  getCryptosSuccess,
  getCryptosFailure,
} from "./store/cryptosSlice";
import Header from "./components/Header/Header";

function App() {
  const dispatch = useDispatch();

  const cryptos = useSelector((state: any) => {
    state.cryptosReducer.crytos;
  });
  const loading = useSelector((state: any) => {
    state.cryptosReducer.loading;
  });
  const error = useSelector((state: any) => {
    state.cryptosReducer.error;
  });
  const currency = useSelector((state: any) => state.currencyReducer.currency);

  const currentPage = 2;
  const perPage = 10;

  useEffect(() => {
    const fetchCryptos = async () => {
      dispatch(getCryptos());

      try {
        const res = await api.get(
          `/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=${perPage}&page=${currentPage}&sparkline=false&price_change_percentage=24h`
        );
        dispatch(getCryptosSuccess(res.data));
        console.log(res.data);
      } catch (error: any) {
        console.error(error.message);
        dispatch(getCryptosFailure(error.message));
      }

      return cryptos;
    };

    fetchCryptos();
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
