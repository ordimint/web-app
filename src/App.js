import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Header from "./Components/Header";
import CheckOrder from "./Pages/CheckOrder";
import FAQ from "./Pages/FAQ";
import WalletPage from "./Pages/WalletPage";
import CollectionsCatalog from "./Pages/CollectionsCatalog";
import CollectionDetailPage from "./Pages/CollectionDetailPage";
import Search from "./Pages/Search";

function App() {
  return (
    <>
      <Router >
        <Header />
        <Routes forceRefresh={true}>
          <Route path="/" element={<Home />} />
          <Route path="/checkorder" element={<CheckOrder />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/collections" element={<CollectionsCatalog />} />
          <Route path="/collections/:slug" element={<CollectionDetailPage />} />
          <Route path="/search" element={<Search />} />

          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;