import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import SingleCryptoPage from "./components/SingleCrypto/SingleCryptoPage";
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Router>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <Routes>
        <Route
          path="/"
          element={<AppLayout isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/:name"
          element={<SingleCryptoPage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
