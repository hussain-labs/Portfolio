import React, { useState, useEffect } from "react";
import Home from "./pages/Home";

import AppRouter from "./Router";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Always start at the top
    window.scrollTo(0, 0);

    // Simulate initial loading time (e.g., for assets or data)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <Home /> */}
          {/* <Login /> */}
          {/* <AdminDashboard /> */}
          <AppRouter />
        </>
      )}
    </>
  );
}

export default App;
