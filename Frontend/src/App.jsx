import { Button } from './components/ui/button'
import Navbar from "./page/Navbar/Navbar";
import Home from "./page/Home/Home";
import { Routes } from 'react-router-dom';
import Portfolio from './page/Portfolio/Portfolio';
import Activity from './page/Activity/Activity';
import Wallet from './page/Wallet/Wallet';
import PaymentDetails from './page/Payment Details/PaymentDetails';
import StockDetails from './page/Stock Details/StockDetails';
import Watchlist from './page/Watchlist/Watchlist';
import Profile from './page/Profile/Profile';
import SearchCoin from './page/Search/SearchCoin';
import Notfound from './page/Notfound/Notfound';
import Withdrawal from './page/Withdrawal/Withdrawal';
import { Route } from 'react-router-dom';
import Auth from './page/Auth/Auth';





function App() {
 

  return (
    <>
    <Auth/>
    {false &&
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route path="/market/:id" element={<StockDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchCoin />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
}
    </>
  );
}

export default App
// import React from "react";

// function App() {
//   console.log("App rendered"); // check browser console
//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Dev server OK ✅</h1>
//       <p>If you see this, React is rendering.</p>
//     </div>
//   );
// }

// export default App;

// import { Button } from "@/components/ui/button";

// function App() {
//   return (
//     <div className="flex min-h-svh flex-col items-center justify-center">
//       <Button>Click me</Button>
//     </div>
//   );
// }

// export default App;